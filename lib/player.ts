const PLAYER_ID_KEY = "sounds-fishy-player-id";
const PLAYER_NAME_KEY = "sounds-fishy-player-name";

function canUseLocalStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export function createPlayerId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  const randomPart = Math.random().toString(36).slice(2, 12);
  return `player_${Date.now().toString(36)}_${randomPart}`;
}

export function getOrCreatePlayerId() {
  if (!canUseLocalStorage()) {
    return createPlayerId();
  }

  const savedPlayerId = window.localStorage.getItem(PLAYER_ID_KEY);

  if (savedPlayerId) {
    return savedPlayerId;
  }

  const playerId = createPlayerId();
  window.localStorage.setItem(PLAYER_ID_KEY, playerId);
  return playerId;
}

export function getSavedPlayerName() {
  if (!canUseLocalStorage()) {
    return "";
  }

  return window.localStorage.getItem(PLAYER_NAME_KEY) ?? "";
}

export function getSavedPlayerId() {
  if (!canUseLocalStorage()) {
    return "";
  }

  return window.localStorage.getItem(PLAYER_ID_KEY) ?? "";
}

export function savePlayerId(playerId: string) {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(PLAYER_ID_KEY, playerId);
}

export function savePlayerName(name: string) {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(PLAYER_NAME_KEY, name.trim());
}
