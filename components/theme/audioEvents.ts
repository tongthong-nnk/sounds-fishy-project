export type UiSoundKind = "click" | "guess" | "reveal" | "success" | "warning";

export const UI_SOUND_EVENT = "sounds-fishy-ui-sound";

export function playUiSound(kind: UiSoundKind = "click") {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<UiSoundKind>(UI_SOUND_EVENT, {
      detail: kind,
    }),
  );
}
