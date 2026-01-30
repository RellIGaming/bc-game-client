import { useBetSlipStore } from "@/store/betSlipStore";


export default function MatchCard({ match }) {
  const addBet = useBetSlipStore(s => s.addBet);

  return (
    <div className="bg-card rounded-lg p-3 text-xs space-y-2">
      <div className="font-semibold">{match.team1} vs {match.team2}</div>

      <div className="grid grid-cols-3 gap-2">
        {match.odds.map((odd, i) => (
          <button
            key={i}
            onClick={() => addBet({ id: match.id + i, ...odd })}
            className="bg-secondary hover:bg-primary hover:text-white rounded px-2 py-1 transition"
          >
            {odd.label} {odd.value}
          </button>
        ))}
      </div>
    </div>
  );
}
