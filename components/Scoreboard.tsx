import { getPlayerPresenceLabel, isPlayerOnline } from "@/lib/presence";
import type { Player } from "@/lib/types";

interface ScoreboardProps {
  currentPlayerId?: string;
  players: Player[];
}

function getPlayerName(player: Player) {
  return player.name || "Unnamed player";
}

function sortPlayersByScore(players: Player[]) {
  return [...players].sort((firstPlayer, secondPlayer) => {
    const scoreDifference = secondPlayer.score - firstPlayer.score;

    if (scoreDifference !== 0) {
      return scoreDifference;
    }

    return getPlayerName(firstPlayer).localeCompare(getPlayerName(secondPlayer));
  });
}

export function Scoreboard({ currentPlayerId = "", players }: ScoreboardProps) {
  const sortedPlayers = sortPlayersByScore(players);

  return (
    <div className="rounded-lg border border-[#d8e1eb] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-[#121a27]">Scoreboard</h2>
        <span className="rounded-md bg-[#eef2ff] px-3 py-1 text-sm font-bold text-[#3949a3]">
          {players.length} players
        </span>
      </div>

      <ol className="grid gap-3">
        {sortedPlayers.map((player, index) => {
          const isCurrentPlayer = player.playerId === currentPlayerId;
          const isOnline = isPlayerOnline(player);
          const presenceLabel = getPlayerPresenceLabel(player);

          return (
            <li
              className="flex min-h-14 items-center justify-between gap-3 rounded-md border border-[#e3e9f1] bg-[#fbfcfe] px-4 py-3"
              key={player.playerId}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#253247] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-bold text-[#17202f]">
                    {getPlayerName(player)}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {isCurrentPlayer ? (
                      <span className="text-xs font-bold uppercase text-[#1d6f6a]">
                        You
                      </span>
                    ) : null}
                    <span
                      className={`text-xs font-bold uppercase ${
                        isOnline ? "text-[#1d6f6a]" : "text-[#677386]"
                      }`}
                    >
                      {presenceLabel}
                    </span>
                  </div>
                </div>
              </div>

              <span className="shrink-0 rounded-md bg-[#fff1ef] px-3 py-1 text-sm font-bold text-[#a33e38]">
                {player.score}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
