"use client";

import Link from "next/link";
import { Scoreboard } from "./Scoreboard";
import { OceanBackground } from "./theme/OceanBackground";
import type { Player, Room } from "@/lib/types";

interface ArchivedRoomProps {
  currentPlayerId: string;
  players: Player[];
  room: Room;
}

export function ArchivedRoom({
  currentPlayerId,
  players,
  room,
}: ArchivedRoomProps) {
  return (
    <OceanBackground>
      <main className="min-h-screen px-5 py-7 text-[#10243d] sm:px-8 lg:px-10">
      <section className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_340px]">
        <div className="game-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-extrabold uppercase text-[#bf3446]">
                Room ended
              </p>
              <p className="mt-1 font-mono text-xs font-semibold text-[#677386]">
                Room {room.roomCode}
              </p>
            </div>
            <Link
              className="game-button game-button-soft inline-flex h-10 items-center px-4 text-sm font-extrabold focus:outline-none focus:ring-4 focus:ring-[#253247]/15"
              href="/"
            >
              Back to Home
            </Link>
          </div>

          <h1 className="font-display mt-5 text-3xl font-bold leading-tight text-[#10243d] sm:text-4xl">
            This room has been ended by the host.
          </h1>
          <p className="mt-4 max-w-2xl font-semibold leading-7 text-[#173a56]">
            The final scores are preserved below. Create a new room when your
            group wants to play again.
          </p>

          {room.question ? (
            <div className="game-card-soft mt-6 p-5">
              <p className="text-sm font-semibold uppercase text-[#677386]">
                Last question
              </p>
              <p className="mt-2 text-xl font-bold text-[#121a27]">
                {room.question}
              </p>
              {room.correctAnswer ? (
                <p className="mt-3 text-sm font-semibold text-[#465365]">
                  Answer: {room.correctAnswer}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        <Scoreboard currentPlayerId={currentPlayerId} players={players} />
      </section>
    </main>
    </OceanBackground>
  );
}
