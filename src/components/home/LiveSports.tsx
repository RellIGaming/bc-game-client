import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import costume1 from "../../assets/images/costume-1.png";
import costume2 from "../../assets/images/costume-2.png";
import costume3 from "../../assets/images/costume-3.png";
import costume4 from "../../assets/images/costume-4.png";
import costume5 from "../../assets/images/costume-5.png";
import costume6 from "../../assets/images/costume-6.png";

const matches = [
  {
    id: 1,
    category: "Soccer • A-League",
    isLive: true,
    team1: { name: "MFK Chrudim", logo: costume1, score: 0 },
    team2: { name: "FC Hradec B", logo: costume2, score: 0 },
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
  const [visibleCount, setVisibleCount] = useState(3);

  const updateVisibleCount = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) {
      setVisibleCount(1);
    } else if (width < 1024) {
      setVisibleCount(2);
    } else {
      setVisibleCount(3);
    }
  }, []);

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [updateVisibleCount]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.children[0] as HTMLElement;
    if (!card) return;
    const cardWidth = card.getBoundingClientRect().width + 12; // gap included
    container.scrollBy({
      left: direction === "left" ? -cardWidth * visibleCount : cardWidth * visibleCount,
      behavior: "smooth",
    });
  };

  return (
    <section className="space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-foreground">Live Sports</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-primary hover:underline cursor-pointer">All</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => scroll("left")}
              className="p-1 sm:p-1.5 b-radius bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-1 sm:p-1.5 b-radius bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards Container */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
      >
        {matches.map((match) => (
          <div
            key={match.id}
            className="flex-shrink-0 snap-start b-radius bg-card p-3 sm:p-4 cursor-pointer gaming-card-hover"
            style={{ 
              width: visibleCount === 1 ? 'calc(100% - 8px)' : visibleCount === 2 ? 'calc(50% - 8px)' : 'calc(33.333% - 8px)',
              minWidth: visibleCount === 1 ? '280px' : visibleCount === 2 ? '280px' : '300px'
            }}
          >
            <div className="flex flex-row justify-between mb-2">
              <div className="text-[11px] sm:text-[14px] font-bold line-clamp-1">
                {match.category}
              </div>
              {match.isLive && (
                <span className="flex items-center gap-1 text-[10px] sm:text-[12px] text-green-500 font-medium flex-shrink-0">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Live
                </span>
              )}
            </div>
            
            {/* Match Header */}
            <div className="flex mb-3">
              <div className="flex flex-row justify-between items-center gap-2 w-full">
                <div className="flex flex-col items-center justify-center flex-1 py-2 sm:py-4">
                  <img src={match.team1.logo} alt="logo" className="w-10 h-10 sm:w-16 sm:h-16 mb-1 sm:mb-2" />
                  <p className="text-[10px] sm:text-[12px] text-center line-clamp-1">{match.team1.name}</p>
                </div>

                <div className="text-center flex flex-col py-4 sm:py-8 w-[40px] sm:w-[50px]">
                  <span className="text-center flex flex-row items-center justify-center text-lg sm:text-xl font-bold text-foreground">
                    <span>{match.team1.score}</span> : <span>{match.team2.score}</span>
                  </span>
                  <p className="text-[8px] sm:text-[10px] text-muted-foreground mt-1 sm:mt-2">{match.status}</p>
                </div>
                
                <div className="flex flex-col items-center justify-center flex-1 py-2 sm:py-4">
                  <img src={match.team2.logo} alt="logo" className="w-10 h-10 sm:w-16 sm:h-16 mb-1 sm:mb-2 mx-auto" />
                  <p className="text-[10px] sm:text-[12px] text-center line-clamp-1">{match.team2.name}</p>
                </div>
              </div>
            </div>
            
            {/* Odds */}
            <div className="flex gap-1.5 sm:gap-2">
              {match.odds.map((odd, idx) => (
                <button
                  key={idx}
                  className="flex-1 flex flex-col items-center py-1.5 sm:py-2 px-1 sm:px-2 b-radius bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <span className="text-[8px] sm:text-[10px] text-muted-foreground">{odd.label}</span>
                  <span className="text-xs sm:text-sm font-bold text-primary">{odd.value}</span>
                </button>
              ))}
              <button className="flex items-center justify-center px-2 sm:px-3 b-radius bg-secondary hover:bg-secondary/80 transition-colors">
                <span className="text-[10px] sm:text-xs text-muted-foreground">{match.moreMarkets}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LiveSports;
