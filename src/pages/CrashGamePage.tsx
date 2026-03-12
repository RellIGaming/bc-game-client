import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronDown, ChevronLeft, ChevronRight, Clock, TrendingUp, Settings, X, BarChart3, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Footer from "@/components/home/Footer";
import card2 from "@/assets/images/card-2.png";
import card3 from "@/assets/images/card-3.png";
import card4 from "@/assets/images/card-4.png";
import card5 from "@/assets/images/card-5.png";
import card6 from "@/assets/images/card-6.png";
import card7 from "@/assets/images/card-7.png";
import card8 from "@/assets/images/card-8.png";
import card9 from "@/assets/images/card-9.png";

// Mock round history
const roundHistory = [
  { id: "9051637", result: 1.35, color: "red" },
  { id: "9051636", result: 1.02, color: "red" },
  { id: "9051635", result: 2.55, color: "green" },
  { id: "9051634", result: 1.48, color: "red" },
  { id: "9051633", result: 10.59, color: "green" },
  { id: "9051632", result: 1.63, color: "red" },
  { id: "9051631", result: 2.89, color: "green" },
  { id: "9051630", result: 20.12, color: "green" },
  { id: "9051629", result: 1.00, color: "red" },
  { id: "9051628", result: 4.30, color: "green" },
];

// Mock players
const playersList = [
  { name: "Cpaajexyjuac", cashout: "1.11x", amount: "₹20,287.66", won: true },
  { name: "WandererPanda9220", cashout: "1.10x", amount: "₹3,688.66", won: true },
  { name: "Hidden", cashout: "2.09x", amount: "₹32,204.85", won: true },
  { name: "Hidden", cashout: "1.19x", amount: "₹2,165.85", won: true },
  { name: "Hidden", cashout: "1.44x", amount: "₹4,258.78", won: true },
  { name: "sultanansari8033", cashout: "2.01x", amount: "₹8,273.92", won: true },
  { name: "Yoafodwsrsac", cashout: "2.00x", amount: "₹6,613.67", won: true },
  { name: "Izbexdjtitac", cashout: "2.00x", amount: "₹5,768.72", won: true },
  { name: "Chixom", cashout: "1.83x", amount: "₹4,391.47", won: true },
  { name: "VastFiord543209", cashout: "-", amount: "₹5,120.00", won: false },
  { name: "Be carefull", cashout: "2.64x", amount: "₹7,562.47", won: true },
  { name: "AsimovBound", cashout: "1.01x", amount: "₹42.87", won: true },
  { name: "Layp1123", cashout: "1.49x", amount: "₹1,834.99", won: true },
  { name: "Hidden", cashout: "2.12x", amount: "₹4,183.97", won: true },
  { name: "Hidden", cashout: "-", amount: "₹3,735.69", won: false },
];

// Trenball players
const trenballPlayers = [
  { name: "Elivu", bet: "₹10,924.04", team: "red" },
  { name: "Hidden", bet: "₹9,857.79", team: "red" },
  { name: "Mayla...", bet: "₹16,000.00", team: "green" },
  { name: "MD Ali...", bet: "₹2,763.39", team: "red" },
  { name: "Mayla...", bet: "₹16,000.00", team: "green" },
  { name: "Samu...", bet: "₹3,322.37", team: "red" },
  { name: "Hidden", bet: "₹4,852.23", team: "green" },
  { name: "B.2m...", bet: "₹1,888.59", team: "red" },
  { name: "Hidden", bet: "₹2,299.26", team: "green" },
];

// Betting strategies
const strategies = [
  { name: "Classic Strategy", author: "Coco_o", followers: 134058, type: "Martingale", multiplier: "3X", roi: "+62.62%", profit: "833.87% USDT", aum: "145,934M USDT" },
  { name: "Trenball Red", author: "Coco_o", followers: 38040, type: "Martingale", tag: "Red", roi: "+30.66%", profit: "78.62% USDT", aum: "29M USDT" },
  { name: "Trenball Green", author: "Coco_o", followers: 22787, type: "Martingale", tag: "Green", roi: "+24.44%", profit: "-21.86% USDT", aum: "4.39M USDT" },
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

const latestBetData = [
  { id: "185921616488", amount: "₹31.11", multiplier: "0.4106x", profit: "-₹18.73", isLoss: true },
  { id: "185921533841", amount: "₹546.22", multiplier: "0.3649x", profit: "-₹346.72", isLoss: true },
  { id: "185921324634", amount: "₹92.21", multiplier: "0x", profit: "-₹92.21", isLoss: true },
  { id: "185921292945", amount: "₹5.46", multiplier: "0x", profit: "-₹5.46", isLoss: true },
  { id: "185921204824", amount: "₹92.21", multiplier: "0.3999x", profit: "-₹55.32", isLoss: true },
  { id: "185921242430", amount: "₹17,891.03", multiplier: "2.335x", profit: "+₹18,942.44", isLoss: false },
];

interface CrashGamePageProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const CrashGamePage = ({ isLoggedIn, setIsLoggedIn }: CrashGamePageProps) => {
  const [currentMultiplier, setCurrentMultiplier] = useState(1.02);
  const [gameStatus, setGameStatus] = useState<"running" | "crashed" | "waiting">("running");
  const [betMode, setBetMode] = useState<"manual" | "auto">("manual");
  const [betAmount, setBetAmount] = useState("0");
  const [autoCashout, setAutoCashout] = useState("100");
  const [rightTab, setRightTab] = useState<"classic" | "trenball" | "strategy">("classic");
  const [showHistory, setShowHistory] = useState(false);
  const [showTrend, setShowTrend] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [historyTab, setHistoryTab] = useState<"history" | "analysis">("history");
  const [betTab, setBetTab] = useState("my bets");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simple crash chart animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const y = (h / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Crash line
      ctx.strokeStyle = gameStatus === "crashed" ? "#ef4444" : "#22c55e";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(40, h - 40);

      const progress = Math.min((currentMultiplier - 1) / 2, 1);
      const endX = 40 + (w - 80) * progress;
      const endY = h - 40 - (h - 80) * progress * 0.8;

      // Curved line
      const cpX = endX * 0.6;
      const cpY = h - 40;
      ctx.quadraticCurveTo(cpX, cpY, endX, endY);
      ctx.stroke();

      // Dot at end
      ctx.fillStyle = gameStatus === "crashed" ? "#ef4444" : "#22c55e";
      ctx.beginPath();
      ctx.arc(endX, endY, 5, 0, Math.PI * 2);
      ctx.fill();

      // Labels
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.font = "11px sans-serif";
      ctx.fillText("0s", 40, h - 20);
      ctx.fillText("2s", w * 0.25, h - 20);
      ctx.fillText("4s", w * 0.5, h - 20);
      ctx.fillText("6s", w * 0.75, h - 20);

      ctx.fillText("1.0×", 0, h - 45);
      ctx.fillText("1.4×", 0, h * 0.5);
      ctx.fillText("1.8×", 0, h * 0.2);
    };

    draw();
  }, [currentMultiplier, gameStatus]);

  // Simulate multiplier going up
  useEffect(() => {
    if (gameStatus !== "running") return;
    const interval = setInterval(() => {
      setCurrentMultiplier(prev => {
        const newVal = prev + 0.01;
        if (newVal > 2.5) {
          setGameStatus("crashed");
          return newVal;
        }
        return newVal;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [gameStatus]);

  return (
    <div className="space-y-4">
      <div className="px-2 lg:px-6 py-2 lg:py-4 space-y-4">
        {/* Main Game Layout */}
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Left: Game Area */}
          <div className="flex-1 space-y-3">
            {/* Round History Bar */}
            <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar pb-1">
              {roundHistory.map((round) => (
                <button
                  key={round.id}
                  className="flex-shrink-0 flex flex-col items-center px-2 py-1 rounded-lg hover:bg-secondary transition-colors"
                >
                  <span className="text-[10px] text-muted-foreground">{round.id}</span>
                  <span className={cn(
                    "text-xs font-bold",
                    round.result >= 2 ? "text-primary" : "text-destructive"
                  )}>
                    {round.result}×
                  </span>
                </button>
              ))}
              <div className="flex items-center gap-1 ml-auto flex-shrink-0">
                <button onClick={() => setShowHistory(true)} className="p-1.5 rounded-lg hover:bg-secondary">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </button>
                <button onClick={() => setShowTrend(true)} className="p-1.5 rounded-lg hover:bg-secondary">
                  <BarChart3 className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Chart Area */}
            <div className="relative bg-card rounded-xl overflow-hidden">
              <canvas
                ref={canvasRef}
                width={600}
                height={300}
                className="w-full h-[200px] sm:h-[280px] lg:h-[340px]"
              />

              {/* Multiplier Display */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <span className={cn(
                    "text-4xl sm:text-5xl lg:text-6xl font-bold",
                    gameStatus === "crashed" ? "text-destructive" : "text-primary"
                  )}>
                    {currentMultiplier.toFixed(2)}×
                  </span>
                  {gameStatus === "crashed" && (
                    <p className="text-destructive text-sm mt-1">Crashed</p>
                  )}
                </div>
              </div>

              {/* Network Status */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-muted-foreground">
                Network Status <span className="text-primary">📶</span>
              </div>
            </div>

            {/* Bet Controls */}
            <div className="bg-card rounded-xl p-3 sm:p-4 space-y-3">
              {/* Manual / Auto Toggle */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setBetMode("manual")}
                  className={cn("text-sm font-semibold pb-1 border-b-2 transition-colors",
                    betMode === "manual" ? "text-foreground border-primary" : "text-muted-foreground border-transparent"
                  )}
                >
                  Manual
                </button>
                <button
                  onClick={() => setBetMode("auto")}
                  className={cn("text-sm font-semibold pb-1 border-b-2 transition-colors",
                    betMode === "auto" ? "text-foreground border-primary" : "text-muted-foreground border-transparent"
                  )}
                >
                  Auto
                </button>
              </div>

              {/* Bet Button */}
              <Button
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-bold"
                onClick={() => {
                  if (gameStatus === "crashed") {
                    setGameStatus("running");
                    setCurrentMultiplier(1.0);
                  }
                }}
              >
                {gameStatus === "crashed" ? "Bet (Next Round)" : "Bet (Next Round)"}
              </Button>

              {/* Amount & Auto Cashout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span className="flex items-center gap-1">
                      <span className="text-destructive">⚠</span> Amount
                    </span>
                    <span>≈0.00015MATIC</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex-1 flex items-center bg-secondary rounded-lg px-3 py-2">
                      <span className="text-destructive mr-2">●</span>
                      <input
                        type="text"
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                        className="bg-transparent text-foreground text-sm w-full outline-none"
                      />
                    </div>
                    <button className="px-2 py-2 bg-secondary rounded-lg text-xs text-foreground hover:bg-secondary/80">1/2</button>
                    <button className="px-2 py-2 bg-secondary rounded-lg text-xs text-foreground hover:bg-secondary/80">2×</button>
                    <button className="p-2 bg-secondary rounded-lg hover:bg-secondary/80">
                      <ChevronDown className="w-3 h-3 text-muted-foreground" />
                    </button>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Auto cash out</span>
                    <span>Chance 0.99%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex-1 flex items-center bg-secondary rounded-lg px-3 py-2">
                      <input
                        type="text"
                        value={autoCashout}
                        onChange={(e) => setAutoCashout(e.target.value)}
                        className="bg-transparent text-foreground text-sm w-full outline-none"
                      />
                    </div>
                    <button className="px-2 py-2 bg-secondary rounded-lg text-xs text-muted-foreground">×</button>
                    <button className="p-2 bg-secondary rounded-lg hover:bg-secondary/80">
                      <ChevronLeft className="w-3 h-3 text-muted-foreground" />
                    </button>
                    <button className="p-2 bg-secondary rounded-lg hover:bg-secondary/80">
                      <ChevronRight className="w-3 h-3 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Amounts */}
              <div className="flex gap-1.5 flex-wrap">
                {["10", "100", "1.0k", "10.0k"].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setBetAmount(amt)}
                    className="px-3 py-1.5 bg-secondary rounded-lg text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {amt}
                  </button>
                ))}
                <div className="flex-1" />
                {["1.01", "2", "10", "100"].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAutoCashout(amt)}
                    className="px-3 py-1.5 bg-secondary rounded-lg text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {amt}
                  </button>
                ))}
              </div>

              {/* Settings */}
              <button
                onClick={() => setShowSettings(true)}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Settings
                <span className="text-xs px-1.5 py-0.5 bg-primary/20 text-primary rounded">New</span>
              </button>
            </div>

            {/* Game Stats Bar */}
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <span>⚙️</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>234671</span>
              </div>
              <span>📊</span>
              <span>🖥</span>
            </div>

            {/* Game Title */}
            <div className="bg-card rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-lg font-bold text-foreground">Crash</h1>
                  <p className="text-sm text-primary">By BC Originals</p>
                </div>
                <div className="flex items-center gap-2 text-xs flex-wrap justify-end">
                  <span className="px-2 py-1 bg-secondary rounded-full text-primary hover:bg-primary/10 cursor-pointer"># BC Originals</span>
                  <span className="px-2 py-1 bg-secondary rounded-full text-primary hover:bg-primary/10 cursor-pointer"># Crash games</span>
                  <span className="px-2 py-1 bg-secondary rounded-full text-primary hover:bg-primary/10 cursor-pointer"># Burst Games</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Players Panel */}
          <div className="w-full lg:w-[340px] xl:w-[380px] space-y-3">
            {/* Tabs */}
            <div className="bg-card rounded-xl overflow-hidden">
              <div className="flex border-b border-border">
                {(["classic", "trenball", "strategy"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setRightTab(tab)}
                    className={cn(
                      "flex-1 py-3 text-sm font-medium transition-colors capitalize",
                      rightTab === tab
                        ? "text-foreground border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab === "strategy" ? "Betting Strategy" : tab === "trenball" ? "Trenball" : "Classic"}
                  </button>
                ))}
              </div>

              {/* Classic Tab */}
              {rightTab === "classic" && (
                <div className="p-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">●</span>
                      <span className="text-sm font-semibold">445/1539 Players</span>
                    </div>
                    <span className="text-sm font-bold text-foreground">₹669,441.24</span>
                  </div>

                  <div className="grid grid-cols-3 text-xs text-muted-foreground mb-2 px-1">
                    <span>Player</span>
                    <span className="text-center">Cashout</span>
                    <span className="text-right">Amount</span>
                  </div>

                  <div className="space-y-0.5 max-h-[400px] overflow-y-auto custom-scrollbar">
                    {playersList.map((player, i) => (
                      <div key={i} className="grid grid-cols-3 items-center py-2 px-1 hover:bg-secondary/30 rounded text-xs">
                        <span className="text-foreground truncate">{player.name}</span>
                        <span className={cn("text-center", player.won ? "text-primary" : "text-muted-foreground")}>
                          {player.cashout}
                        </span>
                        <span className={cn("text-right font-medium", player.won ? "text-primary" : "text-muted-foreground")}>
                          {player.won && "● "}{player.amount}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-2 py-2 text-xs text-muted-foreground hover:text-foreground text-center">
                    Show More
                  </button>
                </div>
              )}

              {/* Trenball Tab */}
              {rightTab === "trenball" && (
                <div className="p-3">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center text-2xl">🐻</div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-muted-foreground">↑ 992</span>
                        <span className="text-[10px] bg-destructive/20 text-destructive px-1 rounded">₹86,657.08</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl">🐂</div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-muted-foreground">↑ 347</span>
                        <span className="text-[10px] bg-primary/20 text-primary px-1 rounded">₹107,324.58</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="grid grid-cols-2 text-muted-foreground mb-1 px-1">
                        <span>Player</span>
                        <span className="text-right">Bet</span>
                      </div>
                      {trenballPlayers.filter(p => p.team === "red").map((p, i) => (
                        <div key={i} className="grid grid-cols-2 py-1.5 px-1 hover:bg-secondary/30 rounded">
                          <span className="text-foreground truncate">{p.name}</span>
                          <span className="text-right text-foreground">{p.bet}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="grid grid-cols-2 text-muted-foreground mb-1 px-1">
                        <span>Player</span>
                        <span className="text-right">Bet</span>
                      </div>
                      {trenballPlayers.filter(p => p.team === "green").map((p, i) => (
                        <div key={i} className="grid grid-cols-2 py-1.5 px-1 hover:bg-secondary/30 rounded">
                          <span className="text-foreground truncate">{p.name}</span>
                          <span className="text-right text-foreground">{p.bet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Betting Strategy Tab */}
              {rightTab === "strategy" && (
                <div className="p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Top Strategies</h3>
                    <button className="text-xs text-primary">ℹ How it works?</button>
                  </div>

                  {strategies.map((s, i) => (
                    <div key={i} className="bg-secondary rounded-xl p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm">🎯</div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{s.author} ● {s.name}</p>
                          <p className="text-xs text-muted-foreground">↑ {s.followers.toLocaleString()} followed</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {s.multiplier && <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">{s.multiplier}</span>}
                        <span className="text-xs bg-secondary px-1.5 py-0.5 rounded text-muted-foreground">{s.type}</span>
                        {s.tag && <span className={cn("text-xs px-1.5 py-0.5 rounded", s.tag === "Red" ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary")}>{s.tag}</span>}
                      </div>
                      <p className="text-lg font-bold text-primary">{s.roi} <span className="text-xs text-muted-foreground font-normal">ROI ⓘ</span></p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Total Profit</span>
                        <span>{s.profit}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>AUM ⓘ</span>
                        <span>{s.aum}</span>
                      </div>
                      <Button variant="outline" className="w-full h-9 text-sm">Copy</Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
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
              <div key={game.id} className="flex-shrink-0 w-[100px] sm:w-[120px] rounded-xl overflow-hidden cursor-pointer group relative">
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
              {["My Bets", "History", "High Roller", "Wager Contest"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setBetTab(tab.toLowerCase())}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap",
                    betTab === tab.toLowerCase() ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab}
                </button>
              ))}
              <span className="text-xs text-muted-foreground ml-1">20 ›</span>
            </div>
          </div>

          {betTab === "my bets" ? (
            <div className="p-8 text-center">
              <div className="text-4xl mb-3">🐱</div>
              <p className="text-sm text-muted-foreground">Stay tuned—something's coming!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b border-border text-xs">
                    <th className="text-left py-2 px-4 font-medium">Bet ID</th>
                    <th className="text-right py-2 px-4 font-medium">Bet Amount</th>
                    <th className="text-right py-2 px-4 font-medium">Multiplier</th>
                    <th className="text-right py-2 px-4 font-medium">Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {latestBetData.map((bet, i) => (
                    <tr key={i} className="border-b border-border/30 hover:bg-secondary/30">
                      <td className="py-2.5 px-4 text-foreground text-xs font-mono">{bet.id}</td>
                      <td className="py-2.5 px-4 text-right text-foreground text-xs">{bet.amount}</td>
                      <td className="py-2.5 px-4 text-right text-muted-foreground text-xs">{bet.multiplier}</td>
                      <td className={cn("py-2.5 px-4 text-right text-xs", bet.isLoss ? "text-destructive" : "text-primary")}>{bet.profit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* History Modal */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setShowHistory(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">History</h3>
                <button onClick={() => setShowHistory(false)} className="p-1 rounded-full hover:bg-secondary">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="flex border-b border-border">
                <button
                  onClick={() => setHistoryTab("history")}
                  className={cn("flex-1 py-3 text-sm font-medium", historyTab === "history" ? "text-foreground border-b-2 border-primary" : "text-muted-foreground")}
                >
                  History
                </button>
                <button
                  onClick={() => setHistoryTab("analysis")}
                  className={cn("flex-1 py-3 text-sm font-medium", historyTab === "analysis" ? "text-foreground border-b-2 border-primary" : "text-muted-foreground")}
                >
                  Analysis
                </button>
              </div>

              {historyTab === "history" ? (
                <div className="p-3 space-y-1 max-h-[400px] overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-3 text-xs text-muted-foreground px-2 py-2">
                    <span>Game ID</span>
                    <span className="text-center">Result</span>
                    <span className="text-right">Hash</span>
                  </div>
                  {roundHistory.map((r) => (
                    <div key={r.id} className="grid grid-cols-3 items-center py-2 px-2 hover:bg-secondary/30 rounded">
                      <span className="flex items-center gap-2">
                        <span className={cn("w-2 h-2 rounded-full", r.result >= 2 ? "bg-primary" : "bg-destructive")} />
                        <span className="text-sm text-foreground">{r.id}</span>
                      </span>
                      <span className={cn(
                        "text-center text-sm font-bold px-2 py-0.5 rounded",
                        r.result >= 2 ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive"
                      )}>
                        {r.result}×
                      </span>
                      <span className="text-right text-xs text-muted-foreground font-mono truncate">
                        {Math.random().toString(36).substring(2, 10)}...
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Last 2000 issue, payout &lt;</span>
                    <span className="bg-secondary px-2 py-1 rounded text-foreground">2</span>
                    <button className="px-3 py-1 bg-secondary rounded text-foreground text-sm">Analysis</button>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-muted-foreground text-xs">
                        <th className="text-left py-2">Range</th>
                        <th className="text-center py-2">Chance</th>
                        <th className="text-center py-2">Count</th>
                        <th className="text-right py-2">Max Combo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-border">
                        <td className="py-2 text-foreground">[1, 2)</td>
                        <td className="py-2 text-center text-foreground">51.65%</td>
                        <td className="py-2 text-center text-foreground">1033</td>
                        <td className="py-2 text-right text-foreground">10</td>
                      </tr>
                      <tr className="border-t border-border">
                        <td className="py-2 text-foreground">[2, ∞)</td>
                        <td className="py-2 text-center text-foreground">48.35%</td>
                        <td className="py-2 text-center text-foreground">967</td>
                        <td className="py-2 text-right text-foreground">10</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex items-center gap-2">
                    <button className="flex-1 py-2 bg-secondary rounded-lg text-sm text-foreground">[1, 2)</button>
                    <button className="flex-1 py-2 bg-secondary rounded-lg text-sm text-muted-foreground">[2, ∞)</button>
                    <div className="flex gap-1">
                      <button className="p-2 bg-secondary rounded-lg"><ChevronLeft className="w-4 h-4 text-muted-foreground" /></button>
                      <button className="p-2 bg-secondary rounded-lg"><ChevronRight className="w-4 h-4 text-muted-foreground" /></button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trend Modal */}
      <AnimatePresence>
        {showTrend && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setShowTrend(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-xl w-full max-w-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Trend</h3>
                <button onClick={() => setShowTrend(false)} className="p-1 rounded-full hover:bg-secondary">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              {/* Trend dots grid */}
              <div className="grid grid-cols-10 gap-1.5 mb-4">
                {Array.from({ length: 40 }).map((_, i) => {
                  const isGreen = Math.random() > 0.4;
                  const isOrange = !isGreen && Math.random() > 0.5;
                  return (
                    <div
                      key={i}
                      className={cn(
                        "w-5 h-5 rounded-full",
                        i < 25
                          ? isGreen ? "bg-primary" : isOrange ? "bg-orange-500" : "bg-destructive"
                          : "bg-secondary"
                      )}
                    />
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="text-destructive">⚠</span> Understanding Trend Chart
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-xl w-full max-w-md overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Settings</h3>
                <button onClick={() => setShowSettings(false)} className="p-1 rounded-full hover:bg-secondary">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <div className="p-4 space-y-4">
                {/* Main Bet */}
                <div className="bg-secondary rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground">✓</div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Main Bet</p>
                      <p className="text-xs text-muted-foreground">Default <span className="text-primary">(always on)</span></p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Auto cash out</span>
                    <span>Chance 0.99%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex-1 bg-card rounded-lg px-3 py-2 text-sm text-foreground">100</div>
                    <button className="px-2 py-2 bg-card rounded-lg text-xs text-muted-foreground">×</button>
                    <button className="p-2 bg-card rounded-lg"><ChevronLeft className="w-3 h-3 text-muted-foreground" /></button>
                    <button className="p-2 bg-card rounded-lg"><ChevronRight className="w-3 h-3 text-muted-foreground" /></button>
                  </div>
                  <div className="flex gap-1.5">
                    {["1.01", "2", "10", "100"].map(v => (
                      <button key={v} className="flex-1 py-1.5 bg-card rounded-lg text-xs text-foreground hover:bg-secondary/80">{v}</button>
                    ))}
                  </div>
                </div>

                {/* Side Bet */}
                <div className="bg-secondary rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded border border-border" />
                    <p className="text-sm font-semibold text-foreground">Side Bet</p>
                  </div>
                </div>

                {/* Red and Green */}
                <div className="bg-secondary rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded border border-border" />
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-orange-500" />
                      <span className="w-3 h-3 rounded-full bg-primary" />
                      <p className="text-sm font-semibold text-foreground">Red and Green</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground ml-7">Red: Crash &lt; 2, win 1.96× payout</p>
                  <p className="text-xs text-muted-foreground ml-7">Green: Crash ≥ 2, win 2× payout</p>
                </div>

                {/* Bet Moon */}
                <div className="bg-secondary rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded border border-border" />
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-yellow-500" />
                      <p className="text-sm font-semibold text-foreground">Bet Moon</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground ml-7">Crash ≥ 10, win 10× payout</p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setShowSettings(false)}>Cancel</Button>
                  <Button className="flex-1 bg-primary text-primary-foreground" onClick={() => setShowSettings(false)}>Confirm</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default CrashGamePage;
