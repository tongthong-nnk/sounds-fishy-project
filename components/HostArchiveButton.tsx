"use client";

import { useState } from "react";

interface HostArchiveButtonProps {
  className?: string;
  isHost: boolean;
  onArchiveRoom: () => Promise<void>;
}

export function HostArchiveButton({
  className = "",
  isHost,
  onArchiveRoom,
}: HostArchiveButtonProps) {
  const [isArchiving, setIsArchiving] = useState(false);
  const [archiveError, setArchiveError] = useState("");

  async function handleArchiveRoom() {
    if (!isHost || isArchiving) {
      return;
    }

    const shouldArchive = window.confirm(
      "End this room? Players will see the final scoreboard and gameplay actions will stop.",
    );

    if (!shouldArchive) {
      return;
    }

    setIsArchiving(true);
    setArchiveError("");

    try {
      await onArchiveRoom();
    } catch (error) {
      setArchiveError(
        error instanceof Error ? error.message : "Could not end the room.",
      );
      setIsArchiving(false);
    }
  }

  if (!isHost) {
    return null;
  }

  return (
    <div className={className}>
      <button
        className="h-11 w-full rounded-md border border-[#f0b4ae] bg-[#fff8f7] px-5 font-bold text-[#a33e38] transition hover:bg-[#fff1ef] focus:outline-none focus:ring-4 focus:ring-[#f06c64]/20 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isArchiving}
        onClick={handleArchiveRoom}
        type="button"
      >
        {isArchiving ? "Ending..." : "End Game"}
      </button>
      {archiveError ? (
        <p
          className="mt-3 rounded-md border border-[#f0b4ae] bg-[#fff1ef] px-4 py-3 text-sm font-semibold text-[#8c2f29]"
          role="alert"
        >
          {archiveError}
        </p>
      ) : null}
    </div>
  );
}
