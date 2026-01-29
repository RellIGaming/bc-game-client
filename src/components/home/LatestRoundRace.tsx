import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const bets = [
  { id: 1, game: "Super Burn #300", player: "IncogniteInd", time: "12:50", amount: "3.00000", currency: "BTC", multiplier: "0.00x", profit: "-0.30182", profitCurrency: "BTC", isWin: false },
  { id: 2, game: "Money Coming", player: "GamingPro9885", time: "12:50", amount: "0.1777", currency: "TRX", multiplier: "0.00x", profit: "-10.777", profitCurrency: "TRX", isWin: false },
  { id: 3, game: "Limbo", player: "Talken", time: "12:50", amount: "5.00171", currency: "USDT", multiplier: "0.00x", profit: "-3.14927385", profitCurrency: "USDT", isWin: false },
  { id: 4, game: "La Piratada", player: "ApprehendedVic", time: "12:50", amount: "2.00778", currency: "ETH", multiplier: "0.01x", profit: "-0.08227824", profitCurrency: "ETH", isWin: false },
  { id: 5, game: "Mine Right Royal", player: "RoamnoFofic", time: "12:50", amount: "0.26532", currency: "USDT", multiplier: "0.00x", profit: "-94.327", profitCurrency: "USDT", isWin: false },
  { id: 6, game: "Tower Legend", player: "Me0in", time: "12:50", amount: "40.43", currency: "USDT", multiplier: "0.00x", profit: "-82.727", profitCurrency: "USDT", isWin: false },
  { id: 7, game: "News Uphos", player: "PinkoPatent", time: "12:50", amount: "461.64", currency: "USDT", multiplier: "2.24x", profit: "+25.79", profitCurrency: "USDT", isWin: true },
  { id: 8, game: "Argentine Messi", player: "Bitcoin031", time: "12:50", amount: "993.93", currency: "USDT", multiplier: "2.08x", profit: "+25.001", profitCurrency: "USDT", isWin: true },
  { id: 9, game: "Fortune Time", player: "6hisao", time: "12:50", amount: "68.64", currency: "ETH", multiplier: "0.00x", profit: "-0.01438192", profitCurrency: "ETH", isWin: false },
];
const tabs = ["Latest Bet", "High Roller", "Wager Contest"];

const LatestRoundRace = () => {
  const [isMobile, setIsMobile] = useState(false);
 const [activeTab, setActiveTab] = useState("Latest Bet");

  const updateIsMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  useEffect(() => {
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, [updateIsMobile]);

  return (
    <section className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-lg font-bold text-foreground">Latest round & Race</h2>
        <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium b-radius transition-colors",
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
</div>
</div>
      {/* Table */}
      <div className="b-radius bg-card overflow-hidden">
        {/* Header Row */}
        {isMobile ? (
          <div className="grid grid-cols-4 gap-2 p-2 sm:p-3 bg-secondary/30 text-[10px] sm:text-xs font-medium text-muted-foreground">
            <span>Game</span>
            <span className="text-right">Player</span>
            <span className="text-right">Bet</span>
            <span className="text-right">Profit</span>
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-4 p-3 bg-secondary/30 text-xs font-medium text-muted-foreground">
            <span>Game</span>
            <span className="text-right">Player</span>
            <span className="text-right">Time</span>
            <span className="text-right">Bet Amount</span>
            <span className="text-right">Multiplier</span>
            <span className="text-right">Profit</span>
          </div>
        )}

        {/* Data Rows */}
        <div className="divide-y divide-border/30 max-h-[400px] overflow-y-auto custom-scrollbar">
          {bets.map((bet, index) => (
            isMobile ? (
              <div
                key={bet.id}
                className={cn(
                  "grid grid-cols-4 gap-2 p-2 text-[10px] hover:bg-secondary/30 transition-colors",
                  index % 2 === 0 ? "bg-secondary/20" : "bg-card"
                )}
              >
                <span className="text-foreground truncate">{bet.game}</span>
                <span className="text-right text-muted-foreground truncate">{bet.player}</span>
                <span className="text-right text-foreground truncate">
                  {bet.amount}
                </span>
                <span className={cn(
                  "text-right font-medium truncate",
                  bet.isWin ? "text-primary" : "text-destructive"
                )}>
                  {bet.profit}
                </span>
              </div>
            ) : (
              <div
                key={bet.id}
                className={cn(
                  "grid grid-cols-6 gap-4 p-3 text-xs hover:bg-secondary/30 transition-colors",
                  index % 2 === 0 ? "bg-secondary/20" : "bg-card"
                )}
              >
                <span className="text-foreground truncate">{bet.game}</span>
                <span className="text-right text-muted-foreground truncate">{bet.player}</span>
                <span className="text-right text-foreground truncate">{bet.time}</span>
                <span className="text-right text-foreground">
                  {bet.amount} <span className="text-muted-foreground">{bet.currency}</span>
                </span>
                <span className="text-right text-muted-foreground">{bet.multiplier}</span>
                <span className={cn(
                  "text-right font-medium",
                  bet.isWin ? "text-primary" : "text-destructive"
                )}>
                  {bet.profit} <span className="text-muted-foreground">{bet.profitCurrency}</span>
                </span>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestRoundRace;
