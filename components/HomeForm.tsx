"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useId, useState, useSyncExternalStore } from "react";
import {
  getSavedPlayerName,
  savePlayerName,
} from "@/lib/player";
import { createRoom, joinRoom } from "@/lib/roomService";
import { playUiSound } from "./theme/audioEvents";

type PendingAction = "create" | "join";

function normalizeRoomCode(value: string) {
  return value.replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 6);
}

function subscribeToSavedPlayerName(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getSavedPlayerNameSnapshot() {
  return getSavedPlayerName();
}

export function HomeForm() {
  const router = useRouter();
  const nameInputId = useId();
  const roomCodeInputId = useId();
  const savedPlayerName = useSyncExternalStore(
    subscribeToSavedPlayerName,
    getSavedPlayerNameSnapshot,
    () => "",
  );
  const [draftPlayerName, setDraftPlayerName] = useState<string | null>(null);
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(
    null,
  );
  const playerName = draftPlayerName ?? savedPlayerName;

  function updatePlayerName(value: string) {
    setDraftPlayerName(value);
    savePlayerName(value);
    setError("");
    setNotice("");
  }

  function updateRoomCode(value: string) {
    setRoomCode(normalizeRoomCode(value));
    setError("");
    setNotice("");
  }

  function validate(action: PendingAction) {
    if (!playerName.trim()) {
      setError("Enter a display name before continuing.");
      return false;
    }

    if (action === "join" && !roomCode.trim()) {
      setError("Enter a room code to join.");
      return false;
    }

    return true;
  }

  function getErrorMessage(errorValue: unknown) {
    if (errorValue instanceof Error) {
      return errorValue.message;
    }

    return "Something went wrong. Please try again.";
  }

  async function handleAction(action: PendingAction) {
    if (pendingAction) {
      return;
    }

    if (!validate(action)) {
      setNotice("");
      return;
    }

    playUiSound("click");

    const cleanName = playerName.trim();
    savePlayerName(cleanName);
    setDraftPlayerName(cleanName);
    setError("");
    setNotice("");
    setPendingAction(action);

    try {
      const result =
        action === "create"
          ? await createRoom(cleanName)
          : await joinRoom(roomCode, cleanName);

      setNotice(`Room ${result.roomCode} is ready.`);
      playUiSound("success");
      router.push(`/room/${result.roomCode}`);
    } catch (errorValue) {
      setError(getErrorMessage(errorValue));
      setPendingAction(null);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleAction(roomCode ? "join" : "create");
  }

  return (
    <form
      className="game-card relative overflow-hidden p-5 sm:p-6"
      onSubmit={handleSubmit}
    >
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-[#ffc857]/35 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#42c8f2]/30 blur-2xl"
      />
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-extrabold uppercase text-[#0a6f98]">
            Private table
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold text-[#10243d]">
            Start here
          </h2>
        </div>
      </div>

      <div className="relative grid gap-4">
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-[#253247]"
            htmlFor={nameInputId}
          >
            Display name
          </label>
          <input
            autoComplete="nickname"
            className="game-input h-12 w-full px-4 text-base"
            disabled={Boolean(pendingAction)}
            id={nameInputId}
            maxLength={24}
            onChange={(event) => updatePlayerName(event.target.value)}
            placeholder="Captain Cod"
            type="text"
            value={playerName}
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-semibold text-[#253247]"
            htmlFor={roomCodeInputId}
          >
            Room code
          </label>
          <input
            autoComplete="off"
            className="game-input h-12 w-full px-4 font-mono text-lg font-semibold placeholder:font-sans placeholder:text-base placeholder:font-normal"
            disabled={Boolean(pendingAction)}
            id={roomCodeInputId}
            inputMode="text"
            maxLength={6}
            onChange={(event) => updateRoomCode(event.target.value)}
            placeholder="ABC123"
            type="text"
            value={roomCode}
          />
        </div>

        {error ? (
          <p
            className="rounded-2xl border border-[#ffb0a8] bg-[#fff1ef] px-4 py-3 text-sm font-bold text-[#8c2f29]"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        {notice ? (
          <p
            aria-live="polite"
            className="rounded-2xl border border-[#9fd6d1] bg-[#edf7f6] px-4 py-3 text-sm font-bold text-[#1d6f6a]"
          >
            {notice}
          </p>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            className="game-button game-button-coral h-[3.25rem] px-5 text-base font-extrabold focus:outline-none focus:ring-4 focus:ring-[#f06c64]/25"
            disabled={Boolean(pendingAction)}
            onClick={() => handleAction("create")}
            type="button"
          >
            {pendingAction === "create" ? "Creating..." : "Create Room"}
          </button>
          <button
            className="game-button game-button-blue h-[3.25rem] px-5 text-base font-extrabold focus:outline-none focus:ring-4 focus:ring-[#253247]/25"
            disabled={Boolean(pendingAction)}
            onClick={() => handleAction("join")}
            type="button"
          >
            {pendingAction === "join" ? "Joining..." : "Join Room"}
          </button>
        </div>
      </div>
    </form>
  );
}
