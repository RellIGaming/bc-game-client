import { useState } from "react";
import { cn } from "@/lib/utils";
import card2 from "@/assets/images/card-2.png";
import card3 from "@/assets/images/card-3.png";
import card4 from "@/assets/images/card-4.png";
import card5 from "@/assets/images/card-5.png";
import card6 from "@/assets/images/card-6.png";
import card7 from "@/assets/images/card-7.png";
import card8 from "@/assets/images/card-8.png";
import card9 from "@/assets/images/card-9.png";
import card10 from "@/assets/images/card-10.png";
import card11 from "@/assets/images/card-11.png";

const mockWins = [
  { id: 1, game: "BugStep", user: "doghuan", amount: "104.13K", currency: "USDT", image: card2 },
  { id: 2, game: "MAXW...", user: "Baby.Dali", amount: "101.70K", currency: "USDT", image: card3 },
  { id: 3, game: "Mines24", user: "Alanstp.oa", amount: "203.45K", currency: "BCD", image: card4 },
  { id: 4, game: "MAXW...", user: "GooHoo09", amount: "208.77K", currency: "USDT", image: card5 },
  { id: 5, game: "doghj19", user: "MeltonV1", amount: "55.40", currency: "ETH", image: card6 },
  { id: 6, game: "Wursau", user: "MAXW...", amount: "246.58K", currency: "USDT", image: card7 },
  { id: 7, game: "MAXW...", user: "Bofela79", amount: "108.24K", currency: "BCD", image: card8 },
  { id: 8, game: "Hidden", user: "Dovelli...", amount: "108.43K", currency: "USDT", image: card9 },
  { id: 9, game: "Dahofoy91", user: "BallofvN", amount: "TRL 879.03K", currency: "", image: card10 },
  { id: 10, game: "BCDrake", user: "Gtghnom", amount: "97.35K", currency: "USDT", image: card11 },
  { id: 11, game: "Glidden", user: "Btphew", amount: "86.04K", currency: "USDT", image: card2 },
  { id: 12, game: "Crasher", user: "somero", amount: "TRL 77K", currency: "", image: card3 },
];

const categories = ["All", "Rellbet Originals", "Slots", "Live Casino"];

const RecentBigWins = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  // Duplicate wins for seamless loop
  const duplicatedWins = [...mockWins, ...mockWins, ...mockWins];

  return (
    <section className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <h2 className="text-sm font-bold text-foreground">Recent Big Wins</h2>
        </div>
        {/* <div className="flex items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-full transition-colors",
                activeCategory === cat
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div> */}
      </div>

      {/* Continuous Marquee */}
      <div className="overflow-hidden">
        <div className="flex gap-2 animate-marquee">
          {duplicatedWins.map((win, index) => (
            <div
              key={`${win.id}-${index}`}
              className="flex-shrink-0 w-16 lg:w-20 group cursor-pointer bg-card b-radius"
            >
              <div className="relative aspect-square b-radius overflow-hidden mb-1 gaming-card-hover">
                <img 
                  src={win.image} 
                  alt={win.game}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-2">
              <p className="text-[10px] text-muted-foreground truncate text-center">
                👤 {win.user}
              </p>
              <p className="text-[10px] font-medium text-primary text-center truncate">
                {win.amount} {win.currency}
              </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentBigWins;
