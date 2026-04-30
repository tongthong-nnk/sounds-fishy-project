"use client";

import { useState } from "react";
import { playUiSound } from "./theme/audioEvents";
import { ConfirmDialog } from "./theme/ConfirmDialog";

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
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  function handleOpenConfirm() {
    if (!isHost || isArchiving) {
      return;
    }

    playUiSound("warning");
    setIsConfirmOpen(true);
  }

  async function handleArchiveRoom() {
    if (!isHost || isArchiving) {
      return;
    }

    setIsArchiving(true);
    setArchiveError("");
    playUiSound("warning");

    try {
      await onArchiveRoom();
      playUiSound("success");
    } catch (error) {
      setArchiveError(
        error instanceof Error ? error.message : "Could not end the room.",
      );
      setIsArchiving(false);
      setIsConfirmOpen(false);
    }
  }

  if (!isHost) {
    return null;
  }

  return (
    <div className={className}>
      <button
        className="game-button game-button-danger-soft h-11 w-full px-5 font-extrabold focus:outline-none focus:ring-4 focus:ring-[#f06c64]/20"
        disabled={isArchiving}
        onClick={handleOpenConfirm}
        type="button"
      >
        {isArchiving ? "Ending..." : "End Game"}
      </button>
      <ConfirmDialog
        confirmLabel="End Game"
        isConfirming={isArchiving}
        isOpen={isConfirmOpen}
        message="This room will be archived and players will see the final scoreboard."
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          void handleArchiveRoom();
        }}
        title="End game?"
        variant="danger"
      />
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
