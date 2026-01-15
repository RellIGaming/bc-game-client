import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import GameDetailModal from "@/components/game/GameDetailModal";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface Game {
  id: number;
  name: string;
  provider: string;
  color: string;
  icon: string;
  players: number;
  multiplier?: string | null;
  category: string;
}

const allGames: Game[] = [
  // Casino Games
  { id: 1, name: "CRASH", provider: "BC.GAME", color: "bg-green-500", icon: "🚀", players: 2009, multiplier: "999x", category: "casino" },
  { id: 2, name: "LIMBO", provider: "BC.GAME", color: "bg-blue-600", icon: "🎯", players: 280, multiplier: "500x", category: "casino" },
  { id: 3, name: "PLINKO", provider: "BC.GAME", color: "bg-emerald-500", icon: "⚪", players: 138, multiplier: "2.1x", category: "casino" },
  { id: 4, name: "DICE", provider: "BC.GAME", color: "bg-red-500", icon: "🎲", players: 276, multiplier: "9900x", category: "casino" },
  { id: 5, name: "MINES", provider: "BC.GAME", color: "bg-yellow-500", icon: "💣", players: 312, category: "casino" },
  { id: 6, name: "TOWER LEGEND", provider: "BC.GAME", color: "bg-purple-500", icon: "🗼", players: 172, category: "casino" },
  
  // BC Originals
  { id: 7, name: "CRASH", provider: "BC.GAME", color: "bg-green-500", icon: "🚀", players: 2009, multiplier: "999x", category: "originals" },
  { id: 8, name: "LIMBO", provider: "BC.GAME", color: "bg-blue-600", icon: "🎯", players: 280, multiplier: "500x", category: "originals" },
  { id: 9, name: "TWIST", provider: "BC.GAME", color: "bg-purple-600", icon: "🌀", players: 248, category: "originals" },
  { id: 10, name: "ULTIMATE DICE", provider: "BC.GAME", color: "bg-red-500", icon: "🎲", players: 58, multiplier: "9900x", category: "originals" },
  { id: 11, name: "JADE", provider: "BC.GAME", color: "bg-cyan-500", icon: "💎", players: 99, category: "originals" },
  { id: 12, name: "BULLET SPIN", provider: "BC.GAME", color: "bg-indigo-500", icon: "🔫", players: 99, category: "originals" },
  
  // Slots
  { id: 13, name: "AVIATOR", provider: "Spribe", color: "bg-red-500", icon: "✈️", players: 1423, category: "slots" },
  { id: 14, name: "GOLDEN JOKER", provider: "JILI", color: "bg-amber-500", icon: "🃏", players: 86, category: "slots" },
  { id: 15, name: "QUEEN OF INCA", provider: "FC", color: "bg-orange-500", icon: "👸", players: 31, category: "slots" },
  { id: 16, name: "FORTUNE GEMS", provider: "JILI", color: "bg-emerald-500", icon: "💎", players: 245, category: "slots" },
  { id: 17, name: "MONEY COMING", provider: "JILI", color: "bg-yellow-500", icon: "💰", players: 189, category: "slots" },
  { id: 18, name: "WILD BOUNTY", provider: "PG", color: "bg-cyan-500", icon: "🏴‍☠️", players: 324, category: "slots" },
  
  // Live Casino
  { id: 19, name: "TVBET", provider: "TVBET", color: "bg-orange-500", icon: "📺", players: 156, category: "live-casino" },
  { id: 20, name: "COCO ROULETTE", provider: "Evolution", color: "bg-pink-500", icon: "🎡", players: 423, category: "live-casino" },
  { id: 21, name: "VIVO GAMING", provider: "Vivo", color: "bg-green-600", icon: "🎲", players: 89, category: "live-casino" },
  { id: 22, name: "BC GAME LOUNGE", provider: "BC.GAME", color: "bg-amber-500", icon: "🎰", players: 234, category: "live-casino" },
  { id: 23, name: "GIOCHI LIVE", provider: "Evolution", color: "bg-purple-500", icon: "🃏", players: 178, category: "live-casino" },
  { id: 24, name: "LIGHTNING ROULETTE", provider: "Evolution", color: "bg-red-500", icon: "⚡", players: 567, category: "live-casino" },
  
  // Sports
  { id: 25, name: "FOOTBALL", provider: "BC Sports", color: "bg-green-500", icon: "⚽", players: 2345, category: "sports" },
  { id: 26, name: "BASKETBALL", provider: "BC Sports", color: "bg-orange-500", icon: "🏀", players: 1234, category: "sports" },
  { id: 27, name: "TENNIS", provider: "BC Sports", color: "bg-lime-500", icon: "🎾", players: 567, category: "sports" },
  { id: 28, name: "ESPORTS", provider: "BC Sports", color: "bg-purple-500", icon: "🎮", players: 890, category: "sports" },
  
  // Lottery
  { id: 29, name: "MEGA MILLIONS", provider: "BC Lottery", color: "bg-yellow-500", icon: "🎫", players: 4567, category: "lottery" },
  { id: 30, name: "POWERBALL", provider: "BC Lottery", color: "bg-red-500", icon: "🎱", players: 3456, category: "lottery" },
  { id: 31, name: "KENO", provider: "BC.GAME", color: "bg-blue-500", icon: "🔢", players: 274, category: "lottery" },
  
  // Hot Games
  { id: 32, name: "CRASH", provider: "BC.GAME", color: "bg-green-500", icon: "🚀", players: 2009, multiplier: "999x", category: "hot-games" },
  { id: 33, name: "AVIATOR", provider: "Spribe", color: "bg-red-500", icon: "✈️", players: 1423, category: "hot-games" },
  { id: 34, name: "LIGHTNING ROULETTE", provider: "Evolution", color: "bg-red-500", icon: "⚡", players: 567, category: "hot-games" },
  
  // New Releases
  { id: 35, name: "DRAGON HATCH", provider: "PG", color: "bg-red-600", icon: "🐉", players: 234, category: "new-releases" },
  { id: 36, name: "FORTUNE OX", provider: "PG", color: "bg-amber-600", icon: "🐂", players: 456, category: "new-releases" },
  
  // Blackjack
  { id: 37, name: "CLASSIC BLACKJACK", provider: "Evolution", color: "bg-green-700", icon: "🃏", players: 345, category: "blackjack" },
  { id: 38, name: "VIP BLACKJACK", provider: "Evolution", color: "bg-gold", icon: "🎰", players: 123, category: "blackjack" },
  
  // Roulette
  { id: 39, name: "EUROPEAN ROULETTE", provider: "Evolution", color: "bg-red-600", icon: "🎡", players: 567, category: "roulette" },
  { id: 40, name: "AMERICAN ROULETTE", provider: "Evolution", color: "bg-blue-600", icon: "🎯", players: 234, category: "roulette" },
  
  // Baccarat
  { id: 41, name: "SPEED BACCARAT", provider: "Evolution", color: "bg-amber-600", icon: "🎴", players: 456, category: "baccarat" },
  { id: 42, name: "NO COMMISSION BACCARAT", provider: "Evolution", color: "bg-purple-600", icon: "💎", players: 234, category: "baccarat" },
  
  // Poker
  { id: 43, name: "TEXAS HOLDEM", provider: "Evolution", color: "bg-green-600", icon: "🃏", players: 789, category: "poker" },
  { id: 44, name: "THREE CARD POKER", provider: "Evolution", color: "bg-blue-600", icon: "♠️", players: 345, category: "poker" },
  
  // Bingo
  { id: 45, name: "MEGA BINGO", provider: "BC.GAME", color: "bg-pink-500", icon: "🎱", players: 234, category: "bingo" },
  { id: 46, name: "SPEED BINGO", provider: "BC.GAME", color: "bg-purple-500", icon: "⚡", players: 167, category: "bingo" },
  
  // Table Games
  { id: 47, name: "CRAPS", provider: "Evolution", color: "bg-red-500", icon: "🎲", players: 123, category: "table-games" },
  { id: 48, name: "SIC BO", provider: "Evolution", color: "bg-blue-500", icon: "🎯", players: 234, category: "table-games" },
];

const categoryTitles: Record<string, string> = {
  "casino": "Casino",
  "originals": "BC Originals",
  "slots": "Slots",
  "live-casino": "Live Casino",
  "sports": "Sports",
  "lottery": "Lottery",
  "hot-games": "Hot Games",
  "new-releases": "New Releases",
  "blackjack": "Blackjack",
  "roulette": "Roulette",
  "baccarat": "Baccarat",
  "poker": "Poker",
  "bingo": "Bingo",
  "table-games": "Table Games",
  "vip-club": "VIP Club",
  "bonus": "Bonus",
  "referral": "Referral",
  "promotions": "Promotions",
  "crypto-futures": "Crypto Futures",
  "provably-fair": "Provably Fair",
  "responsible-gambling": "Responsible Gambling",
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [gameModalOpen, setGameModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const categoryGames = allGames.filter((game) => game.category === category);
  const title = categoryTitles[category || ""] || "Games";

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
    setGameModalOpen(true);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gaming-dark/95 backdrop-blur-sm px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="container py-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : categoryGames.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
            {categoryGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => handleGameClick(game)}
                className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group"
              >
                <div className={cn("absolute inset-0", game.color)} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Multiplier Badge */}
                {game.multiplier && (
                  <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs font-bold px-2 py-1 rounded z-10">
                    {game.multiplier}
                  </div>
                )}

                {/* Game Icon */}
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <span className="text-5xl lg:text-6xl">{game.icon}</span>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                  <h3 className="text-white font-bold text-sm text-center truncate">{game.name}</h3>
                  <p className="text-white/60 text-xs text-center truncate">{game.provider}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Users className="w-3 h-3 text-white/60" />
                    <span className="text-xs text-white/80">{game.players}</span>
                  </div>
                </div>

                {/* Hover Overlay with Play Button */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg"
                    style={{ boxShadow: "0 0 30px hsl(var(--primary) / 0.5)" }}
                  >
                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                  </motion.div>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-xl" style={{ boxShadow: "inset 0 0 30px hsl(var(--primary) / 0.3)" }} />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="text-6xl mb-4">🎮</span>
            <h2 className="text-xl font-semibold text-foreground mb-2">Coming Soon</h2>
            <p className="text-muted-foreground text-center">
              {title} games will be available soon!
            </p>
          </div>
        )}
      </div>

      {/* Game Detail Modal */}
      <GameDetailModal
        isOpen={gameModalOpen}
        onClose={() => setGameModalOpen(false)}
        game={selectedGame}
      />
    </div>
  );
};

export default CategoryPage;
