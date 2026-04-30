"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import { HostArchiveButton } from "./HostArchiveButton";
import { playUiSound } from "./theme/audioEvents";
import { ConfirmDialog } from "./theme/ConfirmDialog";
import { OceanBackground } from "./theme/OceanBackground";
import { RoleBadge } from "./theme/RoleBadge";
import type { Player, PlayerRole, Room } from "@/lib/types";

interface AnswerPhaseProps {
  currentPlayer: Player | null;
  onArchiveRoom: () => Promise<void>;
  onSkipQuestion: () => Promise<void>;
  onSubmitAnswer: (playerId: string, answer: string) => Promise<void>;
  players: Player[];
  room: Room;
}

function getRoleMessage(role: PlayerRole) {
  if (role === "guesser") {
    return "Wait while everyone else submits an answer. You will compare answers in the next phase.";
  }

  if (role === "truth") {
    return "You know the real answer. Submit it so the Guesser has one truthful answer to find.";
  }

  if (role === "bluffer") {
    return "Use the correct answer as context, then invent a believable fake answer. Do not submit the exact correct answer.";
  }

  return "This browser is not currently assigned a role in the room.";
}

export function AnswerPhase({
  currentPlayer,
  onArchiveRoom,
  onSkipQuestion,
  onSubmitAnswer,
  players,
  room,
}: AnswerPhaseProps) {
  const [draftAnswer, setDraftAnswer] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSkippingQuestion, setIsSkippingQuestion] = useState(false);
  const [isSkipDialogOpen, setIsSkipDialogOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [skipError, setSkipError] = useState("");
  const currentRole = currentPlayer?.role ?? null;
  const nonGuessers = players.filter((player) => player.role !== "guesser");
  const guesser = players.find((player) => player.playerId === room.guesserId);
  const canSubmit = currentRole === "truth" || currentRole === "bluffer";
  const canSeeCorrectAnswer =
    currentRole === "truth" || currentRole === "bluffer";
  const answerValue =
    currentRole === "truth"
      ? room.correctAnswer
      : draftAnswer ?? currentPlayer?.submittedAnswer ?? "";
  const hasSubmitted = currentPlayer?.hasSubmitted ?? false;
  const submittedCount = nonGuessers.filter((player) => {
    return player.hasSubmitted;
  }).length;
  const isHost =
    currentPlayer?.isHost || currentPlayer?.playerId === room.hostId || false;

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

    if (
      currentRole === "bluffer" &&
      cleanAnswer.toLocaleLowerCase() === room.correctAnswer.toLocaleLowerCase()
    ) {
      setSubmitError(
        "Bluffers should submit a fake answer, not the exact correct answer.",
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    playUiSound("click");

    try {
      await onSubmitAnswer(currentPlayer.playerId, cleanAnswer);
      setDraftAnswer(cleanAnswer);
      playUiSound("success");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Could not submit answer.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleOpenSkipDialog() {
    if (!isHost || isSkippingQuestion) {
      return;
    }

    playUiSound("warning");
    setIsSkipDialogOpen(true);
  }

  async function handleSkipQuestion() {
    if (!isHost || isSkippingQuestion) {
      return;
    }

    setIsSkippingQuestion(true);
    setSkipError("");
    playUiSound("warning");

    try {
      await onSkipQuestion();
      setDraftAnswer(null);
      setIsSkipDialogOpen(false);
      playUiSound("success");
    } catch (error) {
      setSkipError(
        error instanceof Error ? error.message : "Could not skip question.",
      );
    } finally {
      setIsSkippingQuestion(false);
    }
  }

  return (
    <OceanBackground>
      <main className="min-h-screen px-5 py-7 text-[#10243d] sm:px-8 lg:px-10">
      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
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
                  Answering
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

          <div className="game-card-soft mt-6 p-5">
            <p className="text-sm font-extrabold uppercase text-[#52708b]">
              Your role
            </p>
            <RoleBadge className="mt-2 text-sm" role={currentRole} />
            <p className="mt-3 font-semibold leading-7 text-[#173a56]">
              {getRoleMessage(currentRole)}
            </p>
          </div>

          {isHost ? (
            <div className="game-card-soft mt-5 p-5">
              <p className="text-sm font-extrabold uppercase text-[#0a6f98]">
                Host controls
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  className="game-button game-button-blue h-11 px-5 font-extrabold focus:outline-none focus:ring-4 focus:ring-[#3949a3]/25"
                  disabled={isSkippingQuestion}
                  onClick={handleOpenSkipDialog}
                  type="button"
                >
                  {isSkippingQuestion ? "Skipping..." : "Skip Question"}
                </button>
                <HostArchiveButton
                  isHost={isHost}
                  onArchiveRoom={onArchiveRoom}
                />
              </div>
              {skipError ? (
                <p
                  className="mt-3 rounded-md border border-[#f0b4ae] bg-[#fff1ef] px-4 py-3 text-sm font-semibold text-[#8c2f29]"
                  role="alert"
                >
                  {skipError}
                </p>
              ) : null}
            </div>
          ) : null}

          {!currentPlayer ? (
            <div
              className="mt-5 rounded-lg border border-[#f0b4ae] bg-[#fff1ef] p-4 text-sm font-semibold text-[#8c2f29]"
              role="alert"
            >
              This browser is not joined to this room. Go back home and join
              again with room code {room.roomCode}.
            </div>
          ) : null}

          {canSeeCorrectAnswer ? (
            <div className="mt-5 rounded-[1.25rem] border-2 border-[#9fd6d1] bg-[#e9fbff]/90 p-5 shadow-[0_1rem_2rem_rgba(8,63,91,0.10)]">
              <p className="text-sm font-extrabold uppercase text-[#0a6f98]">
                Correct answer
              </p>
              <p className="font-display mt-2 text-2xl font-bold text-[#10243d]">
                {room.correctAnswer}
              </p>
              {currentRole === "bluffer" ? (
                <p className="mt-3 text-sm font-semibold text-[#1d6f6a]">
                  Use this as context. Your submitted answer should be a
                  believable fake, not this exact answer.
                </p>
              ) : null}
            </div>
          ) : null}

          {canSubmit ? (
            <form
              className="game-card-soft mt-5 p-5"
              onSubmit={handleSubmit}
            >
              <label
                className="block text-sm font-semibold uppercase text-[#677386]"
                htmlFor="answer-input"
              >
                {currentRole === "truth" ? "Submit truth" : "Your fake answer"}
              </label>
              <textarea
                className="game-input mt-3 min-h-28 w-full resize-none px-4 py-3 text-base disabled:text-[#465365]"
                disabled={currentRole === "truth" || isSubmitting}
                id="answer-input"
                maxLength={120}
                onChange={(event) => setDraftAnswer(event.target.value)}
                placeholder={
                  currentRole === "bluffer"
                    ? "Type a believable fake answer"
                    : "Type a believable answer"
                }
                value={answerValue}
              />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#465365]">
                  {hasSubmitted
                    ? "Submitted. You can update it while this phase is still open."
                    : "Submissions stay hidden until guessing starts."}
                </p>
                <button
                  className="game-button game-button-coral h-11 px-5 font-extrabold focus:outline-none focus:ring-4 focus:ring-[#f06c64]/25"
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
          <div className="game-card p-5">
            <p className="text-sm font-extrabold uppercase text-[#0a6f98]">
              Guesser
            </p>
            <p className="font-display mt-2 text-xl font-bold text-[#10243d]">
              {guesser?.name ?? "Selecting..."}
            </p>
          </div>

          <div className="game-card p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-display text-xl font-bold text-[#10243d]">
                Submission Status
              </h2>
              <span className="status-pill bg-[#fff1ef] px-3 py-1 text-sm text-[#bf3446]">
                {submittedCount}/{nonGuessers.length}
              </span>
            </div>
            <ul className="grid gap-3">
              {nonGuessers.map((player) => (
                <li
                  className="game-card-soft flex items-center justify-between gap-3 px-4 py-3"
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
      <ConfirmDialog
        confirmLabel="Skip Question"
        isConfirming={isSkippingQuestion}
        isOpen={isSkipDialogOpen}
        message="Current submitted answers for this round will be cleared."
        onCancel={() => setIsSkipDialogOpen(false)}
        onConfirm={() => {
          void handleSkipQuestion();
        }}
        title="Skip question?"
        variant="warning"
      />
    </main>
    </OceanBackground>
  );
}
