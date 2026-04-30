"use client";

import Link from "next/link";
import { useState } from "react";
import { HostArchiveButton } from "./HostArchiveButton";
import { Scoreboard } from "./Scoreboard";
import { playUiSound } from "./theme/audioEvents";
import { OceanBackground } from "./theme/OceanBackground";
import type { Player, Room } from "@/lib/types";

interface GuessingPhaseProps {
  currentPlayer: Player | null;
  onArchiveRoom: () => Promise<void>;
  onGuessPlayer: (playerId: string) => Promise<void>;
  onRevealPlayerAnswer: (playerId: string) => Promise<void>;
  onStopGuessing: () => Promise<void>;
  players: Player[];
  room: Room;
}

type PendingAction =
  | {
      playerId: string;
      type: "guess" | "reveal";
    }
  | { type: "stop" }
  | null;

function getPlayerName(player: Player | undefined) {
  return player?.name || "Unnamed player";
}

export function GuessingPhase({
  currentPlayer,
  onArchiveRoom,
  onGuessPlayer,
  onRevealPlayerAnswer,
  onStopGuessing,
  players,
  room,
}: GuessingPhaseProps) {
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [guessError, setGuessError] = useState("");
  const guesser = players.find((player) => player.playerId === room.guesserId);
  const answerPlayers = players.filter((player) => {
    return player.playerId !== room.guesserId;
  });
  const isGuesser = currentPlayer?.playerId === room.guesserId;
  const isHost =
    currentPlayer?.isHost || currentPlayer?.playerId === room.hostId || false;
  const activeGuessCount = room.guessedPlayerIds.length;
  const revealedCount = room.revealedPlayerIds.length;
  const bankedPointCount = players.filter((player) => {
    return (
      player.role === "bluffer" && room.guessedPlayerIds.includes(player.playerId)
    );
  }).length;
  const isStopping = pendingAction?.type === "stop";

  function isPlayerRevealed(player: Player) {
    return (
      room.revealedPlayerIds.includes(player.playerId) ||
      room.guessedPlayerIds.includes(player.playerId) ||
      player.isEliminated
    );
  }

  async function handleReveal(playerId: string) {
    if (pendingAction) {
      return;
    }

    setPendingAction({ playerId, type: "reveal" });
    setGuessError("");
    playUiSound("reveal");

    try {
      await onRevealPlayerAnswer(playerId);
      playUiSound("success");
    } catch (error) {
      setGuessError(
        error instanceof Error ? error.message : "Could not reveal answer.",
      );
    } finally {
      setPendingAction(null);
    }
  }

  async function handleGuess(playerId: string) {
    if (!isGuesser || pendingAction) {
      return;
    }

    setPendingAction({ playerId, type: "guess" });
    setGuessError("");
    playUiSound("guess");

    try {
      await onGuessPlayer(playerId);
      playUiSound("success");
    } catch (error) {
      setGuessError(
        error instanceof Error ? error.message : "Could not submit guess.",
      );
    } finally {
      setPendingAction(null);
    }
  }

  async function handleStopGuessing() {
    if (!isGuesser || pendingAction) {
      return;
    }

    setPendingAction({ type: "stop" });
    setGuessError("");
    playUiSound("click");

    try {
      await onStopGuessing();
      playUiSound("success");
    } catch (error) {
      setGuessError(
        error instanceof Error ? error.message : "Could not bank points.",
      );
    } finally {
      setPendingAction(null);
    }
  }

  return (
    <OceanBackground>
      <main className="min-h-screen px-5 py-7 text-[#10243d] sm:px-8 lg:px-10">
      <section className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[1fr_320px]">
        <div className="grid gap-6">
          <div className="game-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-extrabold uppercase text-[#0a6f98]">
                  Round {room.roundNumber}
                </p>
                <p className="mt-1 font-mono text-xs font-semibold text-[#677386]">
                  Room {room.roomCode}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="phase-pill px-3 py-2 text-sm">
                  Guessing
                </span>
                <Link
                  className="game-button game-button-soft inline-flex h-10 items-center px-4 text-sm font-extrabold focus:outline-none focus:ring-4 focus:ring-[#253247]/15"
                  href="/"
                >
                  Back to Home
                </Link>
              </div>
            </div>

            <h1 className="font-display mt-5 text-3xl font-bold leading-tight text-[#10243d] sm:text-4xl">
              {room.question}
            </h1>

            <div className="mt-5 grid gap-3 md:grid-cols-4">
              <div className="game-card-soft px-4 py-3">
                <p className="text-xs font-semibold uppercase text-[#677386]">
                  Guesser
                </p>
                <p className="mt-1 truncate text-lg font-bold text-[#121a27]">
                  {getPlayerName(guesser)}
                </p>
              </div>
              <div className="game-card-soft px-4 py-3">
                <p className="text-xs font-semibold uppercase text-[#677386]">
                  Guesses made
                </p>
                <p className="mt-1 text-lg font-bold text-[#121a27]">
                  {activeGuessCount}
                </p>
              </div>
              <div className="game-card-soft px-4 py-3">
                <p className="text-xs font-semibold uppercase text-[#677386]">
                  Banked points
                </p>
                <p className="mt-1 text-lg font-bold text-[#121a27]">
                  {bankedPointCount}
                </p>
              </div>
              <div className="game-card-soft px-4 py-3">
                <p className="text-xs font-semibold uppercase text-[#677386]">
                  Your status
                </p>
                <p className="mt-1 truncate text-lg font-bold text-[#121a27]">
                  {isGuesser ? "Ask, then guess" : "Reveal if asked"}
                </p>
              </div>
            </div>

            {isGuesser ? (
              <div className="game-card-soft mt-5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-[#121a27]">
                      Current bank: {bankedPointCount}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#677386]">
                      Stop now to keep these points, or keep guessing and risk
                      the Truth Teller.
                    </p>
                  </div>
                  <button
                    className="game-button game-button-gold h-11 px-5 font-extrabold focus:outline-none focus:ring-4 focus:ring-[#253247]/20"
                    disabled={Boolean(pendingAction)}
                    onClick={() => {
                      void handleStopGuessing();
                    }}
                    type="button"
                  >
                    {isStopping ? "Banking..." : "Stop / Bank Points"}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {!currentPlayer ? (
            <div
              className="rounded-lg border border-[#f0b4ae] bg-[#fff1ef] p-4 text-sm font-semibold text-[#8c2f29]"
              role="alert"
            >
              This browser is not joined to this room. Go back home and join
              again with room code {room.roomCode}.
            </div>
          ) : null}

          {guessError ? (
            <div
              className="rounded-lg border border-[#f0b4ae] bg-[#fff1ef] p-4 text-sm font-semibold text-[#8c2f29]"
              role="alert"
            >
              {guessError}
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            {answerPlayers.map((player) => {
              const hasBeenGuessed =
                player.isEliminated ||
                room.guessedPlayerIds.includes(player.playerId);
              const isRevealed = isPlayerRevealed(player);
              const isCardOwner = currentPlayer?.playerId === player.playerId;
              const isPendingReveal =
                pendingAction?.type === "reveal" &&
                pendingAction.playerId === player.playerId;
              const isPendingGuess =
                pendingAction?.type === "guess" &&
                pendingAction.playerId === player.playerId;
              const canReveal =
                isCardOwner && !isRevealed && !hasBeenGuessed && !pendingAction;
              const canGuess =
                isGuesser && isRevealed && !hasBeenGuessed && !pendingAction;

              return (
                <article
                  className={`game-card p-5 transition ${
                    hasBeenGuessed
                      ? "border-[#9fd6d1] bg-[#edf7f6]"
                      : "border-white/75"
                  }`}
                  key={player.playerId}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-lg font-bold text-[#121a27]">
                        {getPlayerName(player)}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase text-[#677386]">
                        {isRevealed ? "Submitted answer" : "Hidden answer"}
                      </p>
                    </div>
                    {hasBeenGuessed ? (
                      <span className="shrink-0 rounded-md bg-[#d8f0ed] px-2 py-1 text-xs font-bold text-[#1d6f6a]">
                        Eliminated
                      </span>
                    ) : isRevealed ? (
                      <span className="shrink-0 rounded-md bg-[#eef2ff] px-2 py-1 text-xs font-bold text-[#3949a3]">
                        Revealed
                      </span>
                    ) : (
                      <span className="shrink-0 rounded-md bg-[#f3f5f8] px-2 py-1 text-xs font-bold text-[#677386]">
                        Hidden
                      </span>
                    )}
                  </div>

                  {isRevealed ? (
                    <p className="game-card-soft mt-4 min-h-20 px-4 py-3 text-xl font-bold leading-7 text-[#10243d]">
                      {player.submittedAnswer || "No answer submitted"}
                    </p>
                  ) : (
                    <div className="answer-card-hidden mt-4 min-h-20 rounded-[1.15rem] px-4 py-3">
                      <p className="font-display text-xl font-bold leading-7 text-[#10243d]">
                        Answer hidden
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#677386]">
                        {isGuesser
                          ? "Ask this player to explain their answer, then wait for them to reveal."
                          : isCardOwner
                            ? "Reveal your answer when the Guesser asks."
                            : "Not revealed yet."}
                      </p>
                    </div>
                  )}

                  {!isRevealed ? (
                    isCardOwner ? (
                      <button
                        className="game-button game-button-blue mt-4 h-11 w-full px-5 font-extrabold focus:outline-none focus:ring-4 focus:ring-[#3949a3]/25"
                        disabled={!canReveal}
                        onClick={() => {
                          void handleReveal(player.playerId);
                        }}
                        type="button"
                      >
                        {isPendingReveal ? "Revealing..." : "Reveal My Answer"}
                      </button>
                    ) : (
                      <p className="mt-4 rounded-md border border-[#e3e9f1] bg-[#fbfcfe] px-4 py-3 text-center text-sm font-bold text-[#677386]">
                        {isGuesser
                          ? "Waiting for this player to reveal"
                          : "Not revealed yet"}
                      </p>
                    )
                  ) : (
                    <button
                      className="game-button game-button-coral mt-4 h-11 w-full px-5 font-extrabold focus:outline-none focus:ring-4 focus:ring-[#f06c64]/25"
                      disabled={!canGuess}
                      onClick={() => {
                        void handleGuess(player.playerId);
                      }}
                      type="button"
                    >
                      {isPendingGuess
                        ? "Submitting..."
                        : hasBeenGuessed
                          ? "Already Guessed"
                          : isGuesser
                            ? "Guess as Bluffer"
                            : "Waiting For Guesser"}
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        <aside className="grid content-start gap-6">
          <Scoreboard
            currentPlayerId={currentPlayer?.playerId ?? ""}
            players={players}
          />

          <HostArchiveButton
            isHost={isHost}
            onArchiveRoom={onArchiveRoom}
          />

          <div className="game-card p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[#121a27]">
                Player Status
              </h2>
              <span className="rounded-md bg-[#eef2ff] px-2 py-1 text-xs font-bold text-[#3949a3]">
                {revealedCount}/{answerPlayers.length} revealed
              </span>
            </div>
            <ul className="mt-4 grid gap-3">
              {answerPlayers.map((player) => {
                const hasBeenGuessed =
                  player.isEliminated ||
                  room.guessedPlayerIds.includes(player.playerId);
                const isRevealed = isPlayerRevealed(player);

                return (
                  <li
                    className="flex items-center justify-between gap-3 rounded-md border border-[#e3e9f1] bg-[#fbfcfe] px-4 py-3"
                    key={player.playerId}
                  >
                    <span className="truncate font-bold text-[#17202f]">
                      {getPlayerName(player)}
                    </span>
                    <span
                      className={`shrink-0 rounded-md px-2 py-1 text-xs font-bold ${
                        hasBeenGuessed
                          ? "bg-[#edf7f6] text-[#1d6f6a]"
                          : isRevealed
                            ? "bg-[#eef2ff] text-[#3949a3]"
                            : "bg-[#f3f5f8] text-[#677386]"
                      }`}
                    >
                      {hasBeenGuessed
                        ? "Guessed"
                        : isRevealed
                          ? "Revealed"
                          : "Hidden"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </section>
    </main>
    </OceanBackground>
  );
}
