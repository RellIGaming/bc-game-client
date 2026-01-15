import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import card2 from "../../assets/images/card-2.png"
import card3 from "../../assets/images/card-3.png"
import card4 from "../../assets/images/card-4.png"
import card5 from "../../assets/images/card-5.png"
import card6 from "../../assets/images/card-6.png"
import card7 from "../../assets/images/card-7.png"
import card8 from "../../assets/images/card-8.png"
import card9 from "../../assets/images/card-9.png"
import card10 from "../../assets/images/card-10.png"
import card11 from "../../assets/images/card-11.png"

const games = [
  { id: 1, name: "CRASH", multiplier: "999x", players: 2009, image: card2 },
  { id: 2, name: "LIMBO", multiplier: "500x", players: 280, image: card3 },
  { id: 3, name: "PLINKO", multiplier: "2.1x", players: 138, image: card4 },
  { id: 4, name: "ULTIMATE DICE", multiplier: "9900x", players: 58, image: card5 },
  { id: 5, name: "JADE", multiplier: null, players: 99, image: card6 },
  { id: 6, name: "BULLET SPIN", multiplier: null, players: 99, image: card7 },
  { id: 7, name: "FAST CRASH", multiplier: "Rise", players: 72, image: card8 },
  { id: 8, name: "FAST CRASH", multiplier: "Rise", players: 72, image: card9 },
  { id: 9, name: "FAST CRASH", multiplier: "Rise", players: 72, image: card10 },
  { id: 10, name: "FAST CRASH", multiplier: "Rise", players: 72, image: card11 },
];

const BCOriginals = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">BC Originals</h2>
        <div className="flex items-center gap-2">
          <button className="text-sm text-primary hover:underline">All</button>
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
            className="flex-shrink-0 w-36 lg:w-44 aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group gaming-card-hover relative"
          >
            <img src={game.image} alt="" className="absolute inset-0"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Multiplier Badge */}
            {game.multiplier && (
              <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                {game.multiplier}
              </div>
            )}

            {/* Game Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl lg:text-6xl mb-2">🎮</span>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-white font-bold text-sm text-center">{game.name}</h3>
              <div className="flex items-center justify-center gap-1 mt-1">
                <span className="text-xs text-white/60">ORIGINAL GAME</span>
                <span className="text-xs text-white/80">👥 {game.players}</span>
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium text-sm">
                Play Now
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BCOriginals;
