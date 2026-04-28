import type { Player, TimestampValue } from "./types";

export const ONLINE_WINDOW_MS = 45_000;

function getTimestampMillis(value: TimestampValue) {
  if (!value) {
    return 0;
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value.toMillis === "function") {
    return value.toMillis();
  }

  return value.seconds * 1000 + Math.floor(value.nanoseconds / 1_000_000);
}

export function isPlayerOnline(player: Player, now = Date.now()) {
  const lastSeenMillis = getTimestampMillis(player.lastSeenAt);

  return lastSeenMillis > 0 && now - lastSeenMillis <= ONLINE_WINDOW_MS;
}

export function getPlayerPresenceLabel(player: Player, now = Date.now()) {
  return isPlayerOnline(player, now) ? "Online" : "Away";
}
