import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import GameCard from "./GameCard";
import { originalGames } from "@/lib/game";
import icon from "../../assets/images/logo.png"

interface Game {
  _id: string; 
  name: string;
  image: string;
  multiplier?: string | null;
  players?: number;
  provider?: string;
}


interface GameCarouselProps {
  title: string;
  games: Game[];
  // icon:string;
  categoryPath?: string;
  labelText?: string;
  showLabel?: boolean;
  desktopCount?: number;
  tabletCount?: number;
  mobileCount?: number;
}

const GameCarousel = ({ 
  title, 
  games, 

  categoryPath, 
  labelText = "ORIGINAL GAME",
  showLabel = true,
  desktopCount = 8,
  tabletCount = 6,
  mobileCount = 3
}: GameCarouselProps) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(desktopCount);

  const updateVisibleCount = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) {
      setVisibleCount(mobileCount);
    } else if (width < 1024) {
      setVisibleCount(tabletCount);
    } else {
      setVisibleCount(desktopCount);
    }
  }, [desktopCount, tabletCount, mobileCount]);

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [updateVisibleCount]);

  const maxIndex = Math.max(0, games.length - visibleCount);

  const next = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const visibleGames = games.slice(currentIndex, currentIndex + visibleCount);

  // Fill remaining slots if we loop
  const displayGames = visibleGames.length < visibleCount 
    ? [...visibleGames, ...games.slice(0, visibleCount - visibleGames.length)]
    : visibleGames;

  return (
    <section className="space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center justify-between"><img src={icon} alt={title} className="w-4 h-4 mr-4" /><h2 className="text-base sm:text-lg font-bold text-foreground">{title}</h2></div>
        <div className="flex items-center gap-1">
          {categoryPath && (
            <button
              onClick={() => navigate(categoryPath)}
              className="text-muted-foreground text-xs px-2 sm:px-1.5 py-1 sm:py-1.5 b-radius bg-secondary hover:bg-secondary/80 transition-colors"
            >
              All
            </button>
          )}
          <div className="flex items-center gap-1">
            <button
              onClick={prev}
              className=" p-1 sm:p-1.5 b-radius bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <ChevronLeft className="w-4 h-4  text-muted-foreground" />
            </button>
            <button
              onClick={next}
              className="p-1 sm:p-1.5 b-radius bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <ChevronRight className="w-4 h-4  text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div 
        className="grid gap-1.5 sm:gap-2 lg:gap-3"
        style={{
          gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))`
        }}
      >
        {displayGames.map((game, idx) => (
          <GameCard  
         key={`${game._id}-${idx}`}
            // key={`${game.id}-${idx}`} 
           game={game} 
            showLabel={showLabel}
            labelText={labelText}
          />
        ))}
      </div>
    </section>
  );
};

export default GameCarousel;
