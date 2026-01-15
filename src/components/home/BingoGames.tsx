import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import card2 from "@/assets/images/card-2.png";
import card3 from "@/assets/images/card-3.png";
import card4 from "@/assets/images/card-4.png";
import card5 from "@/assets/images/card-5.png";
import card6 from "@/assets/images/card-6.png";
import card7 from "@/assets/images/card-7.png";
import card8 from "@/assets/images/card-8.png";

const games = [
  { id: 1, name: "JACKPOT BINGO", provider: "JILI", image: card2 },
  { id: 2, name: "BINGO 7", provider: null, players: 10, image: card3 },
  { id: 3, name: "SUPER BINGO", provider: null, image: card4 },
  { id: 4, name: "LUCKY BINGO", provider: "JILI", players: 43, image: card5 },
  { id: 5, name: "BINGO CARNAVAL", provider: null, image: card6 },
  { id: 6, name: "FORTUNE BINGO", provider: null, image: card7 },
  { id: 7, name: "WEST HUNTER BINGO", provider: null, players: 76, image: card8 },
];

const BingoGames = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">All Bingo Games</h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate("/category/bingo")}
            className="text-sm text-primary hover:underline"
          >
            All
          </button>
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

      {/* Games */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
      >
        {games.map((game) => (
          <div
            key={game.id}
            className="flex-shrink-0 w-32 lg:w-40 rounded-xl overflow-hidden cursor-pointer group gaming-card-hover relative"
          >
            <div className="aspect-[3/4] relative">
              <img 
                src={game.image} 
                alt={game.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Provider Badge */}
              {game.provider && (
                <div className="absolute top-2 left-2 bg-card/80 backdrop-blur-sm text-foreground text-[8px] font-medium px-1.5 py-0.5 rounded">
                  {game.provider}
                </div>
              )}

              {/* Players */}
              {game.players && (
                <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-white/80">
                  <span>👥</span>
                  <span>{game.players}</span>
                </div>
              )}

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <h3 className="text-white font-bold text-xs text-center truncate">{game.name}</h3>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-medium text-xs">
                  Play Now
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BingoGames;
