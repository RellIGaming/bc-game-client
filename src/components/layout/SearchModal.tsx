import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Flame, Gamepad2, Dice1, Trophy, Star, Sparkles, Grid3X3, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import GameDetailModal from "@/components/game/GameDetailModal";
import card2 from "@/assets/images/card-2.png";
import card3 from "@/assets/images/card-3.png";
import card4 from "@/assets/images/card-4.png";
import card5 from "@/assets/images/card-5.png";
import card6 from "@/assets/images/card-6.png";
import card7 from "@/assets/images/card-7.png";
import card8 from "@/assets/images/card-8.png";
import card9 from "@/assets/images/card-9.png";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const categories = [
  { id: "all", label: "All Games", icon: card2 },
  { id: "originals", label: "BC Originals", icon: card3 },
  { id: "hot", label: "Hot Games", icon: card4 },
  { id: "slots", label: "Slots", icon: card5 },
  { id: "live", label: "Live Casino", icon: card6 },
  { id: "table", label: "Table Game", icon: card7 },
  { id: "new", label: "New Releases", icon: card8 },
];

export const allGames = [
  { id: 1, name: "CRASH", players: 2422, multiplier: "999x", image: card2, category: "originals" },
  { id: 2, name: "LIMBO", players: 312, multiplier: "500x", image: card8, category: "originals" },
  { id: 3, name: "TWIST", players: 248, multiplier: null, image: card7, category: "originals" },
  { id: 4, name: "GOLDEN JOKER", players: 86, multiplier: null, image: card6, category: "slots" },
  { id: 5, name: "CLASSIC DICE", players: 276, multiplier: null, image: card5, category: "table" },
  { id: 6, name: "TOWER LEGEND", players: 172, multiplier: null, image: card4, category: "originals" },
  { id: 7, name: "QUEEN OF INCA", players: 31, multiplier: null, image: card2, category: "slots" },
  { id: 8, name: "KENO", players: 274, multiplier: null, image: card3, category: "originals" },
  { id: 9, name: "PLINKO", players: 138, multiplier: "2.1x", image: card2, category: "originals" },
  { id: 10, name: "MINES", players: 445, multiplier: null, image: card3, category: "originals" },
  { id: 11, name: "AVIATOR", players: 1423, multiplier: null, image: card4, category: "hot" },
  { id: 12, name: "LIGHTNING ROULETTE", players: 567, multiplier: null, image: card5, category: "live" },
  { id: 13, name: "DRAGON HATCH", players: 234, multiplier: null, image: card6, category: "new" },
  { id: 14, name: "FORTUNE OX", players: 456, multiplier: null, image: card7, category: "new" },
  { id: 15, name: "BLACKJACK VIP", players: 123, multiplier: null, image: card8, category: "table" },
  { id: 16, name: "SPEED BACCARAT", players: 345, multiplier: null, image: card9, category: "live" },
];

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("Popular");
  const [provider, setProvider] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState<typeof allGames[0] | null>(null);
  const [gameModalOpen, setGameModalOpen] = useState(false);
const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  // Filter games based on search and category
  const filteredGames = useMemo(() => {
    let games = allGames;

    // Filter by category
    if (activeCategory !== "all") {
      games = games.filter((game) => game.category === activeCategory);
    }

    // Filter by search
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      games = games.filter((game) =>
        game.name.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    if (sortBy === "Popular") {
      games = [...games].sort((a, b) => b.players - a.players);
    }

    return games;
  }, [search, activeCategory, sortBy]);

  const handleGameClick = (game: typeof allGames[0]) => {
    setSelectedGame(game);
    setGameModalOpen(true);
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
fixed inset-0 bg-black/80 backdrop-blur-sm z-50
sm:flex sm:items-start sm:justify-center sm:pt-10 sm:px-4
"

            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="
w-full bg-card flex flex-col
h-full
sm:max-w-7xl sm:max-h-[85vh] sm:rounded-2xl
"

            >
              <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-semibold text-foreground">Explore</h2>
                <button
                  onClick={onClose}
                  className="p-2 b-radius bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="p-4 pt-0">
                <div className="flex items-center gap-3 bg-secondary rounded-xl px-4 py-1 transition-all duration-200 focus-within:ring-1 focus-within:ring-primary focus-within:bg-primary/10">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    Casino
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="w-px h-5 bg-border" />
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search games"
                    className="flex-1 bg-transparent border-none p-2 h-auto text-sm focus-visible:ring-0"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="px-4 pb-4">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                  {categories.map((cat, index) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className={cn(
                        "flex items-center font-medium whitespace-nowrap transition-colors flex-shrink-0",
                        "px-2 py-1 text-xs b-radius",
                        "sm:px-2 sm:py-2 sm:text-sm sm:rounded-full sm:gap-2",
                        index > 3 && "hidden sm:flex",
                        activeCategory === cat.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <img
                        src={cat.icon}
                        alt=""
                        className="hidden sm:inline-block w-4 h-4 rounded-full"
                      />

                      {cat.label}
                    </button>
                  ))}
                </div>

              </div>


              {/* Filters */}
              <div className="px-4 pb-4 flex items-center gap-3">
                <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
                  <span className="text-sm text-muted-foreground">Sort By:</span>
                  <span className="text-sm font-medium text-foreground">{sortBy}</span>
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
                  <span className="text-sm text-muted-foreground">Providers:</span>
                  <span className="text-sm font-medium text-foreground">{provider}</span>
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Games Grid */}
              <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <LoadingSpinner size="lg" />
                  </div>
                ) : filteredGames.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                    {filteredGames.map((game) => (
                      <div
                        key={game.id}
                        onClick={() => handleGameClick(game)}
                        className="relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer group"
                      >
                        <img src={game.image} alt="logo" className={cn("absolute inset-0",)} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        {game.multiplier && (
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded z-10">
                            {game.multiplier}
                          </div>
                        )}
                        {/* <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                          <span className="text-4xl">{game.image}</span>
                        </div> */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                          <h3 className="text-white font-bold text-sm">{game.name}</h3>
                          <div className="flex items-center gap-1 text-white/70 text-xs mt-1">
                            <span>👥 {game.players}</span>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                            <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20">
                    <span className="text-4xl mb-4">🔍</span>
                    <p className="text-muted-foreground">No games found</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <GameDetailModal
        isOpen={gameModalOpen}
        onClose={() => setGameModalOpen(false)}
        game={selectedGame}
      />
    </>
  );
};

export default SearchModal;
