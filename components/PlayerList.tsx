import { getPlayerPresenceLabel, isPlayerOnline } from "@/lib/presence";
import type { Player } from "@/lib/types";

interface PlayerListProps {
  currentPlayerId: string;
  hostId: string;
  players: Player[];
}

export function PlayerList({
  currentPlayerId,
  hostId,
  players,
}: PlayerListProps) {
  return (
    <div className="rounded-lg border border-[#d8e1eb] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-[#121a27]">Players</h2>
        <span className="rounded-md bg-[#eef2ff] px-3 py-1 text-sm font-bold text-[#3949a3]">
          {players.length}/10
        </span>
      </div>

      <ul className="grid gap-3">
        {players.map((player) => {
          const isHost = player.isHost || player.playerId === hostId;
          const isCurrentPlayer = player.playerId === currentPlayerId;
          const isOnline = isPlayerOnline(player);
          const presenceLabel = getPlayerPresenceLabel(player);

          return (
            <li
              className="flex min-h-14 items-center justify-between gap-3 rounded-md border border-[#e3e9f1] bg-[#fbfcfe] px-4 py-3"
              key={player.playerId}
            >
              <div className="min-w-0">
                <p className="truncate font-bold text-[#17202f]">
                  {player.name || "Unnamed player"}
                </p>
                <p className="mt-1 font-mono text-xs text-[#677386]">
                  {player.playerId.slice(0, 8)}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap justify-end gap-2">
                {isCurrentPlayer ? (
                  <span className="rounded-md bg-[#edf7f6] px-2 py-1 text-xs font-bold text-[#1d6f6a]">
                    You
                  </span>
                ) : null}
                <span
                  className={`rounded-md px-2 py-1 text-xs font-bold ${
                    isOnline
                      ? "bg-[#edf7f6] text-[#1d6f6a]"
                      : "bg-[#f1f4f8] text-[#677386]"
                  }`}
                >
                  {presenceLabel}
                </span>
                {isHost ? (
                  <span className="rounded-md bg-[#fff1ef] px-2 py-1 text-xs font-bold text-[#a33e38]">
                    Host
                  </span>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
