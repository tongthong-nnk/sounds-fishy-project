"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useId, useState, useSyncExternalStore } from "react";
import {
  getSavedPlayerName,
  savePlayerName,
} from "@/lib/player";
import { createRoom, joinRoom } from "@/lib/roomService";

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
      className="rounded-lg border border-[#d8e1eb] bg-white p-6 shadow-[0_20px_70px_rgba(23,32,47,0.12)] sm:p-7"
      onSubmit={handleSubmit}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-[#1d6f6a]">
            Private table
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#121a27]">
            Start here
          </h2>
        </div>
        <span className="rounded-md bg-[#fff1ef] px-3 py-2 text-sm font-semibold text-[#a33e38]">
          MVP
        </span>
      </div>

      <div className="grid gap-5">
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-[#253247]"
            htmlFor={nameInputId}
          >
            Display name
          </label>
          <input
            autoComplete="nickname"
            className="h-12 w-full rounded-md border border-[#c8d3df] bg-[#fbfcfe] px-4 text-base text-[#17202f] outline-none transition focus:border-[#2f9c95] focus:bg-white focus:ring-4 focus:ring-[#2f9c95]/15"
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
            className="h-12 w-full rounded-md border border-[#c8d3df] bg-[#fbfcfe] px-4 font-mono text-lg font-semibold text-[#17202f] outline-none transition placeholder:font-sans placeholder:text-base placeholder:font-normal focus:border-[#3949a3] focus:bg-white focus:ring-4 focus:ring-[#3949a3]/15"
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
            className="rounded-md border border-[#f0b4ae] bg-[#fff1ef] px-4 py-3 text-sm font-medium text-[#8c2f29]"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        {notice ? (
          <p
            aria-live="polite"
            className="rounded-md border border-[#9fd6d1] bg-[#edf7f6] px-4 py-3 text-sm font-medium text-[#1d6f6a]"
          >
            {notice}
          </p>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            className="h-12 rounded-md bg-[#f06c64] px-5 text-base font-bold text-white transition hover:bg-[#d95851] focus:outline-none focus:ring-4 focus:ring-[#f06c64]/25 disabled:cursor-not-allowed disabled:bg-[#f0a39e]"
            disabled={Boolean(pendingAction)}
            onClick={() => handleAction("create")}
            type="button"
          >
            {pendingAction === "create" ? "Creating..." : "Create Room"}
          </button>
          <button
            className="h-12 rounded-md bg-[#253247] px-5 text-base font-bold text-white transition hover:bg-[#17202f] focus:outline-none focus:ring-4 focus:ring-[#253247]/25 disabled:cursor-not-allowed disabled:bg-[#8290a3]"
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
