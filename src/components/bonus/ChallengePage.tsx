import { useState } from "react";
import { cn } from "@/lib/utils";
import { Info, AlertTriangle } from "lucide-react";
const tabs = ["Active", "Finished", "My Completed", "Coming Soon"];
const challenges = [
  { game: "Tim&Larry", completed: "3/50", prize: "₹45,358.18", reward: "₹45,358.18", image: "🎰", target: 50, current: 3 },
  { game: "Tim&Larry", completed: "20/50", prize: "₹45,358.18", reward: "₹45,358.18", image: "🎰", target: 50, current: 20 },
  { game: "Tim&Larry", completed: "27/50", prize: "₹45,358.18", reward: "₹45,358.18", image: "🎰", target: 50, current: 27 },
  { game: "Tim&Larry", completed: "38/50", prize: "₹45,358.18", reward: "₹45,358.18", image: "🎰", target: 50, current: 38 },
  { game: "Tim&Larry", completed: "39/50", prize: "₹45,358.18", reward: "₹45,358.18", image: "🎰", target: 50, current: 39 },
  { game: "WUKONG", completed: "10/50", prize: "₹19,071.63", reward: "₹19,071.63", image: "🐒", target: 50, current: 10 },
];
const ChallengePage = () => {
  const [activeTab, setActiveTab] = useState("Finished");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Challenge</h1>
          <button className="text-primary text-sm">Rules</button>
        </div>
        {/* Warning */}
        <div className="flex items-center gap-2 bg-card rounded-lg p-3 text-sm">
          <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0" />
          <span className="text-muted-foreground">
            Diamond level or above required! Your current VIP Level: <span className="text-foreground">None</span>
          </span>
          <span className="ml-auto text-red-500 text-xs font-medium">✕ Not Eligible</span>
        </div>
        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                activeTab === tab ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Challenge Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {challenges.map((c, i) => (
            <div key={i} className="bg-card rounded-lg overflow-hidden">
              {/* Image placeholder */}
              <div className="h-40 bg-gradient-to-br from-secondary to-card flex items-center justify-center text-6xl">
                {c.image}
              </div>
              {/* Progress */}
              <div className="px-3 pt-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>{c.completed} Completed</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(c.current / c.target) * 100}%` }}
                  />
                </div>
              </div>
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-primary text-sm font-bold">🟣 {c.prize}</p>
                    <p className="text-xs text-muted-foreground">Reward: <span className="text-foreground">₹{c.reward}</span></p>
                  </div>
                </div>
                <p className="text-sm font-medium">{c.game}</p>
                <div className="flex gap-2">
                  <div className="flex-1 bg-secondary rounded px-2 py-1 text-center">
                    <p className="text-[10px] text-muted-foreground">Target</p>
                    <p className="text-xs font-medium">{c.target}</p>
                  </div>
                  <div className="flex-1 bg-secondary rounded px-2 py-1 text-center">
                    <p className="text-[10px] text-muted-foreground">Min Bet</p>
                    <p className="text-xs font-medium">-</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  ⏱ Challenge Ended
                </p>
              </div>
            </div>
          ))}
        </div>
        {activeTab === "Coming Soon" && (
          <div className="bg-card rounded-lg p-12 text-center">
            <div className="text-5xl mb-4">🏆</div>
            <p className="text-muted-foreground">New challenges coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ChallengePage;