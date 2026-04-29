"use client";

import Link from "next/link";
import { useState } from "react";
import { HostArchiveButton } from "./HostArchiveButton";
import { PlayerList } from "./PlayerList";
import type { Player, Room } from "@/lib/types";

interface LobbyProps {
  currentPlayer: Player | null;
  currentPlayerId: string;
  onArchiveRoom: () => Promise<void>;
  onStartGame: () => Promise<void>;
  players: Player[];
  room: Room;
}

export function Lobby({
  currentPlayer,
  currentPlayerId,
  onArchiveRoom,
  onStartGame,
  players,
  room,
}: LobbyProps) {
  const [copyStatus, setCopyStatus] = useState("");
  const [isStarting, setIsStarting] = useState(false);
  const [startError, setStartError] = useState("");
  const isHost =
    currentPlayer?.isHost || currentPlayer?.playerId === room.hostId || false;
  const canStart = players.length >= 4;

  async function copyToClipboard(value: string, successMessage: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus(successMessage);
    } catch {
      setCopyStatus("Copy failed");
    }
  }

  function getRoomLink() {
    if (typeof window === "undefined") {
      return room.roomCode;
    }

    return `${window.location.origin}/room/${room.roomCode}`;
  }

  async function handleStartGame() {
    if (!canStart || !isHost || isStarting) {
      return;
    }

    setIsStarting(true);
    setStartError("");

    try {
      await onStartGame();
    } catch (error) {
      setStartError(
        error instanceof Error ? error.message : "Could not start the game.",
      );
      setIsStarting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-7 text-[#17202f] sm:px-8 lg:px-10">
      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-6">
          <div className="rounded-lg border border-[#d8e1eb] bg-white p-6 shadow-[0_20px_70px_rgba(23,32,47,0.10)]">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase text-[#1d6f6a]">
                  Lobby
                </p>
                <h1 className="mt-3 text-4xl font-bold text-[#121a27]">
                  Room {room.roomCode}
                </h1>
              </div>
              <Link
                className="inline-flex h-10 items-center rounded-md border border-[#d8e1eb] bg-[#fbfcfe] px-4 text-sm font-bold text-[#253247] transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#253247]/15"
                href="/"
              >
                Back to Home
              </Link>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                className="h-11 rounded-md bg-[#253247] px-5 font-bold text-white transition hover:bg-[#17202f] focus:outline-none focus:ring-4 focus:ring-[#253247]/25"
                onClick={() => copyToClipboard(room.roomCode, "Code copied")}
                type="button"
              >
                Copy Room Code
              </button>
              <button
                className="h-11 rounded-md bg-[#3949a3] px-5 font-bold text-white transition hover:bg-[#2f3f91] focus:outline-none focus:ring-4 focus:ring-[#3949a3]/25"
                onClick={() => copyToClipboard(getRoomLink(), "Link copied")}
                type="button"
              >
                Copy Room Link
              </button>
              {copyStatus ? (
                <span
                  aria-live="polite"
                  className="inline-flex h-11 items-center rounded-md bg-[#edf7f6] px-4 text-sm font-bold text-[#1d6f6a]"
                >
                  {copyStatus}
                </span>
              ) : null}
            </div>
          </div>

          <div className="rounded-lg border border-[#d8e1eb] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase text-[#3949a3]">
              Phase
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#121a27]">
              Waiting for players
            </h2>
            <p className="mt-3 leading-7 text-[#465365]">
              The host can start once at least 4 players have joined.
            </p>

            {isHost ? (
              <>
                <button
                  className="mt-5 h-12 w-full rounded-md bg-[#f06c64] px-5 font-bold text-white transition hover:bg-[#d95851] focus:outline-none focus:ring-4 focus:ring-[#f06c64]/25 disabled:cursor-not-allowed disabled:bg-[#f0a39e]"
                  disabled={!canStart || isStarting}
                  onClick={handleStartGame}
                  title={
                    canStart
                      ? "Start the first round."
                      : "At least 4 players are required."
                  }
                  type="button"
                >
                  {isStarting
                    ? "Starting..."
                    : canStart
                      ? "Start Game"
                      : `Need ${4 - players.length} more player${
                          4 - players.length === 1 ? "" : "s"
                        }`}
                </button>
                {startError ? (
                  <p
                    className="mt-3 rounded-md border border-[#f0b4ae] bg-[#fff1ef] px-4 py-3 text-sm font-semibold text-[#8c2f29]"
                    role="alert"
                  >
                    {startError}
                  </p>
                ) : null}
                <HostArchiveButton
                  className="mt-3"
                  isHost={isHost}
                  onArchiveRoom={onArchiveRoom}
                />
              </>
            ) : (
              <p className="mt-5 rounded-md bg-[#eef2ff] px-4 py-3 text-sm font-semibold text-[#3949a3]">
                Waiting for the host to start the game.
              </p>
            )}
          </div>

          {!currentPlayer ? (
            <div
              className="rounded-lg border border-[#f0b4ae] bg-[#fff1ef] p-4 text-sm font-semibold text-[#8c2f29]"
              role="alert"
            >
              This browser is not joined to the room yet. Use Back to Home and
              join again with room code {room.roomCode}.
            </div>
          ) : null}
        </div>

        <PlayerList
          currentPlayerId={currentPlayerId}
          hostId={room.hostId}
          players={players}
        />
      </section>
    </main>
  );
}
