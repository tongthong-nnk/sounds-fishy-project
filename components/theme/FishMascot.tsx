import type { CSSProperties } from "react";

type FishVariant = "blue" | "coral" | "gold";

interface FishMascotProps {
  className?: string;
  label?: string;
  style?: CSSProperties;
  variant?: FishVariant;
}

const palettes: Record<
  FishVariant,
  {
    body: string;
    cheek: string;
    fin: string;
    shadow: string;
    stripe: string;
  }
> = {
  blue: {
    body: "#35b9e8",
    cheek: "#b9f1ff",
    fin: "#118ab2",
    shadow: "#0b6d91",
    stripe: "#e6fbff",
  },
  coral: {
    body: "#ff6b5f",
    cheek: "#ffd1c9",
    fin: "#df3f52",
    shadow: "#b72d3f",
    stripe: "#fff0dc",
  },
  gold: {
    body: "#ffc857",
    cheek: "#fff2b8",
    fin: "#f59f00",
    shadow: "#bf6f00",
    stripe: "#fff8d6",
  },
};

export function FishMascot({
  className = "",
  label,
  style,
  variant = "blue",
}: FishMascotProps) {
  const palette = palettes[variant];

  return (
    <svg
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={className}
      role={label ? "img" : undefined}
      style={style}
      viewBox="0 0 180 118"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M44 60C23 38 18 27 11 31c-9 5 2 25 16 32C12 71 3 89 12 94c8 5 19-10 32-29z"
        fill={palette.fin}
      />
      <path
        d="M51 61c0-28 25-48 61-48 34 0 58 18 58 47s-24 47-59 47c-35 0-60-19-60-46z"
        fill={palette.body}
      />
      <path
        d="M64 78c12 13 34 21 61 14 14-4 27-12 35-24-4 23-24 39-51 39-23 0-41-10-51-26z"
        fill={palette.shadow}
        opacity="0.22"
      />
      <path
        d="M88 26c9-9 23-16 38-16-9 9-11 18-9 28"
        fill={palette.fin}
      />
      <path
        d="M100 94c5 13 17 20 33 20-6-9-8-18-4-29"
        fill={palette.fin}
      />
      <path
        d="M73 43c17-9 43-12 67 2"
        fill="none"
        opacity="0.72"
        stroke={palette.stripe}
        strokeLinecap="round"
        strokeWidth="7"
      />
      <path
        d="M75 66c18 8 42 9 66-2"
        fill="none"
        opacity="0.5"
        stroke={palette.stripe}
        strokeLinecap="round"
        strokeWidth="7"
      />
      <circle cx="145" cy="50" fill="#10243d" r="7" />
      <circle cx="147" cy="47" fill="#ffffff" r="2.5" />
      <circle cx="151" cy="67" fill={palette.cheek} opacity="0.75" r="8" />
      <path
        d="M156 58c5 4 10 4 14 0"
        fill="none"
        stroke="#10243d"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}
