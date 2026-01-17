import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ChevronDown, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import card2 from "@/assets/images/card-2.png";
import card3 from "@/assets/images/card-3.png";
import card4 from "@/assets/images/card-4.png";
import card5 from "@/assets/images/card-5.png";
import card6 from "@/assets/images/card-6.png";
import card7 from "@/assets/images/card-7.png";
import card8 from "@/assets/images/card-8.png";
import card9 from "@/assets/images/card-9.png";

interface Game {
  id: number;
  name: string;
  provider?: string;
  image: string;
  icon?: string;
  players?: number;
  multiplier?: string | null;
}

interface GameDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: Game | null;
  onSignIn?: () => void;
}

const recommendedGames = [
  { id: 1, name: "SPEED BACCARAT", provider: "Evolution", image: card2, players: 30 },
  { id: 2, name: "LIGHTNING DICE", provider: "Evolution", image: card3, players: 45 },
  { id: 3, name: "SUPER SIC BO", provider: "Evolution", image: card4, players: 62 },
  { id: 4, name: "CRAZY ROULETTE", provider: "Playtech", image: card5, players: 80 },
  { id: 5, name: "LIGHTNING STORM", provider: "Evolution", image: card6, players: 17 },
  { id: 6, name: "DONE BACCARAT", provider: "BG.GAME", image: card7, players: 9 },
  { id: 7, name: "KOREAN BACCARAT", provider: "Playtech", image: card8, players: 65 },
  { id: 8, name: "MONOPOLY", provider: "Evolution", image: card9, players: 45 },
];

const latestBets = [
  { id: "1854216341842179281", bet: "6,005142 USDT", payout: "0x", profit: "-6,005142 USDT", isLoss: true },
  { id: "1854216341395897535", bet: "11,509835 USDT", payout: "0x", profit: "-5,5098035 USDT", isLoss: true },
  { id: "1854216280929420415", bet: "9,007713 USDT", payout: "0.3333x", profit: "-6,005142 USDT", isLoss: true },
  { id: "1854216214591592831", bet: "8,006856 USDT", payout: "0.375x", profit: "-5,004283 USDT", isLoss: true },
  { id: "1854216097391470034", bet: "5,004285 USDT", payout: "0x", profit: "-5,004285 USDT", isLoss: true },
];

const GameDetailModal = ({ isOpen, onClose, game, onSignIn }: GameDetailModalProps) => {
  const [activeTab, setActiveTab] = useState("all");
  
  if (!game) return null;

  const tabs = ["All bets", "My bets", "High Roller", "Wager Contest"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto custom-scrollbar py-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl bg-card rounded-2xl overflow-hidden mx-4 my-4"
          >
            {/* Game Preview */}
            <div className="relative aspect-video bg-gaming-dark">
              {/* <div className={cn("absolute inset-0", game.image)} /> */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Game Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl">{game.icon || "🎮"}</span>
              </div>

              {/* Sign In Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                <p className="text-white/80 text-sm text-center mb-2 px-4">
                  The selected currency will be displayed in <span className="text-primary">BCD</span>, and if you change currency while playing, the game will refresh and restart.
                </p>
                <Button
                  onClick={onSignIn}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Sign in
                </Button>
              </div>
            </div>

            {/* Game Info Bar */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">{game.players || 2278}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">📊</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">G</span>
              </div>
            </div>

            {/* Game Title */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{game.name}</h2>
                  <p className="text-sm text-primary">By {game.provider || "BC.GAME"}</p>
                </div>
                <button className="flex items-center gap-1 text-primary text-sm">
                  + Game shows
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Recommended Games */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Recommended Games</h3>
                <div className="flex items-center gap-2">
                  <button className="text-sm text-primary hover:underline">All</button>
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded bg-secondary hover:bg-secondary/80">
                      <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-1 rounded bg-secondary hover:bg-secondary/80">
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
                {recommendedGames.map((g) => (
                  <div
                    key={g.id}
                    className="flex-shrink-0 w-24 aspect-square rounded-lg overflow-hidden cursor-pointer group relative"
                  >
                    <img src={g.image} alt="logo" className="w-full"
                     />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl">🎰</span>
                    </div>
                    <div className="absolute bottom-1 left-1 right-1">
                      <p className="text-[10px] text-white font-medium truncate">{g.name}</p>
                      <p className="text-[10px] text-white/60 truncate">{g.provider}</p>
                    </div>
                    <div className="absolute bottom-1 right-1 flex items-center gap-0.5 text-white/80">
                      <span className="text-[10px]">👥</span>
                      <span className="text-[10px]">{g.players}</span>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Bets */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Latest bet & Race</h3>
                <div className="flex items-center gap-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                        activeTab === tab.toLowerCase()
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b border-border">
                      <th className="text-left py-2 font-medium">Bet ID</th>
                      <th className="text-right py-2 font-medium">Bet</th>
                      <th className="text-right py-2 font-medium">Payout</th>
                      <th className="text-right py-2 font-medium">Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestBets.map((bet) => (
                      <tr key={bet.id} className="border-b border-border/50 hover:bg-secondary/30">
                        <td className="py-2 text-foreground">{bet.id}</td>
                        <td className="py-2 text-right text-primary">{bet.bet} 🟢</td>
                        <td className="py-2 text-right text-muted-foreground">{bet.payout}</td>
                        <td className={cn("py-2 text-right", bet.isLoss ? "text-destructive" : "text-primary")}>
                          {bet.profit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameDetailModal;
