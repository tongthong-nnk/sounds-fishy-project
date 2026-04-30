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
    <div className="game-card p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-bold text-[#10243d]">
          Scoreboard
        </h2>
        <span className="status-pill bg-[#eefbff] px-3 py-1 text-sm text-[#0a6f98]">
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
              className="game-card-soft flex min-h-14 items-center justify-between gap-3 px-4 py-3"
              key={player.playerId}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ffc857] text-sm font-extrabold text-[#4c2b00]">
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

              <span className="shrink-0 rounded-full bg-[#fff1ef] px-3 py-1 text-sm font-extrabold text-[#bf3446]">
                {player.score}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
