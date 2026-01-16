import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import costume1 from "../../assets/images/costume-1.png";
import costume2 from "../../assets/images/costume-2.png";
import costume3 from "../../assets/images/costume-3.png";
import costume4 from "../../assets/images/costume-4.png";
import costume5 from "../../assets/images/costume-5.png";
import costume6 from "../../assets/images/costume-6.png";

const categories = ["Soccer • Club Friendly Games", "Soccer • Club Friendly Games", "BC.GAME: Originals • Saloon Dice (10 rounds)"];

const matches = [
  {
    id: 1,
    category: "Soccer • A-League",
    isLive: true,
    team1: { name: "MFK Chrudim", logo: costume1, score: 0 },
    team2: { name: "FC Hradec Kralove B", logo: costume2, score: 0 },
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
    team1: { name: "LASK Linz", logo: costume3, score: 2 },
    team2: { name: "FC CSKA 1948", logo: costume4, score: 1 },
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
    category: "eSoccer Copa del Rey (2x6 min)",
    isLive: true,
    team1: { name: "Red Dice Coco", logo: costume5, score: 0 },
    team2: { name: "Green Dice Coco", logo: costume6, score: 0 },
    status: "1st round",
    odds: [
      { label: "1", value: "1.99" },
      { label: "draw", value: "9.80" },
      { label: "2", value: "1.99" },
    ],
    moreMarkets: "+1",
  },
  {
    id: 4,
    category: "eSoccer Copa del Rey (2x6 min)",
    isLive: true,
    team1: { name: "Red Dice Coco", logo: costume3, score: 0 },
    team2: { name: "Green Dice Coco", logo: costume4, score: 0 },
    status: "1st round",
    odds: [
      { label: "1", value: "1.99" },
      { label: "draw", value: "9.80" },
      { label: "2", value: "1.99" },
    ],
    moreMarkets: "+1",
  },
  {
    id: 5,
    category: "eSoccer Copa del Rey (2x6 min)",
    isLive: true,
    team1: { name: "Red Dice Coco", logo: costume1, score: 0 },
    team2: { name: "Green Dice Coco", logo: costume2, score: 0 },
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
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
      >
        {matches.map((match) => (
          <div
            key={match.id}
            className="flex-shrink-0 w-[280px] lg:w-[320px] rounded-xl bg-card p-4 cursor-pointer gaming-card-hover"
          >
            <div className="flex flex-row justify-between">
              <div className="text-[14px] font-bold">
                {match.category}
              </div>
              {match.isLive && (
                <span className="flex items-center gap-1 text-[12px] text-green-500 font-medium">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Live
                </span>
              )}
            </div>
            {/* Match Header */}
            <div className="flex mb-3">
              <div className="flex flex-row justify-between item-center gap-2">
                <div className="flex flex-col w-[130px] py-4">
                  <img src={match.team1.logo} alt="logo" className="w-16 h-16" />
                  <p className="text-[12px]">{match.team1.name}</p>
                </div>

                <div className="text-center flex flex-col py-8">
                  <span className="text-center flex flex-row item-center justify-center text-xl font-bold text-foreground">
                    <span>{match.team1.score}</span> : <span>{match.team2.score}</span>
                  </span>
                  <p className="text-[10px] text-muted-foreground">{match.status}</p>
                </div>
                   <div className="flex flex-col item-center justify-center w-[130px] py-4">
                  <img src={match.team2.logo} alt="logo" className="w-16 h-16 ml-4" />
                  <p className="text-[12px]">{match.team2.name}</p>
                </div>
              </div>

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
