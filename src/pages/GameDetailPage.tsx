import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ChevronDown, ChevronLeft, ChevronRight, Play, Volume2, VolumeX, Maximize, Info, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Footer from "@/components/home/Footer";
import LatestRoundRace from "@/components/home/LatestRoundRace";
import card2 from "@/assets/images/card-2.png";
import card3 from "@/assets/images/card-3.png";
import card4 from "@/assets/images/card-4.png";
import card5 from "@/assets/images/card-5.png";
import card6 from "@/assets/images/card-6.png";
import card7 from "@/assets/images/card-7.png";
import card8 from "@/assets/images/card-8.png";
import card9 from "@/assets/images/card-9.png";

const cryptoBalances = [
  { id: "trx", name: "TRX", balance: 0, icon: "🔴" },
  { id: "btc", name: "BTC", balance: 0, icon: "🟠" },
  { id: "eth", name: "ETH", balance: 0, icon: "🔵" },
  { id: "usdt", name: "USDT", balance: 0, icon: "🟢" },
];

const recommendedGames = [
  { id: 1, name: "CLASSIC DICE", image: card3, provider: "ORIGINAL GAME", rating: 1.94 },
  { id: 2, name: "STELLAR RUSH", image: card2, provider: "ORIGINAL GAME", rating: 4.22 },
  { id: 3, name: "DICE", image: card4, provider: "ORIGINAL GAME", rating: 4.26 },
  { id: 4, name: "LIMBO", image: card5, provider: "ORIGINAL GAME", rating: 1.05 },
  { id: 5, name: "HASHDICE", image: card6, provider: "ORIGINAL GAME", rating: 4.50 },
  { id: 6, name: "PERYA COLOR", image: card7, provider: "ORIGINAL GAME", rating: 4.19 },
  { id: 7, name: "SICBO", image: card8, provider: "ORIGINAL GAME", rating: 4.70 },
  { id: 8, name: "MULTIPLAYER KENO", image: card9, provider: "ORIGINAL GAME", rating: 4.50 },
];

const latestBets = [
  { id: "185921616488", bet: "₹31.11", payout: "0.4106x", profit: "-₹18.73", isLoss: true },
  { id: "185921533841", bet: "₹546.22", payout: "0.3649x", profit: "-₹346.72", isLoss: true },
  { id: "185921324634", bet: "₹92.21", payout: "0x", profit: "-₹92.21", isLoss: true },
  { id: "185921255580", bet: "₹92.21", payout: "0x", profit: "-₹92.21", isLoss: true },
  { id: "185921292945", bet: "₹5.46", payout: "0x", profit: "-₹5.46", isLoss: true },
  { id: "185921204824", bet: "₹92.21", payout: "0.3999x", profit: "-₹55.32", isLoss: true },
  { id: "185921319620", bet: "₹92.21", payout: "0x", profit: "-₹92.21", isLoss: true },
  { id: "185921242430", bet: "₹17,891.03", payout: "2.335x", profit: "+₹18,942.44", isLoss: false },
  { id: "185921284179", bet: "₹92.21", payout: "0x", profit: "-₹92.21", isLoss: true },
];

interface GameDetailPageProps {
  isLoggedIn: boolean;
}

const GameDetailPage = ({ isLoggedIn }: GameDetailPageProps) => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [playMode, setPlayMode] = useState<"free" | "real">("real");
  const [selectedBalance, setSelectedBalance] = useState("bc");
  const [balanceType, setBalanceType] = useState<"deposit" | "bonus">("deposit");
  const [isBalanceDropdownOpen, setIsBalanceDropdownOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState("all bets");
  const [gameInfoOpen, setGameInfoOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/casino");
    }
  }, [isLoggedIn, navigate]);

  const currentBalance = cryptoBalances.find(c => c.id === selectedBalance);
  const tabs = ["All bets", "My bets", "High Roller", "Wager Contest"];

  return (
    <div className="space-y-4">
      <div className="px-3 lg:px-6 py-4 space-y-4">
        {/* Game Container - Full game area visible */}
        <div className="relative rounded-xl overflow-hidden bg-card">
          {/* Game Area - shows the actual game with balance overlay on top */}
          <div className="relative aspect-[16/9] lg:aspect-[21/9] bg-gradient-to-br from-[hsl(var(--secondary))] via-[hsl(var(--card))] to-[hsl(var(--secondary))]">
            {/* Simulated game background */}
            <div className="absolute inset-0 bg-[hsl(var(--card))]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="text-6xl mb-2">🎰</div>
                  <p className="text-sm">Game Loading...</p>
                </div>
              </div>
            </div>

            {/* Balance Selector - centered overlay WITHOUT blur */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-[hsl(var(--card))]/95 border border-border rounded-xl p-4 sm:p-6 w-[90%] max-w-[480px]">
                {/* Play with balance */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-3">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">Play with balance in</span>
                  <div className="relative flex-1 w-full">
                    <button
                      onClick={() => setIsBalanceDropdownOpen(!isBalanceDropdownOpen)}
                      className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-orange-500">●</span>
                        <span>Rellbet ({balanceType === "deposit" ? "Deposit Balance" : "Bonus Balance"})</span>
                      </span>
                      <ChevronDown className={cn("w-4 h-4 transition-transform", isBalanceDropdownOpen && "rotate-180")} />
                    </button>

                    {isBalanceDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-20 overflow-hidden"
                      >
                        <div className="flex border-b border-border">
                          <button
                            onClick={() => setBalanceType("deposit")}
                            className={cn(
                              "flex-1 py-3 text-sm font-medium transition-colors",
                              balanceType === "deposit"
                                ? "text-foreground border-b-2 border-primary"
                                : "text-muted-foreground"
                            )}
                          >
                            Deposit Balance
                          </button>
                          <button
                            onClick={() => setBalanceType("bonus")}
                            className={cn(
                              "flex-1 py-3 text-sm font-medium transition-colors",
                              balanceType === "bonus"
                                ? "text-foreground border-b-2 border-primary"
                                : "text-muted-foreground"
                            )}
                          >
                            Bonus Balance
                          </button>
                        </div>

                        {balanceType === "deposit" ? (
                          <div className="max-h-60 overflow-y-auto">
                            {cryptoBalances.map((crypto) => (
                              <button
                                key={crypto.id}
                                onClick={() => {
                                  setSelectedBalance(crypto.id);
                                  setIsBalanceDropdownOpen(false);
                                }}
                                className={cn(
                                  "w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors",
                                  selectedBalance === crypto.id && "bg-secondary"
                                )}
                              >
                                <div className="flex items-center gap-3">
                                  <span>{crypto.icon}</span>
                                  <span className="text-sm font-medium">{crypto.name}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">₹{crypto.balance.toFixed(2)}</span>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-6 text-center">
                            <p className="text-muted-foreground text-sm">Stay tuned—something's coming!</p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-2">
                  Insufficient Rellbet balance, switch to another asset or deposit to continue playing.
                </p>

                <div className="flex items-center gap-2 text-primary text-sm mb-4">
                  <Gift className="w-4 h-4" />
                  <span>Deposit Bonus +180%</span>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => navigate("/wallet/deposit")}
                    className="flex-1 h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Deposit Now
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setPlayMode("free")}
                    className="flex-1 h-11 border-border hover:bg-secondary"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Free Play
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Game Controls Bar */}
          <div className="flex items-center justify-between p-3 bg-card border-t border-border">
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <Info className="w-5 h-5 text-muted-foreground" />
              </button>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">346</span>
              </div>
              <span className="text-xs text-muted-foreground">📊</span>
              <span className="text-xs text-muted-foreground">🖥</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPlayMode("free")}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  playMode === "free" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Free Play
              </button>
              <button
                onClick={() => setPlayMode("real")}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  playMode === "real" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Real Play
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-muted-foreground" /> : <Volume2 className="w-5 h-5 text-muted-foreground" />}
              </button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <Maximize className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Game Title Section */}
        <div
          className="bg-card rounded-xl p-4 cursor-pointer"
          onClick={() => setGameInfoOpen(!gameInfoOpen)}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-foreground">Sugar Rush Super Scatter</h1>
              <p className="text-sm text-primary">By Pragmatic Play</p>
            </div>
            <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform", gameInfoOpen && "rotate-180")} />
          </div>
          {gameInfoOpen && (
            <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground space-y-2">
              <p>Category: Slots</p>
              <p>RTP: 96.53%</p>
              <p>Max Win: 50,000x</p>
              <p>Volatility: ★★★★★</p>
            </div>
          )}
        </div>

        {/* Recommended Games */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Recommended Games</h2>
            <div className="flex items-center gap-2">
              <button className="text-sm text-muted-foreground hover:text-foreground px-3 py-1 bg-secondary rounded-lg">All</button>
              <button className="p-1 rounded bg-secondary hover:bg-secondary/80">
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <button className="p-1 rounded bg-secondary hover:bg-secondary/80">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
            {recommendedGames.map((game) => (
              <div
                key={game.id}
                onClick={() => navigate(`/game/${game.id}`)}
                className="flex-shrink-0 w-[100px] sm:w-[120px] rounded-xl overflow-hidden cursor-pointer group relative"
              >
                <div className="aspect-[3/4] relative">
                  <img src={game.image} alt={game.name} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-1.5">
                    <p className="text-[9px] text-white/60 truncate">{game.provider}</p>
                    <p className="text-[10px] text-white font-bold truncate">{game.name}</p>
                  </div>
                  {game.rating && (
                    <div className="absolute top-1 right-1 bg-primary/90 text-primary-foreground text-[8px] px-1.5 py-0.5 rounded font-bold">
                      ★ {game.rating}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest bet & Race */}
        <section className="bg-card rounded-xl overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-2">
            <h3 className="text-sm font-semibold text-foreground">Latest bet & Race</h3>
            <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap",
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
                <tr className="text-muted-foreground border-b border-border text-xs">
                  <th className="text-left py-2 px-4 font-medium">Bet ID</th>
                  <th className="text-right py-2 px-4 font-medium">Bet</th>
                  <th className="text-right py-2 px-4 font-medium">Payout</th>
                  <th className="text-right py-2 px-4 font-medium">Profit</th>
                </tr>
              </thead>
              <tbody>
                {latestBets.map((bet, i) => (
                  <tr key={i} className="border-b border-border/30 hover:bg-secondary/30">
                    <td className="py-2.5 px-4 text-foreground text-xs font-mono">{bet.id}</td>
                    <td className="py-2.5 px-4 text-right text-foreground text-xs">{bet.bet} 🟢</td>
                    <td className="py-2.5 px-4 text-right text-muted-foreground text-xs">{bet.payout}</td>
                    <td className={cn("py-2.5 px-4 text-right text-xs", bet.isLoss ? "text-destructive" : "text-primary")}>
                      {bet.profit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 text-center border-t border-border">
            <button className="text-sm text-muted-foreground hover:text-foreground">Show More</button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default GameDetailPage;
