"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { AnswerPhase } from "./AnswerPhase";
import { ErrorState } from "./ErrorState";
import { GuessingPhase } from "./GuessingPhase";
import { Lobby } from "./Lobby";
import { LoadingState } from "./LoadingState";
import { ResultPhase } from "./ResultPhase";
import { sortPlayersByJoinedAt } from "@/lib/gameLogic";
import { getSavedPlayerId } from "@/lib/player";
import {
  listenToPlayers,
  listenToRoom,
  guessPlayer,
  revealPlayerAnswer,
  startGame,
  startNextRound,
  stopGuessing,
  submitAnswer,
  updatePlayerPresence,
} from "@/lib/roomService";
import type { Player, Room } from "@/lib/types";

interface GameRoomProps {
  roomCode: string;
}

type LoadState = "loading" | "ready" | "missing" | "error";

function subscribeToPlayerId(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

export function GameRoom({ roomCode }: GameRoomProps) {
  const currentPlayerId = useSyncExternalStore(
    subscribeToPlayerId,
    getSavedPlayerId,
    () => "",
  );
  const [room, setRoom] = useState<Room | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let roomHasLoaded = false;

    const unsubscribeRoom = listenToRoom(
      roomCode,
      (nextRoom) => {
        roomHasLoaded = true;
        setRoom(nextRoom);
        setLoadState(nextRoom ? "ready" : "missing");
      },
      (error) => {
        setErrorMessage(error.message);
        setLoadState("error");
      },
    );

    const unsubscribePlayers = listenToPlayers(
      roomCode,
      setPlayers,
      (error) => {
        if (!roomHasLoaded) {
          setErrorMessage(error.message);
          setLoadState("error");
        }
      },
    );

    return () => {
      unsubscribeRoom();
      unsubscribePlayers();
    };
  }, [roomCode]);

  const sortedPlayers = useMemo(() => {
    return sortPlayersByJoinedAt(players);
  }, [players]);

  const currentPlayer = useMemo(() => {
    return (
      sortedPlayers.find((player) => player.playerId === currentPlayerId) ??
      null
    );
  }, [currentPlayerId, sortedPlayers]);
  const currentPresencePlayerId = currentPlayer?.playerId ?? "";
  const currentPresenceRoomCode = room?.roomCode ?? "";

  useEffect(() => {
    if (!currentPresenceRoomCode || !currentPresencePlayerId) {
      return;
    }

    function updatePresence() {
      void updatePlayerPresence(
        currentPresenceRoomCode,
        currentPresencePlayerId,
      ).catch(() => {});
    }

    updatePresence();

    const intervalId = window.setInterval(updatePresence, 20_000);
    return () => window.clearInterval(intervalId);
  }, [currentPresencePlayerId, currentPresenceRoomCode]);

  if (loadState === "loading") {
    return <LoadingState message="Loading room..." />;
  }

  if (loadState === "missing") {
    return (
      <ErrorState
        message="No room exists with that code. Check the code and try joining again."
        title="Room not found"
      />
    );
  }

  if (loadState === "error") {
    return (
      <ErrorState
        message={errorMessage || "Could not load this room."}
        title="Could not load room"
      />
    );
  }

  if (!room) {
    return <LoadingState message="Loading room..." />;
  }

  if (room.status === "answering") {
    return (
      <AnswerPhase
        currentPlayer={currentPlayer}
        onSubmitAnswer={(playerId, answer) => {
          return submitAnswer(room.roomCode, playerId, answer);
        }}
        players={sortedPlayers}
        room={room}
      />
    );
  }

  if (room.status === "guessing") {
    return (
      <GuessingPhase
        currentPlayer={currentPlayer}
        onGuessPlayer={(guessedPlayerId) => {
          return guessPlayer(room.roomCode, guessedPlayerId);
        }}
        onRevealPlayerAnswer={(playerIdToReveal) => {
          return revealPlayerAnswer(room.roomCode, playerIdToReveal);
        }}
        onStopGuessing={() => {
          return stopGuessing(room.roomCode);
        }}
        players={sortedPlayers}
        room={room}
      />
    );
  }

  if (room.status === "result") {
    return (
      <ResultPhase
        currentPlayer={currentPlayer}
        currentPlayerId={currentPlayerId}
        onStartNextRound={() => startNextRound(room.roomCode)}
        players={sortedPlayers}
        room={room}
      />
    );
  }

  if (room.status !== "lobby") {
    return (
      <ErrorState
        message="This phase is coming in a later milestone."
        title="Game phase coming soon"
      />
    );
  }

  return (
    <Lobby
      currentPlayer={currentPlayer}
      currentPlayerId={currentPlayerId}
      onStartGame={() => startGame(room.roomCode)}
      players={sortedPlayers}
      room={room}
    />
  );
}
