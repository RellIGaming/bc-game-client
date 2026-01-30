import { useBetSlipStore } from "@/store/betSlipStore";


export default function BetSlipModal() {
  const { bets, expanded, toggleExpanded, quickBet, toggleQuickBet } =
    useBetSlipStore();

  if (bets.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 w-[320px] bg-card border border-border rounded-xl shadow-xl overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center p-2 bg-secondary">
        <span className="text-sm font-semibold">Bet Slip ({bets.length})</span>
        <button onClick={toggleExpanded}>
          {expanded ? "⬇" : "⬆"}
        </button>
      </div>

      {expanded && (
        <div className="p-2 space-y-2">

          {/* Quick Bet Toggle */}
          <div className="flex items-center justify-between text-xs">
            <span>Quick Bet</span>
            <button onClick={toggleQuickBet}>
              {quickBet ? "ON" : "OFF"}
            </button>
          </div>

          {!quickBet && (
            <div className="space-y-2">
              {bets.map(b => (
                <div key={b.id} className="bg-secondary rounded p-2 text-xs">
                  {b.label} @ {b.value}
                </div>
              ))}
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-2 text-xs mt-2">
            <button className="px-2 py-1 bg-primary rounded">Single</button>
            <button className="px-2 py-1 bg-secondary rounded">Combo</button>
            <button className="px-2 py-1 bg-secondary rounded">System</button>
          </div>
        </div>
      )}
    </div>
  );
}
