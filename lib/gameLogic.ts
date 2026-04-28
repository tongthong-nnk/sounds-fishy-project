import { questions } from "./questions";
import type { Player, PlayerRole, Question, TimestampValue } from "./types";

const ROOM_CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const DEFAULT_ROOM_CODE_LENGTH = 6;

type AssignedPlayerRole = Exclude<PlayerRole, null>;

function getTimestampMillis(value: TimestampValue) {
  if (!value) {
    return 0;
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value.toMillis === "function") {
    return value.toMillis();
  }

  return value.seconds * 1000 + Math.floor(value.nanoseconds / 1_000_000);
}

function getRandomIndex(length: number) {
  if (length <= 0) {
    throw new Error("Cannot choose a random item from an empty list.");
  }

  return Math.floor(Math.random() * length);
}

export function generateRoomCode(length = DEFAULT_ROOM_CODE_LENGTH) {
  const safeLength = Math.max(1, Math.floor(length));

  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const values = new Uint32Array(safeLength);
    crypto.getRandomValues(values);

    return Array.from(values, (value) => {
      return ROOM_CODE_CHARS[value % ROOM_CODE_CHARS.length];
    }).join("");
  }

  return Array.from({ length: safeLength }, () => {
    return ROOM_CODE_CHARS[getRandomIndex(ROOM_CODE_CHARS.length)];
  }).join("");
}

export function getNextQuestion(
  roundNumber: number,
  previousQuestionId?: string,
): Question {
  if (questions.length === 0) {
    throw new Error("Question deck is empty.");
  }

  const safeRoundNumber = Math.max(1, Math.floor(roundNumber));
  const startIndex = (safeRoundNumber - 1) % questions.length;
  const firstChoice = questions[startIndex];

  if (firstChoice.id !== previousQuestionId || questions.length === 1) {
    return firstChoice;
  }

  return questions[(startIndex + 1) % questions.length];
}

export function sortPlayersByJoinedAt(players: Player[]) {
  return [...players].sort((firstPlayer, secondPlayer) => {
    const timeDifference =
      getTimestampMillis(firstPlayer.joinedAt) -
      getTimestampMillis(secondPlayer.joinedAt);

    if (timeDifference !== 0) {
      return timeDifference;
    }

    return firstPlayer.playerId.localeCompare(secondPlayer.playerId);
  });
}

export function getNextGuesser(
  players: Player[],
  currentGuesserId?: string,
) {
  const sortedPlayers = sortPlayersByJoinedAt(players);

  if (sortedPlayers.length === 0) {
    return null;
  }

  if (!currentGuesserId) {
    return sortedPlayers[0];
  }

  const currentIndex = sortedPlayers.findIndex((player) => {
    return player.playerId === currentGuesserId;
  });

  if (currentIndex === -1) {
    return sortedPlayers[0];
  }

  return sortedPlayers[(currentIndex + 1) % sortedPlayers.length];
}

export function assignRoles(players: Player[], guesserId: string) {
  if (players.length < 4) {
    throw new Error("At least 4 players are required to assign roles.");
  }

  const sortedPlayers = sortPlayersByJoinedAt(players);
  const guesser = sortedPlayers.find((player) => player.playerId === guesserId);

  if (!guesser) {
    throw new Error("Guesser must be one of the current players.");
  }

  const truthCandidates = sortedPlayers.filter((player) => {
    return player.playerId !== guesserId;
  });
  const truthTeller = truthCandidates[getRandomIndex(truthCandidates.length)];

  return sortedPlayers.reduce<Record<string, AssignedPlayerRole>>(
    (rolesByPlayerId, player) => {
      if (player.playerId === guesserId) {
        rolesByPlayerId[player.playerId] = "guesser";
      } else if (player.playerId === truthTeller.playerId) {
        rolesByPlayerId[player.playerId] = "truth";
      } else {
        rolesByPlayerId[player.playerId] = "bluffer";
      }

      return rolesByPlayerId;
    },
    {},
  );
}

export function areAllNonGuessersSubmitted(
  players: Player[],
  guesserId: string,
) {
  const nonGuessers = players.filter((player) => player.playerId !== guesserId);

  return (
    nonGuessers.length > 0 &&
    nonGuessers.every((player) => player.hasSubmitted)
  );
}

export function getActiveBluffers(players: Player[]) {
  return players.filter((player) => {
    return player.role === "bluffer" && !player.isEliminated;
  });
}

export function areAllBluffersEliminated(players: Player[]) {
  const bluffers = players.filter((player) => player.role === "bluffer");

  return (
    bluffers.length > 0 && bluffers.every((player) => player.isEliminated)
  );
}
