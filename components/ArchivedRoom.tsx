"use client";

import Link from "next/link";
import { Scoreboard } from "./Scoreboard";
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
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-7 text-[#17202f] sm:px-8 lg:px-10">
      <section className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_340px]">
        <div className="rounded-lg border border-[#d8e1eb] bg-white p-6 shadow-[0_20px_70px_rgba(23,32,47,0.10)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase text-[#a33e38]">
                Room ended
              </p>
              <p className="mt-1 font-mono text-xs font-semibold text-[#677386]">
                Room {room.roomCode}
              </p>
            </div>
            <Link
              className="inline-flex h-10 items-center rounded-md border border-[#d8e1eb] bg-[#fbfcfe] px-4 text-sm font-bold text-[#253247] transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#253247]/15"
              href="/"
            >
              Back to Home
            </Link>
          </div>

          <h1 className="mt-5 text-3xl font-bold leading-tight text-[#121a27] sm:text-4xl">
            This room has been ended by the host.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-[#465365]">
            The final scores are preserved below. Create a new room when your
            group wants to play again.
          </p>

          {room.question ? (
            <div className="mt-6 rounded-lg border border-[#e3e9f1] bg-[#fbfcfe] p-5">
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
  );
}
