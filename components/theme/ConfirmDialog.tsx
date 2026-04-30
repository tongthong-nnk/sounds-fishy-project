"use client";

import { useCallback, useEffect } from "react";

interface ConfirmDialogProps {
  confirmLabel: string;
  isConfirming?: boolean;
  isOpen: boolean;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  variant?: "warning" | "danger";
}

export function ConfirmDialog({
  confirmLabel,
  isConfirming = false,
  isOpen,
  message,
  onCancel,
  onConfirm,
  title,
  variant = "warning",
}: ConfirmDialogProps) {
  const handleCancel = useCallback(() => {
    if (!isConfirming) {
      onCancel();
    }
  }, [isConfirming, onCancel]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleCancel();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleCancel, isOpen]);

  if (!isOpen) {
    return null;
  }

  const confirmClass =
    variant === "danger"
      ? "game-button game-button-coral"
      : "game-button game-button-gold";

  return (
    <div
      aria-labelledby="confirm-dialog-title"
      aria-modal="true"
      className="confirm-dialog-backdrop"
      onMouseDown={handleCancel}
      role="dialog"
    >
      <div
        className="confirm-dialog-panel"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <p className="confirm-dialog-kicker">Host control</p>
        <h2 className="confirm-dialog-title" id="confirm-dialog-title">
          {title}
        </h2>
        <p className="confirm-dialog-message">{message}</p>

        <div className="confirm-dialog-actions">
          <button
            className="game-button game-button-soft h-11 px-5 font-extrabold"
            disabled={isConfirming}
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className={`${confirmClass} h-11 px-5 font-extrabold`}
            disabled={isConfirming}
            onClick={onConfirm}
            type="button"
          >
            {isConfirming ? "Working..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
