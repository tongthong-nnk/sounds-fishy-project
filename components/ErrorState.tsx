import Link from "next/link";
import { OceanBackground } from "./theme/OceanBackground";

interface ErrorStateProps {
  title?: string;
  message: string;
}

export function ErrorState({
  title = "Something went wrong",
  message,
}: ErrorStateProps) {
  return (
    <OceanBackground>
      <div className="flex min-h-screen items-center justify-center px-5 text-[#10243d]">
      <div className="game-card w-full max-w-lg p-7">
        <p className="text-sm font-extrabold uppercase text-[#bf3446]">
          Room unavailable
        </p>
        <h1 className="font-display mt-3 text-3xl font-bold text-[#10243d]">
          {title}
        </h1>
        <p className="mt-4 font-semibold leading-7 text-[#173a56]">{message}</p>
        <Link
          className="game-button game-button-dark mt-6 inline-flex h-11 items-center justify-center px-5 font-extrabold focus:outline-none focus:ring-4 focus:ring-[#253247]/25"
          href="/"
        >
          Back to Home
        </Link>
      </div>
    </div>
    </OceanBackground>
  );
}
