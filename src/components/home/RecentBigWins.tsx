import { useState } from "react";
import { cn } from "@/lib/utils";

const mockWins = [
  { id: 1, game: "CRASH", user: "doghuan", amount: "100.12K", currency: "USDT", color: "bg-red-500", icon: "🚀" },
  { id: 2, game: "LIMBO", user: "MAXW...", amount: "95.72K", currency: "USDT", color: "bg-blue-500", icon: "🎯" },
  { id: 3, game: "TWIST", user: "fares92", amount: "1,847.63K", currency: "USDT", color: "bg-purple-500", icon: "🌀" },
  { id: 4, game: "DICE", user: "Bigteki...", amount: "344.12K", currency: "USDT", color: "bg-green-500", icon: "🎲" },
  { id: 5, game: "PLINKO", user: "WalkE...", amount: "323.82K", currency: "USDT", color: "bg-emerald-500", icon: "⚪" },
  { id: 6, game: "MINES", user: "MAXW...", amount: "312.16K", currency: "USDT", color: "bg-yellow-500", icon: "💣" },
  { id: 7, game: "DUCK", user: "Babi Dali", amount: "277.64K", currency: "USDT", color: "bg-orange-500", icon: "🦆" },
  { id: 8, game: "ROULETTE", user: "Alanzt...", amount: "269.41K", currency: "BCD", color: "bg-red-600", icon: "🎡" },
  { id: 9, game: "HUNTER", user: "MAXW...", amount: "242.63K", currency: "USDT", color: "bg-indigo-500", icon: "🎯" },
  { id: 10, game: "POKER", user: "somaro", amount: "204.26K", currency: "USDT", color: "bg-pink-500", icon: "🃏" },
];

const categories = ["All", "BC Originals", "Slots", "Live Casino"];

const RecentBigWins = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  // Duplicate wins for seamless loop
  const duplicatedWins = [...mockWins, ...mockWins];

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <h2 className="text-lg font-bold text-foreground">Recent Big Wins</h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "text-sm font-medium px-3 py-1 rounded-full transition-colors",
                  activeCategory === cat
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Continuous Marquee */}
      <div className="overflow-hidden">
        <div className="flex gap-3 animate-marquee">
          {duplicatedWins.map((win, index) => (
            <div
              key={`${win.id}-${index}`}
              className="flex-shrink-0 w-20 group cursor-pointer"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden mb-2 gaming-card-hover">
                <div className={`absolute inset-0 ${win.color}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">{win.icon}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground truncate text-center">
                👤 {win.user}
              </p>
              <p className="text-xs font-medium text-primary text-center truncate">
                {win.amount} {win.currency}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentBigWins;
