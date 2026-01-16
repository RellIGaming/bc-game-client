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
  { id: 1, name: "Fortune Gems", provider: "JILI", rtp: "A-54", image: card2 },
  { id: 2, name: "Fortune Gems 3", provider: "JILI", rtp: "4-70", image: card3 },
  { id: 3, name: "Wild Bandito", provider: "PGSoft", rtp: null, image: card4 },
  { id: 4, name: "Aztec Coins", provider: null, rtp: null, image: card5 },
  { id: 5, name: "Fortune Coins", provider: "JILI", rtp: "4-7", image: card6 },
  { id: 6, name: "Showdown Saloon", provider: null, rtp: null, image: card7 },
  { id: 7, name: "Aztec Empire", provider: null, rtp: null, image: card8 },
  { id: 8, name: "Aztec Empire", provider: null, rtp: null, image: card8 },
];

const HotGames = () => {
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
        <h2 className="text-lg font-bold text-foreground">Hot Games</h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate("/category/hot-games")}
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
        // className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
        className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 lg:gap-3"
      >
        {games.map((game) => (
          <div
            key={game.id}
            // className="flex-shrink-0 w-32 lg:w-40 rounded-xl overflow-hidden cursor-pointer group gaming-card-hover relative"
           className="rounded-xl overflow-hidden cursor-pointer group gaming-card-hover relative"
          >
            <div className="aspect-[3/4] relative">
              <img 
                src={game.image} 
                alt={game.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Hot Badge */}
              <div className="absolute top-2 left-2 bg-orange-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                🔥 HOT
              </div>

              {/* RTP Badge */}
              {game.rtp && (
                <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-[8px] font-bold px-1.5 py-0.5 rounded">
                  {game.rtp}
                </div>
              )}

              {/* Provider */}
              {game.provider && (
                <div className="absolute bottom-8 left-0 right-0 px-2">
                  <span className="text-[10px] text-white/60">{game.provider}</span>
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

export default HotGames;
