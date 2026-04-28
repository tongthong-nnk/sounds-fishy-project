"use client";

import Link from "next/link";
import { useState } from "react";
import { Scoreboard } from "./Scoreboard";
import type { Player, PlayerRole, Room, RoundEndReason } from "@/lib/types";

interface ResultPhaseProps {
  currentPlayer: Player | null;
  currentPlayerId: string;
  onStartNextRound: () => Promise<void>;
  players: Player[];
  room: Room;
}

function getPlayerName(player: Player | undefined) {
  return player?.name || "Unnamed player";
}

function getRoleLabel(role: PlayerRole) {
  if (role === "guesser") {
    return "Guesser";
  }

  if (role === "truth") {
    return "Truth Teller";
  }

  if (role === "bluffer") {
    return "Bluffer";
  }

  return "Unassigned";
}

function getRoleBadgeClass(role: PlayerRole) {
  if (role === "truth") {
    return "bg-[#fff1ef] text-[#a33e38]";
  }

  if (role === "guesser") {
    return "bg-[#253247] text-white";
  }

  if (role === "bluffer") {
    return "bg-[#eef2ff] text-[#3949a3]";
  }

  return "bg-[#f1f4f8] text-[#465365]";
}

function getResultStatus(player: Player, room: Room) {
  if (player.role === "guesser") {
    return "Asked";
  }

  if (player.isEliminated) {
    return "Eliminated";
  }

  if (room.guessedPlayerIds.includes(player.playerId)) {
    return "Guessed";
  }

  return "Not guessed";
}

function getRoundEndLabel(reason: RoundEndReason) {
  if (reason === "truth_selected") {
    return "Truth Teller selected";
  }

  if (reason === "guesser_stopped") {
    return "Guesser stopped";
  }

  if (reason === "all_bluffers_found") {
    return "All Bluffers found";
  }

  return "Round ended";
}

function getRoundScoringSummary(players: Player[], room: Room) {
  const guessedPlayerIdSet = new Set(room.guessedPlayerIds);
  const bluffers = players.filter((player) => player.role === "bluffer");
  const guessedBlufferCount = bluffers.filter((player) => {
    return guessedPlayerIdSet.has(player.playerId);
  }).length;
  const unguessedBlufferCount = bluffers.length - guessedBlufferCount;
  const allBluffersFound =
    bluffers.length > 0 && guessedBlufferCount === bluffers.length;
  const guessedCount = room.guessedPlayerIds.length;
  const allBluffersBonus =
    room.roundEndReason === "all_bluffers_found" ||
    (room.roundEndReason === "guesser_stopped" && allBluffersFound)
      ? 1
      : 0;
  const guesserRoundPoints =
    room.roundEndReason === "truth_selected"
      ? 0
      : guessedBlufferCount + allBluffersBonus;
  const truthTellerRoundPoints =
    room.roundEndReason === "truth_selected" ? unguessedBlufferCount : 0;
  const survivingBlufferPoints =
    room.roundEndReason === "truth_selected" ||
    room.roundEndReason === "guesser_stopped"
      ? guessedCount
      : 0;

  return {
    allBluffersBonus,
    guessedBlufferCount,
    guessedCount,
    guesserRoundPoints,
    survivingBlufferPoints,
    truthTellerRoundPoints,
    unguessedBlufferCount,
  };
}

export function ResultPhase({
  currentPlayer,
  currentPlayerId,
  onStartNextRound,
  players,
  room,
}: ResultPhaseProps) {
  const [isStartingNextRound, setIsStartingNextRound] = useState(false);
  const [nextRoundError, setNextRoundError] = useState("");
  const guesser = players.find((player) => player.playerId === room.guesserId);
  const truthTeller = players.find((player) => {
    return player.playerId === room.truthTellerId;
  });
  const isHost =
    currentPlayer?.isHost || currentPlayer?.playerId === room.hostId || false;
  const scoringSummary = getRoundScoringSummary(players, room);
  const roundEndLabel = getRoundEndLabel(room.roundEndReason);

  async function handleStartNextRound() {
    if (!isHost || isStartingNextRound) {
      return;
    }

    setIsStartingNextRound(true);
    setNextRoundError("");

    try {
      await onStartNextRound();
    } catch (error) {
      setNextRoundError(
        error instanceof Error
          ? error.message
          : "Could not start the next round.",
      );
      setIsStartingNextRound(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-7 text-[#17202f] sm:px-8 lg:px-10">
      <section className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[1fr_340px]">
        <div className="grid gap-6">
          <div className="rounded-lg border border-[#d8e1eb] bg-white p-6 shadow-[0_20px_70px_rgba(23,32,47,0.10)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase text-[#1d6f6a]">
                  Round {room.roundNumber}
                </p>
                <p className="mt-1 font-mono text-xs font-semibold text-[#677386]">
                  Room {room.roomCode}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-[#edf7f6] px-3 py-2 text-sm font-bold text-[#1d6f6a]">
                  Result
                </span>
                <Link
                  className="inline-flex h-10 items-center rounded-md border border-[#d8e1eb] bg-[#fbfcfe] px-4 text-sm font-bold text-[#253247] transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#253247]/15"
                  href="/"
                >
                  Back to Home
                </Link>
              </div>
            </div>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-[#121a27] sm:text-4xl">
              {room.question}
            </h1>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <div className="rounded-lg border border-[#9fd6d1] bg-[#edf7f6] p-5">
                <p className="text-sm font-semibold uppercase text-[#1d6f6a]">
                  Correct answer
                </p>
                <p className="mt-2 text-2xl font-bold text-[#121a27]">
                  {room.correctAnswer}
                </p>
              </div>
              <div className="rounded-lg border border-[#e3e9f1] bg-[#fbfcfe] p-5">
                <p className="text-sm font-semibold uppercase text-[#677386]">
                  Guesser
                </p>
                <p className="mt-2 text-2xl font-bold text-[#121a27]">
                  {getPlayerName(guesser)}
                </p>
              </div>
              <div className="rounded-lg border border-[#f0b4ae] bg-[#fff1ef] p-5">
                <p className="text-sm font-semibold uppercase text-[#a33e38]">
                  Truth Teller
                </p>
                <p className="mt-2 text-2xl font-bold text-[#121a27]">
                  {getPlayerName(truthTeller)}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-[#e3e9f1] bg-[#fbfcfe] p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase text-[#677386]">
                    Round ended
                  </p>
                  <p className="mt-1 text-2xl font-bold text-[#121a27]">
                    {roundEndLabel}
                  </p>
                </div>
                <span className="rounded-md bg-[#eef2ff] px-3 py-2 text-sm font-bold text-[#3949a3]">
                  {room.guessedPlayerIds.length} guessed
                </span>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-md border border-[#e3e9f1] bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase text-[#677386]">
                    Guesser points
                  </p>
                  <p className="mt-1 text-lg font-bold text-[#121a27]">
                    +{scoringSummary.guesserRoundPoints}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#677386]">
                    {room.roundEndReason === "truth_selected"
                      ? `Lost ${scoringSummary.guessedBlufferCount} temporary point(s).`
                      : `${scoringSummary.guessedBlufferCount} caught Bluffer(s)${scoringSummary.allBluffersBonus ? " + 1 bonus" : ""}.`}
                  </p>
                </div>

                <div className="rounded-md border border-[#e3e9f1] bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase text-[#677386]">
                    Surviving Bluffers
                  </p>
                  <p className="mt-1 text-lg font-bold text-[#121a27]">
                    +{scoringSummary.survivingBlufferPoints} each
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#677386]">
                    {scoringSummary.unguessedBlufferCount} unguessed Bluffer(s).
                  </p>
                </div>

                <div className="rounded-md border border-[#e3e9f1] bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase text-[#677386]">
                    Truth Teller
                  </p>
                  <p className="mt-1 text-lg font-bold text-[#121a27]">
                    +{scoringSummary.truthTellerRoundPoints}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#677386]">
                    {room.roundEndReason === "truth_selected"
                      ? "Scores for uncaught Bluffers."
                      : "Scores only when selected."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#d8e1eb] bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[#121a27]">
                Answer Reveal
              </h2>
              <span className="rounded-md bg-[#eef2ff] px-3 py-1 text-sm font-bold text-[#3949a3]">
                Roles revealed
              </span>
            </div>

            <div className="grid gap-3">
              {players.map((player) => {
                const isTruth = player.role === "truth";
                const resultStatus = getResultStatus(player, room);

                return (
                  <article
                    className={`rounded-lg border p-4 ${
                      isTruth
                        ? "border-[#f0b4ae] bg-[#fff8f7]"
                        : "border-[#e3e9f1] bg-[#fbfcfe]"
                    }`}
                    key={player.playerId}
                  >
                    <div className="grid gap-4 lg:grid-cols-[1fr_160px_110px] lg:items-start">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-lg font-bold text-[#121a27]">
                            {getPlayerName(player)}
                          </h3>
                          <span
                            className={`rounded-md px-2 py-1 text-xs font-bold ${getRoleBadgeClass(
                              player.role,
                            )}`}
                          >
                            {getRoleLabel(player.role)}
                          </span>
                          <span
                            className={`rounded-md px-2 py-1 text-xs font-bold ${
                              resultStatus === "Eliminated"
                                ? "bg-[#edf7f6] text-[#1d6f6a]"
                                : "bg-[#eef2ff] text-[#3949a3]"
                            }`}
                          >
                            {resultStatus}
                          </span>
                        </div>
                        <p className="mt-3 rounded-md border border-[#e3e9f1] bg-white px-4 py-3 text-base font-semibold leading-7 text-[#17202f]">
                          {player.role === "guesser"
                            ? "The Guesser did not submit an answer."
                            : player.submittedAnswer || "No answer submitted"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase text-[#677386]">
                          Score
                        </p>
                        <p className="mt-2 text-2xl font-bold text-[#121a27]">
                          {player.score}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase text-[#677386]">
                          Guessed
                        </p>
                        <p className="mt-2 text-lg font-bold text-[#121a27]">
                          {room.guessedPlayerIds.includes(player.playerId)
                            ? "Yes"
                            : "No"}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="grid content-start gap-6">
          {!currentPlayer ? (
            <div
              className="rounded-lg border border-[#f0b4ae] bg-[#fff1ef] p-4 text-sm font-semibold text-[#8c2f29]"
              role="alert"
            >
              This browser is not joined to this room. Go back home and join
              again with room code {room.roomCode}.
            </div>
          ) : null}

          <Scoreboard currentPlayerId={currentPlayerId} players={players} />

          {isHost ? (
            <div className="rounded-lg border border-[#d8e1eb] bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase text-[#3949a3]">
                Host action
              </p>
              <button
                className="mt-4 h-12 w-full rounded-md bg-[#f06c64] px-5 font-bold text-white transition hover:bg-[#d95851] focus:outline-none focus:ring-4 focus:ring-[#f06c64]/25 disabled:cursor-not-allowed disabled:bg-[#f0a39e]"
                disabled={isStartingNextRound}
                onClick={handleStartNextRound}
                type="button"
              >
                {isStartingNextRound ? "Starting..." : "Next Round"}
              </button>
              {nextRoundError ? (
                <p
                  className="mt-3 rounded-md border border-[#f0b4ae] bg-[#fff1ef] px-4 py-3 text-sm font-semibold text-[#8c2f29]"
                  role="alert"
                >
                  {nextRoundError}
                </p>
              ) : null}
            </div>
          ) : null}
        </aside>
      </section>
    </main>
  );
}
