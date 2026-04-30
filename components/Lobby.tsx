"use client";

import Link from "next/link";
import { useState } from "react";
import { HostArchiveButton } from "./HostArchiveButton";
import { PlayerList } from "./PlayerList";
import { playUiSound } from "./theme/audioEvents";
import { OceanBackground } from "./theme/OceanBackground";
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

  async function copyToClipboard(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus("Copied");
      playUiSound("success");
    } catch {
      setCopyStatus("Copy failed");
      playUiSound("warning");
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

    playUiSound("click");
    setIsStarting(true);
    setStartError("");

    try {
      await onStartGame();
      playUiSound("success");
    } catch (error) {
      setStartError(
        error instanceof Error ? error.message : "Could not start the game.",
      );
      setIsStarting(false);
    }
  }

  return (
    <OceanBackground>
      <main className="flex min-h-screen items-center px-5 py-7 text-[#10243d] sm:px-8 lg:px-10">
      <section className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-6">
          <div className="game-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-extrabold uppercase text-[#0a6f98]">
                  Lobby
                </p>
                <h1 className="party-title mt-3 text-4xl font-bold">
                  Room {room.roomCode}
                </h1>
              </div>
              <Link
                className="game-button game-button-soft inline-flex h-10 items-center px-4 text-sm font-extrabold focus:outline-none focus:ring-4 focus:ring-[#253247]/15"
                href="/"
              >
                Back to Home
              </Link>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                className="game-button game-button-dark h-11 min-w-[7.5rem] whitespace-nowrap px-5 font-extrabold focus:outline-none focus:ring-4 focus:ring-[#253247]/25"
                onClick={() => copyToClipboard(room.roomCode)}
                type="button"
              >
                Copy Code
              </button>
              <button
                className="game-button game-button-blue h-11 min-w-[7.5rem] whitespace-nowrap px-5 font-extrabold focus:outline-none focus:ring-4 focus:ring-[#3949a3]/25"
                onClick={() => copyToClipboard(getRoomLink())}
                type="button"
              >
                Copy Link
              </button>
              {copyStatus ? (
                <span
                  aria-live="polite"
                  className="status-pill inline-flex h-11 items-center whitespace-nowrap bg-[#edf7f6] px-4 text-sm text-[#1d6f6a]"
                >
                  {copyStatus}
                </span>
              ) : null}
            </div>
          </div>

          <div className="game-card p-6">
            <p className="text-sm font-extrabold uppercase text-[#0a6f98]">
              Phase
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold text-[#10243d]">
              Waiting for players
            </h2>
            <p className="mt-3 font-semibold leading-7 text-[#173a56]">
              The host can start once at least 4 players have joined.
            </p>

            {isHost ? (
              <>
                <button
                  className="game-button game-button-coral mt-5 h-12 w-full px-5 font-extrabold focus:outline-none focus:ring-4 focus:ring-[#f06c64]/25"
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
              <p className="mt-5 rounded-2xl bg-[#eefbff] px-4 py-3 text-sm font-bold text-[#0a6f98]">
                Waiting for the host to start the game.
              </p>
            )}
          </div>

          {!currentPlayer ? (
            <div
              className="rounded-2xl border border-[#f0b4ae] bg-[#fff1ef] p-4 text-sm font-semibold text-[#8c2f29]"
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
    </OceanBackground>
  );
}
