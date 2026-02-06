import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles, Flame, LayoutGrid, CircleDot, Star, Spade, Dice1 } from "lucide-react";
import { Input } from "@/components/ui/input";

import HeroSection from "@/components/home/HeroSection";
import LatestRoundRace from "@/components/home/LatestRoundRace";
import Providers from "@/components/home/Providers";
import { cn } from "@/lib/utils";
import card2 from "@/assets/images/card-2.png";
import card3 from "@/assets/images/card-3.png";
import card4 from "@/assets/images/card-4.png";
import card5 from "@/assets/images/card-5.png";
import card6 from "@/assets/images/card-6.png";
import card7 from "@/assets/images/card-7.png";
import card8 from "@/assets/images/card-8.png";
import card9 from "@/assets/images/card-9.png";

// Category tabs
const categoryTabs = [
  { id: "lobby", label: "Lobby", icon: Sparkles },
  { id: "bc-originals", label: "BC Originals", icon: Sparkles },
  { id: "hot-games", label: "Hot Games", icon: Flame },
  { id: "slots", label: "Slots", icon: LayoutGrid },
  { id: "live-casino", label: "Live Casino", icon: CircleDot },
  { id: "game-shows", label: "Game Shows", icon: CircleDot },
  { id: "bonus-buy", label: "Bonus Buy", icon: CircleDot },
  { id: "blackjack", label: "Blackjack", icon: Spade },
  { id: "baccarat", label: "Baccarat", icon: Spade },
  { id: "new-releases", label: "New Releases", icon: Star },
  { id: "poker", label: "Poker", icon: Spade },
  { id: "table-games", label: "Table Games", icon: Dice1 },
];

// Mock game data
const allGames = [
  { id: 1, name: "Crash", image: card2, multiplier: "999x", players: 2558, provider: "ORIGINAL", category: ["bc-originals", "hot-games", "lobby"] },
  { id: 2, name: "Limbo", image: card3, multiplier: "500×", players: 270, provider: "ORIGINAL", category: ["bc-originals", "lobby"] },
  { id: 3, name: "Plinko", image: card4, players: 298, provider: "ORIGINAL", category: ["bc-originals", "lobby"] },
  { id: 4, name: "Twist", image: card5, players: 298, provider: "ORIGINAL", category: ["bc-originals"] },
  { id: 5, name: "Keno", image: card6, multiplier: "12", players: 247, provider: "ORIGINAL", category: ["bc-originals", "lobby"] },
  { id: 6, name: "Classic Dice", image: card7, players: 328, provider: "ORIGINAL", category: ["bc-originals", "lobby"] },
  { id: 7, name: "Hilo", image: card2, players: 286, provider: "ORIGINAL", category: ["bc-originals"] },
  { id: 8, name: "Fortune Gems 3", image: card8, players: 127, provider: "JILI", category: ["hot-games", "slots", "lobby"] },
  { id: 9, name: "Showdown", image: card9, players: 84, provider: "JILI", category: ["hot-games", "lobby"] },
  { id: 10, name: "Fortune Rabbit", image: card2, players: 91, provider: "JILI", category: ["hot-games", "slots"] },
  { id: 11, name: "Dragon Baccarat", image: card2, players: 45, provider: "Evolution", category: ["live-casino", "baccarat", "lobby"] },
  { id: 12, name: "TVBET", image: card2, players: 67, provider: "TVBET", category: ["live-casino", "lobby"] },
  { id: 13, name: "Cock Fighting", image: card2, players: 32, provider: "Evolution", category: ["live-casino"] },
  { id: 14, name: "Sic Bo", image: card2, players: 89, provider: "Evolution", category: ["live-casino", "table-games"] },
  { id: 15, name: "Roulette", image: card2, players: 156, provider: "Evolution", category: ["live-casino", "table-games", "lobby"] },
  { id: 16, name: "Blackjack VIP", image: card2, players: 78, provider: "Evolution", category: ["live-casino", "blackjack", "lobby"] },
  { id: 17, name: "Lightning Roulette", image: card2, players: 203, provider: "Evolution", category: ["game-shows", "lobby"] },
  { id: 18, name: "Cash or Crash", image: card2, players: 145, provider: "Evolution", category: ["game-shows"] },
  { id: 19, name: "Crazy Time", image:card2, players: 312, provider: "Evolution", category: ["game-shows", "lobby"] },
  { id: 20, name: "Mega Ball", image: card3, players: 98, provider: "Evolution", category: ["game-shows"] },
  { id: 21, name: "BC Poker", image: card4, players: 567, provider: "ORIGINAL", category: ["poker", "lobby"] },
  { id: 22, name: "Video Poker", image: card5, players: 234, provider: "NetEnt", category: ["poker"] },
  { id: 23, name: "Teen Patti", image: card6, players: 189, provider: "JILI", category: ["poker", "table-games"] },
  { id: 24, name: "Speed Blackjack", image: card7, players: 167, provider: "Evolution", category: ["blackjack", "table-games"] },
  { id: 25, name: "Iron Blackjack", image: card8, players: 89, provider: "NetEnt", category: ["blackjack"] },
  { id: 26, name: "Crypto Bro", image: card2, players: 123, provider: "AvatarUX", category: ["new-releases", "slots"] },
  { id: 27, name: "Surrender Blackjack", image: card4, players: 45, provider: "Pragmatic", category: ["new-releases", "blackjack"] },
  { id: 28, name: "Cash Stack", image: card5, players: 78, provider: "JILI", category: ["new-releases", "slots"] },
  { id: 29, name: "Majestic Claws", image: card6, players: 56, provider: "JILI", category: ["new-releases", "bonus-buy"] },
  { id: 30, name: "Book of Ra", image: card7, players: 234, provider: "Novomatic", category: ["slots", "bonus-buy"] },
  { id: 31, name: "Gates of Olympus", image: card8, players: 456, provider: "Pragmatic", category: ["slots", "bonus-buy"] },
  { id: 32, name: "Sweet Bonanza", image: card9, players: 389, provider: "Pragmatic", category: ["slots", "bonus-buy"] },
];

interface CasinoPageProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const CasinoPage = ({ isLoggedIn, setIsLoggedIn }: CasinoPageProps) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
 
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("casino");
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState("lobby");
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingGameId, setPendingGameId] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
        setSidebarCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // Handle login success - navigate to pending game
  const handleLoginSuccess = (value: boolean) => {
    setIsLoggedIn(value);
    setSignInOpen(false);
    if (pendingGameId && value) {
      navigate(`/game/${pendingGameId}`);
      setPendingGameId(null);
    }
  };

  // Handle game card click
  const handleGameClick = (gameId: number) => {
    if (!isLoggedIn) {
      setPendingGameId(gameId);
      setSignInOpen(true);
    } else {
      navigate(`/game/${gameId}`);
    }
  };

 
  // Filter games based on category and search
  const filteredGames = useMemo(() => {
    let games = allGames;
    
    if (activeCategory !== "lobby") {
      games = games.filter(g => g.category.includes(activeCategory));
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      games = games.filter(g => 
        g.name.toLowerCase().includes(query) || 
        g.provider?.toLowerCase().includes(query)
      );
    }
    
    return games;
  }, [activeCategory, searchQuery]);

  // Get games by category for lobby view
  const getGamesByCategory = (categoryId: string) => {
    return allGames.filter(g => g.category.includes(categoryId));
  };

  return (
    <div className="">
        <main 
          className=""
          
        >
          <div className="px-1 lg:px-2 py-2 lg:py-4 space-y-4 lg:space-y-5">
            {/* Hero Banner */}
            <HeroSection onSignUp={() => setSignUpOpen(true)} isLoggedIn={isLoggedIn} />

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-border h-10 sm:h-11"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 b-radius text-xs sm:text-sm font-medium whitespace-nowrap transition-colors",
                    activeCategory === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  )}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Games Display */}
            {activeCategory === "lobby" ? (
              // Lobby view - show carousels for each category
              <div className="space-y-6">
                <GameCarouselWithClick
                  title="BC Originals"
                  games={getGamesByCategory("bc-originals")}
                  categoryPath="/casino?category=bc-originals"
                  labelText="ORIGINAL"
                  onGameClick={handleGameClick}
                />
                <GameCarouselWithClick
                  title="Hot Games"
                  games={getGamesByCategory("hot-games")}
                  categoryPath="/casino?category=hot-games"
                  labelText="HOT"
                  onGameClick={handleGameClick}
                />
                <GameCarouselWithClick
                  title="Slots"
                  games={getGamesByCategory("slots")}
                  categoryPath="/casino?category=slots"
                  labelText="SLOTS"
                  onGameClick={handleGameClick}
                />
                <GameCarouselWithClick
                  title="Live Casino"
                  games={getGamesByCategory("live-casino")}
                  categoryPath="/casino?category=live-casino"
                  labelText="LIVE"
                  onGameClick={handleGameClick}
                />
                <GameCarouselWithClick
                  title="Game Shows"
                  games={getGamesByCategory("game-shows")}
                  categoryPath="/casino?category=game-shows"
                  labelText="SHOW"
                  onGameClick={handleGameClick}
                />
                <GameCarouselWithClick
                  title="New Releases"
                  games={getGamesByCategory("new-releases")}
                  categoryPath="/casino?category=new-releases"
                  labelText="NEW"
                  onGameClick={handleGameClick}
                />
                <GameCarouselWithClick
                  title="Poker"
                  games={getGamesByCategory("poker")}
                  categoryPath="/casino?category=poker"
                  labelText="POKER"
                  onGameClick={handleGameClick}
                />
                <Providers />
                <GameCarouselWithClick
                  title="Blackjack"
                  games={getGamesByCategory("blackjack")}
                  categoryPath="/casino?category=blackjack"
                  labelText="BLACKJACK"
                  onGameClick={handleGameClick}
                />
                <GameCarouselWithClick
                  title="Table Games"
                  games={getGamesByCategory("table-games")}
                  categoryPath="/casino?category=table-games"
                  labelText="TABLE"
                  onGameClick={handleGameClick}
                />
                <LatestRoundRace />
              </div>
            ) : (
              // Category view - show grid
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-foreground capitalize">
                  {categoryTabs.find(t => t.id === activeCategory)?.label || activeCategory}
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3">
                  {filteredGames.map((game) => (
                    <GameCardClickable
                      key={game.id}
                      game={game}
                      onClick={() => handleGameClick(game.id)}
                    />
                  ))}
                </div>
                {filteredGames.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No games found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

      </div>

  );
};

// Game Card with click handler
interface GameCardClickableProps {
  game: {
    id: number;
    name: string;
    image: string;
    multiplier?: string | null;
    players?: number;
    provider?: string;
  };
  onClick: () => void;
}

const GameCardClickable = ({ game, onClick }: GameCardClickableProps) => {
  return (
    <div 
      onClick={onClick}
      className="b-radius overflow-hidden cursor-pointer group gaming-card-hover relative"
    >
      <div className="aspect-[3/4] relative">
        <img
          src={game.image}
          alt={game.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {game.multiplier && (
          <div className="absolute top-1.5 left-1.5 bg-primary/90 text-primary-foreground text-[8px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded">
            {game.multiplier}
          </div>
        )}

        {game.players && (
          <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px] text-white/80 bg-black/40 px-1 sm:px-1.5 py-0.5 rounded">
            <span>👥</span>
            <span>{game.players}</span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-2 text-center">
          <h3 className="text-white font-bold text-[10px] sm:text-xs truncate">
            {game.name}
          </h3>
          {game.provider && (
            <p className="text-[8px] sm:text-[10px] text-white/60 truncate">
              {game.provider}
            </p>
          )}
        </div>

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-primary text-primary-foreground px-2 sm:px-3 py-1 sm:py-1.5 b-radius font-medium text-[10px] sm:text-xs">
            Play Now
          </span>
        </div>
      </div>
    </div>
  );
};

// Carousel with click handler
interface GameCarouselWithClickProps {
  title: string;
  games: typeof allGames;
  categoryPath?: string;
  labelText?: string;
  onGameClick: (gameId: number) => void;
}

import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const GameCarouselWithClick = ({ 
  title, 
  games, 
  categoryPath, 
  labelText = "ORIGINAL",
  onGameClick 
}: GameCarouselWithClickProps) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(3);
      } else if (width < 1024) {
        setVisibleCount(6);
      } else {
        setVisibleCount(8);
      }
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, games.length - visibleCount);
  const next = () => setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  const prev = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));

  const visibleGames = games.slice(currentIndex, currentIndex + visibleCount);
  const displayGames = visibleGames.length < visibleCount 
    ? [...visibleGames, ...games.slice(0, visibleCount - visibleGames.length)]
    : visibleGames;

  if (games.length === 0) return null;

  return (
    <section className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-foreground">{title}</h2>
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
            <button onClick={prev} className="p-1 sm:p-1.5 b-radius bg-secondary hover:bg-secondary/80 transition-colors">
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <button onClick={next} className="p-1 sm:p-1.5 b-radius bg-secondary hover:bg-secondary/80 transition-colors">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      <div 
        className="grid gap-1.5 sm:gap-2 lg:gap-3"
        style={{ gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))` }}
      >
        {displayGames.map((game, idx) => (
          <GameCardClickable
            key={`${game.id}-${idx}`}
            game={game}
            onClick={() => onGameClick(game.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default CasinoPage;
