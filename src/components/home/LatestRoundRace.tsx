import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = ["Latest Bet", "High Roller", "Wager Contest"];

const bets = [
  { id: 1, game: "Super Burn #300", player: "IncogniteInd", amount: "3.00000", currency: "BTC", multiplier: "0.00x", profit: "-0.30182", profitCurrency: "BTC", isWin: false },
  { id: 2, game: "Money Coming", player: "GamingPro9885", amount: "0.1777", currency: "TRX", multiplier: "0.00x", profit: "-10.777", profitCurrency: "TRX", isWin: false },
  { id: 3, game: "Limbo", player: "Talken", amount: "5.00171", currency: "USDT", multiplier: "0.00x", profit: "-3.14927385", profitCurrency: "USDT", isWin: false },
  { id: 4, game: "La Piratada", player: "ApprehendedVic", amount: "2.00778", currency: "ETH", multiplier: "0.01x", profit: "-0.08227824", profitCurrency: "ETH", isWin: false },
  { id: 5, game: "Mine Right Royal", player: "RoamnoFofic", amount: "0.26532", currency: "USDT", multiplier: "0.00x", profit: "-94.327", profitCurrency: "USDT", isWin: false },
  { id: 6, game: "Tower Legend", player: "Me0in", amount: "40.43", currency: "USDT", multiplier: "0.00x", profit: "-82.727", profitCurrency: "USDT", isWin: false },
  { id: 7, game: "News Uphos", player: "PinkoPatent", amount: "461.64", currency: "USDT", multiplier: "2.24x", profit: "+25.79", profitCurrency: "USDT", isWin: true },
  { id: 8, game: "Argentine Messi", player: "Bitcoin031", amount: "993.93", currency: "USDT", multiplier: "2.08x", profit: "+25.001", profitCurrency: "USDT", isWin: true },
  { id: 9, game: "Argentine Messi", player: "Bitcoin031", amount: "993.93", currency: "USDT", multiplier: "0.00x", profit: "-988193.77", profitCurrency: "USDT", isWin: false },
  { id: 10, name: "Piggy Bank Shift", player: "ThreaterolS1", amount: "990.231", currency: "USDT", multiplier: "0.00x", profit: "-998293.93", profitCurrency: "USDT", isWin: false },
  { id: 11, game: "Fortune Time", player: "6hisao", amount: "68.64", currency: "ETH", multiplier: "0.00x", profit: "-0.01438192", profitCurrency: "ETH", isWin: false },
];

const LatestRoundRace = () => {
  const [activeTab, setActiveTab] = useState("Latest Bet");

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-lg font-bold text-foreground">Latest round & Race</h2>
        <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
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
      <div className="rounded-xl bg-card overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-5 gap-4 p-3 bg-secondary/30 text-xs font-medium text-muted-foreground">
          <span>Game</span>
          <span>Player</span>
          <span className="text-right">Bet Amount</span>
          <span className="text-right">Multiplier</span>
          <span className="text-right">Profit</span>
        </div>

        {/* Data Rows */}
        <div className="divide-y divide-border/30 max-h-[400px] overflow-y-auto custom-scrollbar">
          {bets.map((bet) => (
            <div
              key={bet.id}
              className="grid grid-cols-5 gap-4 p-3 text-xs hover:bg-secondary/20 transition-colors"
            >
              <span className="text-foreground truncate">{bet.game}</span>
              <span className="text-muted-foreground truncate">{bet.player}</span>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestRoundRace;
