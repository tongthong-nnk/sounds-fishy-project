import {
  collection,
  doc,
  type DocumentData,
  type DocumentReference,
  getDoc,
  getDocs,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  type Transaction,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import {
  areAllNonGuessersSubmitted,
  assignRoles,
  generateRoomCode,
  getNextGuesser,
  getNextQuestion,
  sortPlayersByJoinedAt,
} from "./gameLogic";
import { getDb } from "./firebase";
import {
  createPlayerId,
  getOrCreatePlayerId,
  getSavedPlayerId,
  savePlayerId,
  savePlayerName,
} from "./player";
import type {
  GameStatus,
  Player,
  PlayerRole,
  Room,
  RoundEndReason,
} from "./types";

const ROOM_CODE_PATTERN = /^[A-Z0-9]{6}$/;
const MAX_ROOM_CODE_ATTEMPTS = 12;

export interface RoomActionResult {
  roomCode: string;
  playerId: string;
}

type Unsubscribe = () => void;

type PlayerTransactionEntry = {
  player: Player;
  ref: DocumentReference;
};

function cleanPlayerName(playerName: string) {
  return playerName.trim();
}

function getNameMatchKey(playerName: string) {
  return cleanPlayerName(playerName).toLocaleLowerCase();
}

function normalizeRoomCode(roomCode: string) {
  return roomCode.trim().replace(/[^a-z0-9]/gi, "").toUpperCase();
}

function assertPlayerName(playerName: string) {
  if (!cleanPlayerName(playerName)) {
    throw new Error("Enter a display name before continuing.");
  }
}

function assertRoomCode(roomCode: string) {
  if (!ROOM_CODE_PATTERN.test(roomCode)) {
    throw new Error("Enter a valid 6-character room code.");
  }
}

function readString(data: DocumentData, key: string) {
  const value = data[key];
  return typeof value === "string" ? value : "";
}

function readNumber(data: DocumentData, key: string) {
  const value = data[key];
  return typeof value === "number" ? value : 0;
}

function readBoolean(data: DocumentData, key: string) {
  const value = data[key];
  return typeof value === "boolean" ? value : false;
}

function readStringArray(data: DocumentData, key: string) {
  const value = data[key];

  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function readGameStatus(data: DocumentData): GameStatus {
  const status = data.status;

  if (
    status === "lobby" ||
    status === "answering" ||
    status === "guessing" ||
    status === "result"
  ) {
    return status;
  }

  return "lobby";
}

function readPlayerRole(data: DocumentData): PlayerRole {
  const role = data.role;

  if (role === "guesser" || role === "truth" || role === "bluffer") {
    return role;
  }

  return null;
}

function readRoundEndReason(data: DocumentData): RoundEndReason {
  const reason = data.roundEndReason;

  if (
    reason === "truth_selected" ||
    reason === "guesser_stopped" ||
    reason === "all_bluffers_found"
  ) {
    return reason;
  }

  return null;
}

function areAllBluffersGuessed(players: Player[], guessedPlayerIds: string[]) {
  const guessedPlayerIdSet = new Set(guessedPlayerIds);
  const bluffers = players.filter((player) => player.role === "bluffer");

  return (
    bluffers.length > 0 &&
    bluffers.every((player) => guessedPlayerIdSet.has(player.playerId))
  );
}

function getGuessedBlufferCount(players: Player[], guessedPlayerIds: string[]) {
  const guessedPlayerIdSet = new Set(guessedPlayerIds);

  return players.filter((player) => {
    return player.role === "bluffer" && guessedPlayerIdSet.has(player.playerId);
  }).length;
}

function getRoundScoreDeltas(
  players: Player[],
  room: Room,
  guessedPlayerIds: string[],
  roundEndReason: Exclude<RoundEndReason, null>,
) {
  const deltas = new Map<string, number>();
  const guessedPlayerIdSet = new Set(guessedPlayerIds);
  const bluffers = players.filter((player) => player.role === "bluffer");
  const guessedBlufferCount = getGuessedBlufferCount(players, guessedPlayerIds);
  const allBluffersFound = areAllBluffersGuessed(players, guessedPlayerIds);
  const unguessedBluffers = bluffers.filter((player) => {
    return !guessedPlayerIdSet.has(player.playerId);
  });

  for (const player of players) {
    deltas.set(player.playerId, 0);
  }

  if (roundEndReason === "all_bluffers_found") {
    deltas.set(room.guesserId, guessedBlufferCount + 1);
    return deltas;
  }

  if (roundEndReason === "guesser_stopped") {
    deltas.set(
      room.guesserId,
      guessedBlufferCount + (allBluffersFound ? 1 : 0),
    );

    for (const bluffer of unguessedBluffers) {
      deltas.set(bluffer.playerId, guessedPlayerIds.length);
    }

    return deltas;
  }

  for (const bluffer of unguessedBluffers) {
    deltas.set(bluffer.playerId, guessedPlayerIds.length);
  }

  deltas.set(room.truthTellerId, unguessedBluffers.length);
  return deltas;
}

function applyFinalRoundScoring(
  transaction: Transaction,
  roomRef: DocumentReference,
  room: Room,
  playerEntries: PlayerTransactionEntry[],
  guessedPlayerIds: string[],
  roundEndReason: Exclude<RoundEndReason, null>,
  eliminatedPlayerId?: string,
) {
  if (room.scoringApplied) {
    throw new Error("Round scoring has already been applied.");
  }

  const players = playerEntries.map((entry) => entry.player);
  const scoreDeltas = getRoundScoreDeltas(
    players,
    room,
    guessedPlayerIds,
    roundEndReason,
  );
  const timestamp = serverTimestamp();

  for (const { player, ref } of playerEntries) {
    transaction.update(ref, {
      score: player.score + (scoreDeltas.get(player.playerId) ?? 0),
      ...(player.playerId === eliminatedPlayerId
        ? { isEliminated: true }
        : {}),
    });
  }

  transaction.update(roomRef, {
    guessedPlayerIds,
    status: "result",
    roundEndReason,
    scoringApplied: true,
    updatedAt: timestamp,
  });
}

function toRoom(roomCode: string, data: DocumentData): Room {
  return {
    roomCode: readString(data, "roomCode") || roomCode,
    hostId: readString(data, "hostId"),
    status: readGameStatus(data),
    roundNumber: readNumber(data, "roundNumber"),
    currentQuestionId: readString(data, "currentQuestionId"),
    question: readString(data, "question"),
    correctAnswer: readString(data, "correctAnswer"),
    guesserId: readString(data, "guesserId"),
    truthTellerId: readString(data, "truthTellerId"),
    guessedPlayerIds: readStringArray(data, "guessedPlayerIds"),
    revealedPlayerIds: readStringArray(data, "revealedPlayerIds"),
    roundEndReason: readRoundEndReason(data),
    scoringApplied: readBoolean(data, "scoringApplied"),
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
  };
}

function toPlayer(playerId: string, data: DocumentData): Player {
  return {
    playerId: readString(data, "playerId") || playerId,
    name: readString(data, "name"),
    isHost: readBoolean(data, "isHost"),
    score: readNumber(data, "score"),
    role: readPlayerRole(data),
    submittedAnswer: readString(data, "submittedAnswer"),
    hasSubmitted: readBoolean(data, "hasSubmitted"),
    isEliminated: readBoolean(data, "isEliminated"),
    joinedAt: data.joinedAt ?? null,
    lastSeenAt: data.lastSeenAt ?? null,
  };
}

async function getAvailableRoomCode() {
  const db = getDb();

  for (let attempt = 0; attempt < MAX_ROOM_CODE_ATTEMPTS; attempt += 1) {
    const roomCode = generateRoomCode();
    const roomRef = doc(db, "rooms", roomCode);
    const roomSnapshot = await getDoc(roomRef);

    if (!roomSnapshot.exists()) {
      return roomCode;
    }
  }

  throw new Error("Could not create a unique room code. Please try again.");
}

export async function createRoom(
  playerName: string,
): Promise<RoomActionResult> {
  assertPlayerName(playerName);

  const db = getDb();
  const roomCode = await getAvailableRoomCode();
  const playerId = getOrCreatePlayerId();
  const name = cleanPlayerName(playerName);
  const roomRef = doc(db, "rooms", roomCode);
  const playerRef = doc(db, "rooms", roomCode, "players", playerId);
  const batch = writeBatch(db);
  const timestamp = serverTimestamp();

  batch.set(roomRef, {
    roomCode,
    hostId: playerId,
    status: "lobby",
    roundNumber: 0,
    currentQuestionId: "",
    question: "",
    correctAnswer: "",
    guesserId: "",
    truthTellerId: "",
    guessedPlayerIds: [],
    revealedPlayerIds: [],
    roundEndReason: null,
    scoringApplied: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  batch.set(playerRef, {
    playerId,
    name,
    isHost: true,
    score: 0,
    role: null,
    submittedAnswer: "",
    hasSubmitted: false,
    isEliminated: false,
    joinedAt: timestamp,
    lastSeenAt: timestamp,
  });

  await batch.commit();
  savePlayerName(name);

  return { roomCode, playerId };
}

export async function joinRoom(
  roomCode: string,
  playerName: string,
): Promise<RoomActionResult> {
  assertPlayerName(playerName);

  const normalizedRoomCode = normalizeRoomCode(roomCode);
  assertRoomCode(normalizedRoomCode);

  const db = getDb();
  const roomRef = doc(db, "rooms", normalizedRoomCode);
  const name = cleanPlayerName(playerName);
  const savedPlayerId = getSavedPlayerId();
  const playersRef = collection(db, "rooms", normalizedRoomCode, "players");
  const playersSnapshot = await getDocs(playersRef);
  const playerRefs = new Map(
    playersSnapshot.docs.map((playerSnapshot) => [
      playerSnapshot.id,
      playerSnapshot.ref,
    ]),
  );
  const matchingNameSnapshot = playersSnapshot.docs.find((playerSnapshot) => {
    const player = toPlayer(playerSnapshot.id, playerSnapshot.data());
    return getNameMatchKey(player.name) === getNameMatchKey(name);
  });
  const candidatePlayerId =
    savedPlayerId || matchingNameSnapshot?.id || createPlayerId();
  const candidatePlayerRef = doc(
    db,
    "rooms",
    normalizedRoomCode,
    "players",
    candidatePlayerId,
  );
  let resolvedPlayerId = candidatePlayerId;

  playerRefs.set(candidatePlayerId, candidatePlayerRef);

  await runTransaction(db, async (transaction) => {
    const roomSnapshot = await transaction.get(roomRef);

    if (!roomSnapshot.exists()) {
      throw new Error("No room found with that code.");
    }

    const room = toRoom(normalizedRoomCode, roomSnapshot.data());
    const savedPlayerSnapshot = savedPlayerId
      ? await transaction.get(
          doc(db, "rooms", normalizedRoomCode, "players", savedPlayerId),
        )
      : null;
    const timestamp = serverTimestamp();

    if (savedPlayerSnapshot?.exists()) {
      resolvedPlayerId = savedPlayerSnapshot.id;
      transaction.update(roomRef, {
        updatedAt: timestamp,
      });
      transaction.update(savedPlayerSnapshot.ref, {
        name,
        lastSeenAt: timestamp,
      });
      return;
    }

    if (matchingNameSnapshot) {
      const matchingPlayerSnapshot = await transaction.get(
        matchingNameSnapshot.ref,
      );

      if (matchingPlayerSnapshot.exists()) {
        resolvedPlayerId = matchingPlayerSnapshot.id;
        transaction.update(roomRef, {
          updatedAt: timestamp,
        });
        transaction.update(matchingPlayerSnapshot.ref, {
          lastSeenAt: timestamp,
        });
        return;
      }
    }

    if (room.status !== "lobby") {
      throw new Error(
        "This game has already started. Only existing players can rejoin.",
      );
    }

    resolvedPlayerId = candidatePlayerId;
    transaction.update(roomRef, {
      updatedAt: timestamp,
    });
    transaction.set(candidatePlayerRef, {
      playerId: candidatePlayerId,
      name,
      isHost: false,
      score: 0,
      role: null,
      submittedAnswer: "",
      hasSubmitted: false,
      isEliminated: false,
      joinedAt: timestamp,
      lastSeenAt: timestamp,
    });
  });

  savePlayerId(resolvedPlayerId);
  savePlayerName(name);

  return { roomCode: normalizedRoomCode, playerId: resolvedPlayerId };
}

export async function updatePlayerPresence(roomCode: string, playerId: string) {
  const normalizedRoomCode = normalizeRoomCode(roomCode);
  assertRoomCode(normalizedRoomCode);

  if (!playerId) {
    return;
  }

  const playerRef = doc(
    getDb(),
    "rooms",
    normalizedRoomCode,
    "players",
    playerId,
  );

  await updateDoc(playerRef, {
    lastSeenAt: serverTimestamp(),
  });
}

export async function startGame(roomCode: string) {
  const normalizedRoomCode = normalizeRoomCode(roomCode);
  assertRoomCode(normalizedRoomCode);

  const db = getDb();
  const currentPlayerId = getOrCreatePlayerId();
  const roomRef = doc(db, "rooms", normalizedRoomCode);
  const playersRef = collection(db, "rooms", normalizedRoomCode, "players");
  const playersSnapshot = await getDocs(playersRef);
  const playerRefs = new Map(
    playersSnapshot.docs.map((playerSnapshot) => [
      playerSnapshot.id,
      playerSnapshot.ref,
    ]),
  );

  await runTransaction(db, async (transaction) => {
    const roomSnapshot = await transaction.get(roomRef);

    if (!roomSnapshot.exists()) {
      throw new Error("No room found with that code.");
    }

    const room = toRoom(normalizedRoomCode, roomSnapshot.data());

    if (room.status !== "lobby") {
      throw new Error("This game has already started.");
    }

    if (room.hostId !== currentPlayerId) {
      throw new Error("Only the host can start the game.");
    }

    const playerSnapshots = await Promise.all(
      Array.from(playerRefs.values(), (playerRef) => {
        return transaction.get(playerRef);
      }),
    );
    const players = sortPlayersByJoinedAt(
      playerSnapshots
        .filter((playerSnapshot) => playerSnapshot.exists())
        .map((playerSnapshot) => {
          return toPlayer(playerSnapshot.id, playerSnapshot.data());
        }),
    );

    if (players.length < 4) {
      throw new Error("At least 4 players are required to start.");
    }

    const guesser = getNextGuesser(players);

    if (!guesser) {
      throw new Error("A Guesser could not be selected.");
    }

    const rolesByPlayerId = assignRoles(players, guesser.playerId);
    const truthTeller = players.find((player) => {
      return rolesByPlayerId[player.playerId] === "truth";
    });

    if (!truthTeller) {
      throw new Error("A Truth Teller could not be selected.");
    }

    const question = getNextQuestion(1);
    const timestamp = serverTimestamp();

    transaction.update(roomRef, {
      status: "answering",
      roundNumber: 1,
      currentQuestionId: question.id,
      question: question.question,
      correctAnswer: question.answer,
      guesserId: guesser.playerId,
      truthTellerId: truthTeller.playerId,
      guessedPlayerIds: [],
      revealedPlayerIds: [],
      roundEndReason: null,
      scoringApplied: false,
      updatedAt: timestamp,
    });

    for (const [playerId, playerRef] of playerRefs) {
      const role = rolesByPlayerId[playerId];

      if (!role) {
        throw new Error("Could not assign every player a role.");
      }

      transaction.update(playerRef, {
        role,
        submittedAnswer: "",
        hasSubmitted: false,
        isEliminated: false,
      });
    }
  });
}

export async function submitAnswer(
  roomCode: string,
  playerId: string,
  answer: string,
) {
  const normalizedRoomCode = normalizeRoomCode(roomCode);
  assertRoomCode(normalizedRoomCode);

  const cleanAnswer = answer.trim();

  if (!cleanAnswer) {
    throw new Error("Enter an answer before submitting.");
  }

  const db = getDb();
  const roomRef = doc(db, "rooms", normalizedRoomCode);
  const playersRef = collection(db, "rooms", normalizedRoomCode, "players");
  const playersSnapshot = await getDocs(playersRef);
  const currentPlayerRef = doc(
    db,
    "rooms",
    normalizedRoomCode,
    "players",
    playerId,
  );
  const playerRefs = new Map(
    playersSnapshot.docs.map((playerSnapshot) => [
      playerSnapshot.id,
      playerSnapshot.ref,
    ]),
  );
  playerRefs.set(playerId, currentPlayerRef);

  await runTransaction(db, async (transaction) => {
    const roomSnapshot = await transaction.get(roomRef);

    if (!roomSnapshot.exists()) {
      throw new Error("No room found with that code.");
    }

    const room = toRoom(normalizedRoomCode, roomSnapshot.data());

    if (room.status !== "answering") {
      throw new Error("Answers can only be submitted during answering.");
    }

    if (room.guesserId === playerId) {
      throw new Error("The Guesser does not submit an answer.");
    }

    const playerSnapshots = await Promise.all(
      Array.from(playerRefs.values(), (playerRef) => {
        return transaction.get(playerRef);
      }),
    );
    const players = playerSnapshots
      .filter((playerSnapshot) => playerSnapshot.exists())
      .map((playerSnapshot) => {
        return toPlayer(playerSnapshot.id, playerSnapshot.data());
      });
    const currentPlayer = players.find((player) => {
      return player.playerId === playerId;
    });

    if (!currentPlayer) {
      throw new Error("This browser is not joined to the room.");
    }

    if (currentPlayer.role === "guesser") {
      throw new Error("The Guesser does not submit an answer.");
    }

    if (currentPlayer.role !== "truth" && currentPlayer.role !== "bluffer") {
      throw new Error("Only the Truth Teller and Bluffers can submit.");
    }

    const updatedPlayers = players.map((player) => {
      if (player.playerId !== playerId) {
        return player;
      }

      return {
        ...player,
        submittedAnswer: cleanAnswer,
        hasSubmitted: true,
      };
    });
    const allNonGuessersSubmitted = areAllNonGuessersSubmitted(
      updatedPlayers,
      room.guesserId,
    );

    transaction.update(currentPlayerRef, {
      submittedAnswer: cleanAnswer,
      hasSubmitted: true,
    });

    transaction.update(roomRef, {
      status: allNonGuessersSubmitted ? "guessing" : "answering",
      ...(allNonGuessersSubmitted
        ? {
            revealedPlayerIds: [],
            roundEndReason: null,
            scoringApplied: false,
          }
        : {}),
      updatedAt: serverTimestamp(),
    });
  });
}

export async function revealPlayerAnswer(
  roomCode: string,
  playerIdToReveal: string,
) {
  const normalizedRoomCode = normalizeRoomCode(roomCode);
  assertRoomCode(normalizedRoomCode);

  if (!playerIdToReveal) {
    throw new Error("Choose an answer to reveal.");
  }

  const db = getDb();
  const currentPlayerId = getOrCreatePlayerId();
  const roomRef = doc(db, "rooms", normalizedRoomCode);
  const playerToRevealRef = doc(
    db,
    "rooms",
    normalizedRoomCode,
    "players",
    playerIdToReveal,
  );

  await runTransaction(db, async (transaction) => {
    const roomSnapshot = await transaction.get(roomRef);

    if (!roomSnapshot.exists()) {
      throw new Error("No room found with that code.");
    }

    const room = toRoom(normalizedRoomCode, roomSnapshot.data());

    if (room.status !== "guessing") {
      throw new Error("Answers can only be revealed during guessing.");
    }

    if (room.scoringApplied) {
      throw new Error("This round has already ended.");
    }

    if (room.guesserId === currentPlayerId) {
      throw new Error("Ask that player to reveal their own answer.");
    }

    if (playerIdToReveal !== currentPlayerId) {
      throw new Error("You can only reveal your own answer.");
    }

    if (playerIdToReveal === room.guesserId) {
      throw new Error("The Guesser does not have an answer to reveal.");
    }

    if (room.revealedPlayerIds.includes(playerIdToReveal)) {
      throw new Error("That answer has already been revealed.");
    }

    const playerToRevealSnapshot = await transaction.get(playerToRevealRef);

    if (!playerToRevealSnapshot.exists()) {
      throw new Error("That player is no longer in this room.");
    }

    const playerToReveal = toPlayer(
      playerToRevealSnapshot.id,
      playerToRevealSnapshot.data(),
    );

    if (playerToReveal.role === "guesser") {
      throw new Error("The Guesser does not have an answer to reveal.");
    }

    transaction.update(roomRef, {
      revealedPlayerIds: [...room.revealedPlayerIds, playerIdToReveal],
      updatedAt: serverTimestamp(),
    });
  });
}

export async function guessPlayer(roomCode: string, guessedPlayerId: string) {
  const normalizedRoomCode = normalizeRoomCode(roomCode);
  assertRoomCode(normalizedRoomCode);

  if (!guessedPlayerId) {
    throw new Error("Choose a player to guess.");
  }

  const db = getDb();
  const currentPlayerId = getOrCreatePlayerId();
  const roomRef = doc(db, "rooms", normalizedRoomCode);
  const playersRef = collection(db, "rooms", normalizedRoomCode, "players");
  const playersSnapshot = await getDocs(playersRef);
  const playerRefs = new Map(
    playersSnapshot.docs.map((playerSnapshot) => [
      playerSnapshot.id,
      playerSnapshot.ref,
    ]),
  );
  const guessedPlayerRef = doc(
    db,
    "rooms",
    normalizedRoomCode,
    "players",
    guessedPlayerId,
  );
  const currentPlayerRef = doc(
    db,
    "rooms",
    normalizedRoomCode,
    "players",
    currentPlayerId,
  );

  playerRefs.set(guessedPlayerId, guessedPlayerRef);
  playerRefs.set(currentPlayerId, currentPlayerRef);

  await runTransaction(db, async (transaction) => {
    const roomSnapshot = await transaction.get(roomRef);

    if (!roomSnapshot.exists()) {
      throw new Error("No room found with that code.");
    }

    const room = toRoom(normalizedRoomCode, roomSnapshot.data());

    if (room.status !== "guessing") {
      throw new Error("Guesses can only be made during guessing.");
    }

    if (room.scoringApplied) {
      throw new Error("This round has already ended.");
    }

    if (room.guesserId !== currentPlayerId) {
      throw new Error("Only the Guesser can choose answers.");
    }

    if (guessedPlayerId === room.guesserId) {
      throw new Error("The Guesser cannot guess themselves.");
    }

    if (!room.revealedPlayerIds.includes(guessedPlayerId)) {
      throw new Error("Reveal that answer before guessing this player.");
    }

    if (room.guessedPlayerIds.includes(guessedPlayerId)) {
      throw new Error("That player has already been guessed.");
    }

    const playerSnapshots = await Promise.all(
      Array.from(playerRefs.values(), (playerRef) => {
        return transaction.get(playerRef);
      }),
    );
    const playerEntries = playerSnapshots
      .filter((playerSnapshot) => playerSnapshot.exists())
      .map((playerSnapshot) => {
        return {
          player: toPlayer(playerSnapshot.id, playerSnapshot.data()),
          ref: playerSnapshot.ref,
        };
      });
    const players = playerEntries.map((entry) => entry.player);
    const currentPlayer = players.find((player) => {
      return player.playerId === currentPlayerId;
    });
    const guessedPlayer = players.find((player) => {
      return player.playerId === guessedPlayerId;
    });

    if (!currentPlayer) {
      throw new Error("This browser is not joined to the room.");
    }

    if (!guessedPlayer) {
      throw new Error("That player is no longer in this room.");
    }

    if (currentPlayer.role !== "guesser") {
      throw new Error("Only the Guesser can choose answers.");
    }

    if (guessedPlayer.role === "guesser") {
      throw new Error("The Guesser cannot be selected.");
    }

    if (guessedPlayer.isEliminated) {
      throw new Error("That player has already been eliminated.");
    }

    if (guessedPlayer.role !== "bluffer" && guessedPlayer.role !== "truth") {
      throw new Error("That player cannot be guessed right now.");
    }

    const nextGuessedPlayerIds = [...room.guessedPlayerIds, guessedPlayerId];

    if (guessedPlayer.role === "truth") {
      applyFinalRoundScoring(
        transaction,
        roomRef,
        room,
        playerEntries,
        nextGuessedPlayerIds,
        "truth_selected",
      );
      return;
    }

    const allBluffersFound = areAllBluffersGuessed(
      players,
      nextGuessedPlayerIds,
    );

    if (allBluffersFound) {
      applyFinalRoundScoring(
        transaction,
        roomRef,
        room,
        playerEntries,
        nextGuessedPlayerIds,
        "all_bluffers_found",
        guessedPlayerId,
      );
      return;
    }

    transaction.update(guessedPlayerRef, {
      isEliminated: true,
    });
    transaction.update(roomRef, {
      guessedPlayerIds: nextGuessedPlayerIds,
      updatedAt: serverTimestamp(),
    });
  });
}

export async function stopGuessing(roomCode: string) {
  const normalizedRoomCode = normalizeRoomCode(roomCode);
  assertRoomCode(normalizedRoomCode);

  const db = getDb();
  const currentPlayerId = getOrCreatePlayerId();
  const roomRef = doc(db, "rooms", normalizedRoomCode);
  const playersRef = collection(db, "rooms", normalizedRoomCode, "players");
  const playersSnapshot = await getDocs(playersRef);
  const playerRefs = new Map(
    playersSnapshot.docs.map((playerSnapshot) => [
      playerSnapshot.id,
      playerSnapshot.ref,
    ]),
  );
  const currentPlayerRef = doc(
    db,
    "rooms",
    normalizedRoomCode,
    "players",
    currentPlayerId,
  );

  playerRefs.set(currentPlayerId, currentPlayerRef);

  await runTransaction(db, async (transaction) => {
    const roomSnapshot = await transaction.get(roomRef);

    if (!roomSnapshot.exists()) {
      throw new Error("No room found with that code.");
    }

    const room = toRoom(normalizedRoomCode, roomSnapshot.data());

    if (room.status !== "guessing") {
      throw new Error("Points can only be banked during guessing.");
    }

    if (room.scoringApplied) {
      throw new Error("This round has already ended.");
    }

    if (room.guesserId !== currentPlayerId) {
      throw new Error("Only the Guesser can stop and bank points.");
    }

    const playerSnapshots = await Promise.all(
      Array.from(playerRefs.values(), (playerRef) => {
        return transaction.get(playerRef);
      }),
    );
    const playerEntries = playerSnapshots
      .filter((playerSnapshot) => playerSnapshot.exists())
      .map((playerSnapshot) => {
        return {
          player: toPlayer(playerSnapshot.id, playerSnapshot.data()),
          ref: playerSnapshot.ref,
        };
      });
    const currentPlayer = playerEntries.find((entry) => {
      return entry.player.playerId === currentPlayerId;
    })?.player;

    if (!currentPlayer) {
      throw new Error("This browser is not joined to the room.");
    }

    if (currentPlayer.role !== "guesser") {
      throw new Error("Only the Guesser can stop and bank points.");
    }

    applyFinalRoundScoring(
      transaction,
      roomRef,
      room,
      playerEntries,
      room.guessedPlayerIds,
      "guesser_stopped",
    );
  });
}

export async function startNextRound(roomCode: string) {
  const normalizedRoomCode = normalizeRoomCode(roomCode);
  assertRoomCode(normalizedRoomCode);

  const db = getDb();
  const currentPlayerId = getOrCreatePlayerId();
  const roomRef = doc(db, "rooms", normalizedRoomCode);
  const playersRef = collection(db, "rooms", normalizedRoomCode, "players");
  const playersSnapshot = await getDocs(playersRef);
  const playerRefs = new Map(
    playersSnapshot.docs.map((playerSnapshot) => [
      playerSnapshot.id,
      playerSnapshot.ref,
    ]),
  );

  await runTransaction(db, async (transaction) => {
    const roomSnapshot = await transaction.get(roomRef);

    if (!roomSnapshot.exists()) {
      throw new Error("No room found with that code.");
    }

    const room = toRoom(normalizedRoomCode, roomSnapshot.data());

    if (room.status !== "result") {
      throw new Error("Next round can only start after results are shown.");
    }

    if (room.hostId !== currentPlayerId) {
      throw new Error("Only the host can start the next round.");
    }

    const playerSnapshots = await Promise.all(
      Array.from(playerRefs.values(), (playerRef) => {
        return transaction.get(playerRef);
      }),
    );
    const players = sortPlayersByJoinedAt(
      playerSnapshots
        .filter((playerSnapshot) => playerSnapshot.exists())
        .map((playerSnapshot) => {
          return toPlayer(playerSnapshot.id, playerSnapshot.data());
        }),
    );

    if (players.length < 4) {
      throw new Error("At least 4 players are required to continue.");
    }

    const guesser = getNextGuesser(players, room.guesserId);

    if (!guesser) {
      throw new Error("A Guesser could not be selected.");
    }

    const rolesByPlayerId = assignRoles(players, guesser.playerId);
    const truthTeller = players.find((player) => {
      return rolesByPlayerId[player.playerId] === "truth";
    });

    if (!truthTeller) {
      throw new Error("A Truth Teller could not be selected.");
    }

    const nextRoundNumber = Math.max(1, room.roundNumber + 1);
    const question = getNextQuestion(nextRoundNumber, room.currentQuestionId);
    const timestamp = serverTimestamp();

    transaction.update(roomRef, {
      status: "answering",
      roundNumber: nextRoundNumber,
      currentQuestionId: question.id,
      question: question.question,
      correctAnswer: question.answer,
      guesserId: guesser.playerId,
      truthTellerId: truthTeller.playerId,
      guessedPlayerIds: [],
      revealedPlayerIds: [],
      roundEndReason: null,
      scoringApplied: false,
      updatedAt: timestamp,
    });

    for (const [playerId, playerRef] of playerRefs) {
      const role = rolesByPlayerId[playerId];

      if (!role) {
        throw new Error("Could not assign every player a role.");
      }

      transaction.update(playerRef, {
        role,
        submittedAnswer: "",
        hasSubmitted: false,
        isEliminated: false,
      });
    }
  });
}

export function listenToRoom(
  roomCode: string,
  callback: (room: Room | null) => void,
  onError?: (error: Error) => void,
): Unsubscribe {
  const normalizedRoomCode = normalizeRoomCode(roomCode);

  if (!ROOM_CODE_PATTERN.test(normalizedRoomCode)) {
    callback(null);
    return () => {};
  }

  const roomRef = doc(getDb(), "rooms", normalizedRoomCode);

  return onSnapshot(
    roomRef,
    (roomSnapshot) => {
      if (!roomSnapshot.exists()) {
        callback(null);
        return;
      }

      callback(toRoom(normalizedRoomCode, roomSnapshot.data()));
    },
    (error) => {
      onError?.(error);
    },
  );
}

export function listenToPlayers(
  roomCode: string,
  callback: (players: Player[]) => void,
  onError?: (error: Error) => void,
): Unsubscribe {
  const normalizedRoomCode = normalizeRoomCode(roomCode);

  if (!ROOM_CODE_PATTERN.test(normalizedRoomCode)) {
    callback([]);
    return () => {};
  }

  const playersRef = collection(getDb(), "rooms", normalizedRoomCode, "players");

  return onSnapshot(
    playersRef,
    (playersSnapshot) => {
      const players = playersSnapshot.docs.map((playerSnapshot) => {
        return toPlayer(playerSnapshot.id, playerSnapshot.data());
      });

      callback(players);
    },
    (error) => {
      onError?.(error);
    },
  );
}
