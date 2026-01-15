import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const categories = ["Soccer • Club Friendly Games", "Soccer • Club Friendly Games", "BC.GAME: Originals • Saloon Dice (10 rounds)"];

const matches = [
  {
    id: 1,
    category: "Soccer • Club Friendly Games",
    isLive: true,
    team1: { name: "MFK Chrudim", logo: "🏟️", score: 0 },
    team2: { name: "FC Hradec Kralove B", logo: "⚽", score: 0 },
    status: "1st half",
    odds: [
      { label: "1", value: "1.40" },
      { label: "draw", value: "4.2" },
      { label: "2", value: "5.0" },
    ],
    moreMarkets: "+5",
  },
  {
    id: 2,
    category: "Soccer • Club Friendly Games",
    isLive: true,
    team1: { name: "LASK Linz", logo: "🔴", score: 2 },
    team2: { name: "FC CSKA 1948", logo: "🔵", score: 1 },
    status: "2nd half",
    odds: [
      { label: "1", value: "1.17" },
      { label: "draw", value: "4.5" },
      { label: "2", value: "9.65" },
    ],
    moreMarkets: "+3",
  },
  {
    id: 3,
    category: "BC.GAME: Originals • Saloon Dice (10 rounds)",
    isLive: true,
    team1: { name: "Red Dice Coco", logo: "🎲", score: 0 },
    team2: { name: "Green Dice Coco", logo: "🎲", score: 0 },
    status: "1st round",
    odds: [
      { label: "1", value: "1.99" },
      { label: "draw", value: "9.80" },
      { label: "2", value: "1.99" },
    ],
    moreMarkets: "+1",
  },
];

const LiveSports = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -350 : 350,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Live Sports</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-primary hover:underline cursor-pointer">All</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => scroll("left")}
              className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "text-xs whitespace-nowrap px-3 py-1.5 rounded-full transition-colors flex items-center gap-2",
              activeCategory === cat
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {cat}
            <span className="text-primary text-xs">• Live</span>
          </button>
        ))}
      </div>

      {/* Matches */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
      >
        {matches.map((match) => (
          <div
            key={match.id}
            className="flex-shrink-0 w-[280px] lg:w-[320px] rounded-xl bg-card p-4 cursor-pointer gaming-card-hover"
          >
            {/* Match Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{match.team1.logo}</span>
                <div className="text-center">
                  <span className="text-xl font-bold text-foreground">
                    {match.team1.score} : {match.team2.score}
                  </span>
                  <p className="text-[10px] text-muted-foreground">{match.status}</p>
                </div>
                <span className="text-2xl">{match.team2.logo}</span>
              </div>
              {match.isLive && (
                <span className="flex items-center gap-1 text-[10px] text-red-500 font-medium">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  Live
                </span>
              )}
            </div>

            {/* Team Names */}
            <div className="flex justify-between text-xs text-muted-foreground mb-3">
              <span className="truncate max-w-[100px]">{match.team1.name}</span>
              <span className="truncate max-w-[100px]">{match.team2.name}</span>
            </div>

            {/* Odds */}
            <div className="flex gap-2">
              {match.odds.map((odd, idx) => (
                <button
                  key={idx}
                  className="flex-1 flex flex-col items-center py-2 px-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <span className="text-[10px] text-muted-foreground">{odd.label}</span>
                  <span className="text-sm font-bold text-primary">{odd.value}</span>
                </button>
              ))}
              <button className="flex items-center justify-center px-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <span className="text-xs text-muted-foreground">{match.moreMarkets}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LiveSports;
