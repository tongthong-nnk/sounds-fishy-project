"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import type { Player, PlayerRole, Room } from "@/lib/types";

interface AnswerPhaseProps {
  currentPlayer: Player | null;
  onSubmitAnswer: (playerId: string, answer: string) => Promise<void>;
  players: Player[];
  room: Room;
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

  return "Observer";
}

function getRoleMessage(role: PlayerRole) {
  if (role === "guesser") {
    return "Wait while everyone else submits an answer. You will compare answers in the next phase.";
  }

  if (role === "truth") {
    return "You know the real answer. Submit it so the Guesser has one truthful answer to find.";
  }

  if (role === "bluffer") {
    return "Invent a believable fake answer. Make it sound just plausible enough.";
  }

  return "This browser is not currently assigned a role in the room.";
}

function getRoleBadgeClass(role: PlayerRole) {
  if (role === "truth") {
    return "bg-[#edf7f6] text-[#1d6f6a]";
  }

  if (role === "guesser") {
    return "bg-[#fff1ef] text-[#a33e38]";
  }

  if (role === "bluffer") {
    return "bg-[#eef2ff] text-[#3949a3]";
  }

  return "bg-[#f1f4f8] text-[#465365]";
}

export function AnswerPhase({
  currentPlayer,
  onSubmitAnswer,
  players,
  room,
}: AnswerPhaseProps) {
  const [draftAnswer, setDraftAnswer] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const currentRole = currentPlayer?.role ?? null;
  const nonGuessers = players.filter((player) => player.role !== "guesser");
  const guesser = players.find((player) => player.playerId === room.guesserId);
  const canSubmit = currentRole === "truth" || currentRole === "bluffer";
  const answerValue =
    currentRole === "truth"
      ? room.correctAnswer
      : draftAnswer ?? currentPlayer?.submittedAnswer ?? "";
  const hasSubmitted = currentPlayer?.hasSubmitted ?? false;
  const submittedCount = nonGuessers.filter((player) => {
    return player.hasSubmitted;
  }).length;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentPlayer || !canSubmit || isSubmitting) {
      return;
    }

    const cleanAnswer = answerValue.trim();

    if (!cleanAnswer) {
      setSubmitError("Enter an answer before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await onSubmitAnswer(currentPlayer.playerId, cleanAnswer);
      setDraftAnswer(cleanAnswer);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Could not submit answer.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-7 text-[#17202f] sm:px-8 lg:px-10">
      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
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
              <span className="rounded-md bg-[#eef2ff] px-3 py-2 text-sm font-bold text-[#3949a3]">
                Answering
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

          <div className="mt-6 rounded-lg border border-[#e3e9f1] bg-[#fbfcfe] p-5">
            <p className="text-sm font-semibold uppercase text-[#677386]">
              Your role
            </p>
            <span
              className={`mt-2 inline-flex rounded-md px-3 py-2 text-sm font-bold ${getRoleBadgeClass(
                currentRole,
              )}`}
            >
              {getRoleLabel(currentRole)}
            </span>
            <p className="mt-3 leading-7 text-[#465365]">
              {getRoleMessage(currentRole)}
            </p>
          </div>

          {!currentPlayer ? (
            <div
              className="mt-5 rounded-lg border border-[#f0b4ae] bg-[#fff1ef] p-4 text-sm font-semibold text-[#8c2f29]"
              role="alert"
            >
              This browser is not joined to this room. Go back home and join
              again with room code {room.roomCode}.
            </div>
          ) : null}

          {currentRole === "truth" ? (
            <div className="mt-5 rounded-lg border border-[#9fd6d1] bg-[#edf7f6] p-5">
              <p className="text-sm font-semibold uppercase text-[#1d6f6a]">
                Correct answer
              </p>
              <p className="mt-2 text-2xl font-bold text-[#121a27]">
                {room.correctAnswer}
              </p>
            </div>
          ) : null}

          {canSubmit ? (
            <form
              className="mt-5 rounded-lg border border-[#e3e9f1] bg-white p-5"
              onSubmit={handleSubmit}
            >
              <label
                className="block text-sm font-semibold uppercase text-[#677386]"
                htmlFor="answer-input"
              >
                {currentRole === "truth" ? "Submit truth" : "Your fake answer"}
              </label>
              <textarea
                className="mt-3 min-h-28 w-full resize-none rounded-md border border-[#c8d3df] bg-[#fbfcfe] px-4 py-3 text-base text-[#17202f] outline-none transition focus:border-[#2f9c95] focus:bg-white focus:ring-4 focus:ring-[#2f9c95]/15 disabled:text-[#465365]"
                disabled={currentRole === "truth" || isSubmitting}
                id="answer-input"
                maxLength={120}
                onChange={(event) => setDraftAnswer(event.target.value)}
                placeholder="Type a believable answer"
                value={answerValue}
              />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#465365]">
                  {hasSubmitted
                    ? "Submitted. You can update it while this phase is still open."
                    : "Submissions stay hidden until guessing starts."}
                </p>
                <button
                  className="h-11 rounded-md bg-[#f06c64] px-5 font-bold text-white transition hover:bg-[#d95851] focus:outline-none focus:ring-4 focus:ring-[#f06c64]/25 disabled:cursor-not-allowed disabled:bg-[#f0a39e]"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : hasSubmitted
                      ? "Update Answer"
                      : "Submit Answer"}
                </button>
              </div>
              {submitError ? (
                <p
                  className="mt-3 rounded-md border border-[#f0b4ae] bg-[#fff1ef] px-4 py-3 text-sm font-semibold text-[#8c2f29]"
                  role="alert"
                >
                  {submitError}
                </p>
              ) : null}
            </form>
          ) : null}
        </div>

        <aside className="grid gap-6">
          <div className="rounded-lg border border-[#d8e1eb] bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase text-[#3949a3]">
              Guesser
            </p>
            <p className="mt-2 text-xl font-bold text-[#121a27]">
              {guesser?.name ?? "Selecting..."}
            </p>
          </div>

          <div className="rounded-lg border border-[#d8e1eb] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[#121a27]">
                Submission Status
              </h2>
              <span className="rounded-md bg-[#fff1ef] px-3 py-1 text-sm font-bold text-[#a33e38]">
                {submittedCount}/{nonGuessers.length}
              </span>
            </div>
            <ul className="grid gap-3">
              {nonGuessers.map((player) => (
                <li
                  className="flex items-center justify-between gap-3 rounded-md border border-[#e3e9f1] bg-[#fbfcfe] px-4 py-3"
                  key={player.playerId}
                >
                  <span className="truncate font-bold text-[#17202f]">
                    {player.name || "Unnamed player"}
                  </span>
                  <span
                    className={`shrink-0 rounded-md px-2 py-1 text-xs font-bold ${
                      player.hasSubmitted
                        ? "bg-[#edf7f6] text-[#1d6f6a]"
                        : "bg-[#eef2ff] text-[#3949a3]"
                    }`}
                  >
                    {player.hasSubmitted ? "Submitted" : "Waiting"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
