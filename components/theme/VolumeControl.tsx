"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { UI_SOUND_EVENT, type UiSoundKind } from "./audioEvents";

const MUTED_STORAGE_KEY = "sounds-fishy-audio-muted";
const VOLUME_STORAGE_KEY = "sounds-fishy-audio-volume";
const DEFAULT_VOLUME = 0.28;
const EFFECT_VOLUME = 0.18;
const STEP_MS = 330;

type AudioContextConstructor = typeof AudioContext;

interface WebAudioWindow extends Window {
  webkitAudioContext?: AudioContextConstructor;
}

const melody = [
  392,
  523.25,
  659.25,
  587.33,
  523.25,
  659.25,
  783.99,
  659.25,
  440,
  554.37,
  659.25,
  739.99,
  659.25,
  554.37,
  523.25,
  440,
];

const uiSoundPatterns: Record<UiSoundKind, number[]> = {
  click: [620],
  guess: [392, 523.25],
  reveal: [523.25, 659.25, 783.99],
  success: [659.25, 783.99, 1046.5],
  warning: [220, 196],
};

function getAudioContextConstructor() {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    window.AudioContext ||
    (window as WebAudioWindow).webkitAudioContext ||
    null
  );
}

function clampVolume(value: number) {
  return Math.min(1, Math.max(0, value));
}

function playTone(
  context: AudioContext,
  destination: AudioNode,
  frequency: number,
  delay: number,
  duration: number,
  gainValue: number,
  type: OscillatorType = "triangle",
) {
  const oscillator = context.createOscillator();
  const noteGain = context.createGain();
  const startAt = context.currentTime + delay;
  const endAt = startAt + duration;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startAt);
  noteGain.gain.setValueAtTime(0, startAt);
  noteGain.gain.linearRampToValueAtTime(gainValue, startAt + 0.025);
  noteGain.gain.linearRampToValueAtTime(0, endAt);

  oscillator.connect(noteGain);
  noteGain.connect(destination);
  oscillator.start(startAt);
  oscillator.stop(endAt + 0.04);
}

export function VolumeControl() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const effectsGainRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);
  const musicGainRef = useRef<GainNode | null>(null);
  const mutedRef = useRef(false);
  const stepRef = useRef(0);
  const volumeRef = useRef(DEFAULT_VOLUME);
  const [audioError, setAudioError] = useState("");
  const [hasLoadedPreferences, setHasLoadedPreferences] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const savedMuted = window.localStorage.getItem(MUTED_STORAGE_KEY);
      const savedVolume = window.localStorage.getItem(VOLUME_STORAGE_KEY);

      if (savedMuted === "true") {
        mutedRef.current = true;
        setMuted(true);
      } else {
        mutedRef.current = false;
        setMuted(false);
      }

      if (savedVolume) {
        const parsedVolume = Number.parseFloat(savedVolume);

        if (Number.isFinite(parsedVolume)) {
          const nextVolume = clampVolume(parsedVolume);
          volumeRef.current = nextVolume;
          setVolume(nextVolume);
        }
      }

      setHasLoadedPreferences(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!hasLoadedPreferences) {
      return;
    }

    mutedRef.current = muted;
    volumeRef.current = volume;
    window.localStorage.setItem(MUTED_STORAGE_KEY, String(muted));
    window.localStorage.setItem(VOLUME_STORAGE_KEY, String(volume));

    if (musicGainRef.current) {
      musicGainRef.current.gain.value = muted ? 0 : volume;
    }
  }, [hasLoadedPreferences, muted, volume]);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }

      void audioContextRef.current?.close();
    };
  }, []);

  const playStep = useCallback(() => {
    const context = audioContextRef.current;
    const musicGain = musicGainRef.current;

    if (!context || !musicGain || mutedRef.current) {
      return;
    }

    const step = stepRef.current;
    const note = melody[step % melody.length];

    playTone(context, musicGain, note, 0, 0.18, 0.24, "triangle");

    if (step % 4 === 0) {
      playTone(context, musicGain, note / 2, 0, 0.28, 0.09, "sine");
    }

    if (step % 8 === 6) {
      playTone(context, musicGain, note * 1.5, 0.05, 0.1, 0.08, "sine");
    }

    stepRef.current += 1;
  }, []);

  const ensureAudioContext = useCallback(async (showError: boolean) => {
    const AudioContextClass = getAudioContextConstructor();

    if (!AudioContextClass) {
      if (showError) {
        setAudioError("Music is not supported in this browser.");
      }

      return false;
    }

    if (!audioContextRef.current) {
      const context = new AudioContextClass();
      const musicGain = context.createGain();
      const effectsGain = context.createGain();

      musicGain.gain.value = mutedRef.current ? 0 : volumeRef.current;
      effectsGain.gain.value = EFFECT_VOLUME;
      musicGain.connect(context.destination);
      effectsGain.connect(context.destination);
      audioContextRef.current = context;
      musicGainRef.current = musicGain;
      effectsGainRef.current = effectsGain;
    }

    try {
      await audioContextRef.current.resume();
    } catch {
      if (showError) {
        setAudioError("Click again if the browser blocked audio startup.");
      }

      return false;
    }

    if (showError) {
      setAudioError("");
    }

    return true;
  }, []);

  const startAudio = useCallback(async () => {
    const didStart = await ensureAudioContext(true);

    if (!didStart) {
      return false;
    }

    if (intervalRef.current === null) {
      playStep();
      intervalRef.current = window.setInterval(playStep, STEP_MS);
    }

    setIsPlaying(true);
    setAudioError("");
    return true;
  }, [ensureAudioContext, playStep]);

  function stopAudio() {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    void audioContextRef.current?.suspend();
    setIsPlaying(false);
  }

  async function toggleMusic() {
    if (muted) {
      mutedRef.current = false;
      setMuted(false);
      void startAudio();
      return;
    }

    if (!isPlaying) {
      void startAudio();
      return;
    }

    mutedRef.current = true;
    setMuted(true);
    stopAudio();
  }

  function handleVolumeChange(value: string) {
    const nextVolume = clampVolume(Number.parseFloat(value));
    volumeRef.current = nextVolume;
    setVolume(nextVolume);
  }

  const playUiEffect = useCallback(
    async (kind: UiSoundKind) => {
      const didStart = await ensureAudioContext(false);
      const context = audioContextRef.current;
      const effectsGain = effectsGainRef.current;

      if (!didStart || !context || !effectsGain) {
        return;
      }

      const pattern = uiSoundPatterns[kind] ?? uiSoundPatterns.click;
      pattern.forEach((frequency, index) => {
        playTone(
          context,
          effectsGain,
          frequency,
          index * 0.055,
          kind === "warning" ? 0.12 : 0.075,
          kind === "warning" ? 0.14 : 0.12,
          kind === "warning" ? "sawtooth" : "triangle",
        );
      });
    },
    [ensureAudioContext],
  );

  useEffect(() => {
    if (!hasLoadedPreferences || muted || isPlaying) {
      return;
    }

    function handleFirstInteraction() {
      void startAudio();
    }

    window.addEventListener("pointerdown", handleFirstInteraction, {
      capture: true,
      once: true,
    });
    window.addEventListener("keydown", handleFirstInteraction, {
      capture: true,
      once: true,
    });

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction, {
        capture: true,
      });
      window.removeEventListener("keydown", handleFirstInteraction, {
        capture: true,
      });
    };
  }, [hasLoadedPreferences, isPlaying, muted, startAudio]);

  useEffect(() => {
    function handleUiSound(event: Event) {
      const soundEvent = event as CustomEvent<UiSoundKind>;
      void playUiEffect(soundEvent.detail ?? "click");
    }

    window.addEventListener(UI_SOUND_EVENT, handleUiSound);
    return () => window.removeEventListener(UI_SOUND_EVENT, handleUiSound);
  }, [playUiEffect]);

  const buttonLabel = muted ? "Music Off" : "Music On";
  const buttonTitle = muted
    ? "Turn music on"
    : isPlaying
      ? "Mute music"
      : "Start music";

  return (
    <div className="volume-control" role="group" aria-label="Background music">
      <div className="volume-heading" aria-hidden="true">
        <span>Music</span>
        <span className={muted ? "volume-chip" : "volume-chip volume-chip-on"}>
          {muted ? "Off" : "On"}
        </span>
      </div>
      <button
        aria-label={
          muted || !isPlaying
            ? "Turn background music on"
            : "Mute background music"
        }
        className="volume-button"
        onClick={() => {
          void toggleMusic();
        }}
        title={buttonTitle}
        type="button"
      >
        <span className="volume-button-light" aria-hidden="true" />
        {buttonLabel}
      </button>
      <div className="volume-row">
        <label className="volume-row-label" htmlFor="music-volume">
          Volume
        </label>
        <input
          aria-label="Background music volume"
          className="volume-slider"
          disabled={muted}
          id="music-volume"
          max="1"
          min="0"
          onChange={(event) => handleVolumeChange(event.target.value)}
          step="0.05"
          title="Music volume"
          type="range"
          value={volume}
        />
      </div>
      {audioError ? (
        <p className="volume-error" role="status">
          {audioError}
        </p>
      ) : null}
    </div>
  );
}
