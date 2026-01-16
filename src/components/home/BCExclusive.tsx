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
import card9 from "@/assets/images/card-9.png";

const games = [
  { id: 1, name: "CRASH", multiplier: "999x", players: 2304, image: card7 },
  { id: 2, name: "LIMBO", multiplier: "500×", players: 218, image: card6 },
  { id: 3, name: "PLINKO", multiplier: "2×160", players: 2543, image: card4 },
  { id: 4, name: "TWIST", multiplier: "12×254", players: 77, image: card5 },
  { id: 5, name: "TOWER LEGEND", multiplier: null, players: 350, image: card8 },
  { id: 6, name: "CLASSIC DICE", multiplier: null, players: 200, image: card3 },
  { id: 7, name: "KENO", multiplier: "12", players: 510, image: card2 },
  { id: 8, name: "MINES", multiplier: "163", players: 863, image: card9 },
];

const BCExclusive = () => {
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
        <h2 className="text-lg font-bold text-foreground">BC Exclusive</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/category/bc-exclusive")}
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
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 lg:gap-3">
        {games.slice(0, 8).map((game) => (
          <div
            key={game.id}
            className="rounded-xl overflow-hidden cursor-pointer group gaming-card-hover relative"
          >
            <div className="aspect-[3/4] relative">
              <img
                src={game.image}
                alt={game.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Multiplier Badge */}
              {game.multiplier && (
                <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {game.multiplier}
                </div>
              )}
              {/* 
              <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-white/80 bg-black/40 px-1.5 py-0.5 rounded">
                <span>👥</span>
                <span>{game.players}</span>
              </div> */}

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                <span className="text-[8px] text-primary font-medium">Rellbet</span>
                {/* <h3 className="text-white font-bold text-xs truncate">{game.name}</h3> */}
                <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-white/80 bg-black/40 px-1.5 py-0.5 rounded">
                  <span>👥</span>
                  <span>{game.players}</span>
                </div>
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

export default BCExclusive;
