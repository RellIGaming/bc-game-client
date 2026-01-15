import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const liveGames = [
  { id: 1, name: "TVBET", type: "Live", color: "bg-orange-500", icon: "📺" },
  { id: 2, name: "COCO ROULETTE", type: "Live", color: "bg-pink-500", icon: "🎡" },
  { id: 3, name: "VIVO GAMING", type: "Live", color: "bg-green-600", icon: "🎲" },
  { id: 4, name: "BC GAME LOUNGE", type: "Live", color: "bg-amber-500", icon: "🎰" },
  { id: 5, name: "GIOCHI LIVE", type: "Live", color: "bg-purple-500", icon: "🃏" },
  { id: 6, name: "ROULETTE", type: "Live", color: "bg-red-500", icon: "🎯" },
];

const slots = [
  { id: 1, name: "AVIATOR", provider: "Spribe", color: "bg-red-500", icon: "✈️" },
  { id: 2, name: "GOLDEN JOKER", provider: "JILI", color: "bg-amber-500", icon: "🃏" },
  { id: 3, name: "QUEEN OF INCA", provider: "FC", color: "bg-orange-500", icon: "👸" },
  { id: 4, name: "FORTUNE GEMS", provider: "JILI", color: "bg-emerald-500", icon: "💎" },
];

interface GameSectionProps {
  title: string;
  games: typeof liveGames | typeof slots;
}

const GameSection = ({ title, games }: GameSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
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

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
      >
        {games.map((game) => (
          <div
            key={game.id}
            className="flex-shrink-0 w-36 lg:w-44 aspect-[4/5] rounded-xl overflow-hidden cursor-pointer group gaming-card-hover relative"
          >
            <div className={`absolute inset-0 ${game.color}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            
            {/* Live Badge */}
            {"type" in game && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                LIVE
              </div>
            )}

            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl lg:text-6xl">{game.icon}</span>
            </div>

            {/* Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-white font-bold text-xs text-center truncate">{game.name}</h3>
            </div>

            {/* Hover */}
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

const LiveCasinoAndSlots = () => {
  return (
    <div className="space-y-8">
      <GameSection title="Live Casino" games={liveGames} />
      <GameSection title="Slots" games={slots} />
    </div>
  );
};

export default LiveCasinoAndSlots;
