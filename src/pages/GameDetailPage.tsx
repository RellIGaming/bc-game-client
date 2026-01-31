import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ChevronDown, Play, Pause, Volume2, VolumeX, Maximize, Info, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import LiveChat from "@/components/layout/LiveChat";
import SearchModal from "@/components/layout/SearchModal";
import LanguageCurrencyModal from "@/components/layout/LanguageCurrencyModal";
import Footer from "@/components/home/Footer";
import LatestRoundRace from "@/components/home/LatestRoundRace";
import { cn } from "@/lib/utils";

// Crypto balances
const cryptoBalances = [
  { id: "trx", name: "TRX", balance: 0, icon: "🔴" },
  { id: "btc", name: "BTC", balance: 0, icon: "🟠" },
  { id: "eth", name: "ETH", balance: 0, icon: "🔵" },
  { id: "usdt", name: "USDT", balance: 0, icon: "🟢" },
  { id: "bc", name: "BC", balance: 0, icon: "🟡" },
  { id: "bcd", name: "BCD", balance: 0, icon: "🟣" },
];

// Mock recommended games
const recommendedGames = [
  { id: 1, name: "Crash", image: "/placeholder.svg", multiplier: "999x", players: 2558 },
  { id: 2, name: "Limbo", image: "/placeholder.svg", multiplier: "500×", players: 270 },
  { id: 3, name: "Twist", image: "/placeholder.svg", players: 298 },
  { id: 4, name: "Keno", image: "/placeholder.svg", multiplier: "12", players: 247 },
  { id: 5, name: "Classic Dice", image: "/placeholder.svg", players: 328 },
  { id: 6, name: "Plinko", image: "/placeholder.svg", players: 258 },
  { id: 7, name: "Hilo", image: "/placeholder.svg", players: 286 },
];

interface GameDetailPageProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const GameDetailPage = ({ isLoggedIn, setIsLoggedIn }: GameDetailPageProps) => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
   const [currencyOpen, setCurrencyOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("casino");
  const [isMobile, setIsMobile] = useState(false);
  const [playMode, setPlayMode] = useState<"free" | "real">("real");
  const [selectedBalance, setSelectedBalance] = useState("bc");
  const [balanceType, setBalanceType] = useState<"deposit" | "bonus">("deposit");
  const [isBalanceDropdownOpen, setIsBalanceDropdownOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/casino");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    document.documentElement.classList.remove("light");
    if (!isDark) {
      document.documentElement.classList.add("light");
    }
  }, [isDark]);

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

  const toggleTheme = () => setIsDark(!isDark);

  const getMainMargin = () => {
    if (isMobile) return 0;
    if (!sidebarOpen) return 0;
    return sidebarCollapsed ? 64 : 240;
  };

  const currentBalance = cryptoBalances.find(c => c.id === selectedBalance);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      

        <main 
        >
          <div className="px-3 lg:px-6 py-4 lg:py-5 space-y-4 lg:space-y-5">
            {/* Game Container */}
            <div className="relative rounded-xl overflow-hidden bg-card">
              {/* Game Iframe/Placeholder */}
              <div className="relative aspect-video bg-gradient-to-br from-secondary via-card to-secondary flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-30" />
                
                {/* Balance Selector Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="bg-card/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 min-w-[280px] sm:min-w-[340px]">
                    {/* Balance Dropdown */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-muted-foreground">Play with balance in</span>
                      <div className="relative flex-1">
                        <button
                          onClick={() => setIsBalanceDropdownOpen(!isBalanceDropdownOpen)}
                          className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm"
                        >
                          <span className="flex items-center gap-2">
                            <span>{currentBalance?.icon}</span>
                            <span>BC ({balanceType === "deposit" ? "Deposit Balance" : "Bonus Balance"})</span>
                          </span>
                          <ChevronDown className={cn("w-4 h-4 transition-transform", isBalanceDropdownOpen && "rotate-180")} />
                        </button>

                        {isBalanceDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-20 overflow-hidden"
                          >
                            {/* Balance Type Tabs */}
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
                              <div className="p-6">
                                <div className="relative mb-4">
                                  <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-primary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                  />
                                </div>
                                <p className="text-center text-muted-foreground text-sm">
                                  Stay tuned—something's coming!
                                </p>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Insufficient Balance Warning */}
                    <p className="text-sm text-muted-foreground mb-2">
                      Insufficient BC balance, switch to another asset or deposit to continue playing.
                    </p>

                    {/* Bonus Banner */}
                    <div className="flex items-center gap-2 text-primary text-sm mb-4">
                      <Gift className="w-4 h-4" />
                      <span>Deposit Bonus +180%</span>
                    </div>

                    {/* Action Buttons */}
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

              {/* Game Controls */}
              <div className="flex items-center justify-between p-3 bg-card border-t border-border">
                <div className="flex items-center gap-3">
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <Info className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <Star className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPlayMode("free")}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      playMode === "free" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Free Play
                  </button>
                  <button
                    onClick={() => setPlayMode("real")}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
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
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <Maximize className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>

            {/* Game Info */}
            <div className="bg-card rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-lg font-bold text-foreground">Crypto Bro</h1>
                  <p className="text-sm text-primary">By AvatarUX</p>
                </div>
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            {/* Recommended Games */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">Recommended Games</h2>
                <button className="text-sm text-primary hover:underline">All</button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-3">
                {recommendedGames.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => navigate(`/game/${game.id}`)}
                    className="rounded-xl overflow-hidden cursor-pointer group gaming-card-hover relative"
                  >
                    <div className="aspect-[3/4] relative">
                      <img src={game.image} alt={game.name} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      {game.multiplier && (
                        <div className="absolute top-1.5 left-1.5 bg-primary/90 text-primary-foreground text-[8px] font-bold px-1.5 py-0.5 rounded">
                          {game.multiplier}
                        </div>
                      )}
                      {game.players && (
                        <div className="absolute top-1.5 right-1.5 flex items-center gap-1 text-[8px] text-white/80 bg-black/40 px-1.5 py-0.5 rounded">
                          <span>👥</span>
                          <span>{game.players}</span>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                        <h3 className="text-white font-bold text-[10px] truncate">{game.name}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Latest Bets */}
            <LatestRoundRace />
          </div>
          <Footer />
        </main>

    </div>
  );
};

export default GameDetailPage;
