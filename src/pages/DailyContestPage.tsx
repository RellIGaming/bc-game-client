import { useState, useEffect } from "react";
import { X, HelpCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const leaderboardData = [
  { rank: 1, player: "Highlanderrr", wager: "₹393,085.88K", prize: "₹221,448.21 (50%)", medal: "🥇" },
  { rank: 2, player: "SH4NERonKic", wager: "₹84,812,001.06", prize: "₹110,724.10 (25%)", medal: "🥈" },
  { rank: 3, player: "Hidden", wager: "₹51,402,993.44", prize: "₹53,147.57 (12%)", medal: "🥉" },
  { rank: 4, player: "Xawblcfjmqoc", wager: "₹27,392,874.39", prize: "₹26,573.78 (6%)", hideRank: false },
  { rank: 5, player: "Kontrolleur", wager: "₹21,511,800.32", prize: "₹13,286.89 (3%)", hideRank: false },
  { rank: 6, player: "Hidden", wager: "₹20,693,167.62", prize: "₹6,643.44 (1.5%)", hideRank: false },
  { rank: 7, player: "Col Blackjack", wager: "₹20,048,083.08", prize: "₹3,986.06 (0.9%)", hideRank: false },
  { rank: 8, player: "Adamir", wager: "₹19,063,856.19", prize: "₹3,100.27 (0.7%)", hideRank: false },
  { rank: 9, player: "Qekyegtplwcc", wager: "₹13,119,817.17", prize: "₹2,214.48 (0.5%)", hideRank: false },
  { rank: 10, player: "Hidden", wager: "₹12,424,242.13", prize: "₹1,771.58 (0.4%)", hideRank: false },
];

const historyData = [
  { rank: 1, player: "Hidden", wager: "₹992,457.71K", prize: "₹3,132.16K (50%)", medal: "🥇" },
  { rank: 2, player: "Highlanderrr", wager: "₹718,213.71K", prize: "₹1,566.08K (25%)", medal: "🥈" },
  { rank: 3, player: "Bigtekingrand", wager: "₹491,010.66K", prize: "₹751.72K (12%)", medal: "🥉" },
  { rank: 4, player: "Hidden", wager: "₹434,722.07K", prize: "₹375.86K (6%)" },
  { rank: 5, player: "SH4NERonKic", wager: "₹354,864.72K", prize: "₹187.93K (3%)" },
  { rank: 6, player: "Gerx", wager: "₹288,041.04K", prize: "₹93.96K (1.5%)" },
  { rank: 7, player: "Hani01", wager: "₹271,821.91K", prize: "₹56.37K (0.9%)" },
  { rank: 8, player: "stikyhefno1", wager: "₹198,132.51K", prize: "₹43.85K (0.7%)" },
  { rank: 9, player: "buckmastterflex", wager: "₹152,178.48K", prize: "₹31.32K (0.5%)" },
  { rank: 10, player: "Adamir", wager: "₹131,333.81K", prize: "₹25.05K (0.4%)" },
];

const rulesContent = [
  "The contest prize pool closely depends on the bankroll, the more players bet the bigger it grows. Current prize pool will be showed on the Contest page.",
  "10 most wagering players carve up the prize pool.",
  "This Contest support wagering in:",
];

const rulesCurrencies = [
  "MATIC, COP, APT, UAH, IOTX, SHIB, KES, RAY, NEAR, WLD, HNT, FDUSD, FLOOR, GNF, DGB, BCD",
  "BSV, BCH, SUI, CAKE, POL, PYUSD, BTCB, TRY, GMT, BTC, TWT, ARB, GMX, TWD, XAF, A",
  "BC, ZAR, JTO, ONE, NPR, RLUSD, SUSHI, ALGO, KRW, PUMP, SC, BIGTIME, WBTC, S, CFX, XPL",
  "SAMO, KUMA, KGS, JUP, MANA, ARS, VTHO, WLFI, ICP, BLUR, RWF, ZEC, STRK, ADA, ICX, PAR",
  "DOGE, HBAR, RVN, NANO, WAVES, VND, CHZ, XRP, FLOKI, EGP, LINEA, AZN, JPY, MYR, KAVA, SAND",
  "AVC, BBTC, PEN, TUSD, ENA, BOME, cbBTC, KHR, THETA, VSYS, ENJ, AED, TND, JMD, NEXO, TFUEL",
  "LUNA, AAVE, EURS, NGN, UNI, MDL, JitoSOL, NOK, PHP, GD, YFI, XTZ, HYPE, ELON, GM, INR",
];

const DailyContestPage = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 5, seconds: 2 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-6 space-y-6">
        {/* Hero Section */}
        <div className="bg-card b-radius p-5 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            {/* Prize Pool */}
            <div className="flex items-center gap-3">
              <div className="text-4xl">🏆</div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <span className="text-yellow-400">🎉</span> Daily Contest <span className="text-yellow-400">🎉</span>
                </p>
                <p className="text-xs text-muted-foreground">Contest prize pool</p>
                <p className="text-xl sm:text-2xl font-bold text-accent">4,938.73 BCD</p>
              </div>
            </div>
            {/* Timer */}
            <div className="text-center">
              <p className="text-sm font-medium text-primary italic">Time Remaining</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <div className="bg-secondary b-radius px-3 py-2 text-center">
                  <p className="text-xl font-bold">{pad(timeLeft.hours)}</p>
                  <p className="text-[10px] text-muted-foreground">Hour</p>
                </div>
                <span className="text-lg font-bold">:</span>
                <div className="bg-secondary b-radius px-3 py-2 text-center">
                  <p className="text-xl font-bold">{pad(timeLeft.minutes)}</p>
                  <p className="text-[10px] text-muted-foreground">Minute</p>
                </div>
                <span className="text-lg font-bold">:</span>
                <div className="bg-secondary b-radius px-3 py-2 text-center">
                  <p className="text-xl font-bold">{pad(timeLeft.seconds)}</p>
                  <p className="text-[10px] text-muted-foreground">Second</p>
                </div>
              </div>
            </div>
            {/* Winner */}
            <div className="text-center sm:text-right relative">
              <button
                onClick={() => setShowRules(true)}
                className="absolute top-0 right-0 text-muted-foreground hover:text-foreground"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              <p className="text-xs text-yellow-400 font-bold">Winner</p>
              <p className="text-sm font-medium">Last Champion</p>
              <div className="flex items-center justify-center sm:justify-end gap-2 mt-1">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-lg">👤</div>
                <div className="text-left">
                  <p className="text-sm font-medium">Hidden</p>
                  <p className="text-xs text-muted-foreground">Profit (50%)</p>
                  <p className="text-xs text-accent">₹3,132,168.05</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Position */}
        <div className="bg-card b-radius p-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">👤</div>
            <span className="text-sm font-medium">jkhatun258</span>
          </div>
          <div className="flex gap-8 text-center">
            <div>
              <p className="text-xs text-muted-foreground">My Position</p>
              <p className="text-lg font-bold">50th+</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Wager</p>
              <p className="text-lg font-bold text-accent">₹0.00</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Wager <span className="text-foreground">₹12,424,242.13</span> To reach{" "}
            <span className="bg-secondary px-2 py-0.5 b-radius text-xs font-medium">Top 10</span>
          </p>
        </div>

        {/* Leaderboard */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 b-radius">⚙️ Active</span>
              <span className="text-sm font-medium">2/7/2026 – 2/8/2026</span>
            </div>
            <button
              onClick={() => setShowHistory(true)}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              History <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Table */}
          <div className="bg-card b-radius overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left p-3 font-medium">#</th>
                  <th className="text-left p-3 font-medium">Player</th>
                  <th className="text-left p-3 font-medium">Wager</th>
                  <th className="text-right p-3 font-medium">Prize</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((row, i) => (
                  <tr
                    key={i}
                    className={cn(
                      "border-b border-border/50 transition-colors hover:bg-secondary/50",
                      i % 2 === 0 ? "bg-card" : "bg-secondary/20"
                    )}
                  >
                    <td className="p-3">
                      {row.medal ? <span className="text-lg">{row.medal}</span> : <span className="text-muted-foreground">{row.rank}th</span>}
                    </td>
                    <td className="p-3 font-medium">{row.player}</td>
                    <td className="p-3 text-accent">{row.wager}</td>
                    <td className="p-3 text-right text-accent">{row.prize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* History Modal */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="p-0 max-w-lg max-h-[85vh] flex flex-col">
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b bg-background">
            <h3 className="font-bold">2/6/2026 – 2/7/2026</h3>
            <button onClick={() => setShowHistory(false)}>
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left p-3 font-medium">#</th>
                  <th className="text-left p-3 font-medium">Player</th>
                  <th className="text-left p-3 font-medium">Wager</th>
                  <th className="text-right p-3 font-medium">Prize</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((row, i) => (
                  <tr
                    key={i}
                    className={cn(
                      "border-b border-border/50",
                      i % 2 === 0 ? "bg-card" : "bg-secondary/20"
                    )}
                  >
                    <td className="p-3">
                      {row.medal ? <span className="text-lg">{row.medal}</span> : <span className="text-muted-foreground">{row.rank}th</span>}
                    </td>
                    <td className="p-3 font-medium">{row.player}</td>
                    <td className="p-3 text-accent">{row.wager}</td>
                    <td className="p-3 text-right text-accent">{row.prize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>

      {/* Rules Modal */}
      <Dialog open={showRules} onOpenChange={setShowRules}>
        <DialogContent className="p-0 max-w-md max-h-[85vh] flex flex-col">
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b bg-background">
            <h3 className="font-bold">Rules</h3>
            <button onClick={() => setShowRules(false)}>
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div>
              <h4 className="font-bold text-sm italic">Rules-Daily Wagering Contest</h4>
              <p className="text-xs text-muted-foreground">2/7/2026 – 2/8/2026</p>
            </div>
            <ol className="space-y-3 text-sm text-muted-foreground list-decimal pl-4">
              {rulesContent.map((rule, i) => (
                <li key={i}>{rule}</li>
              ))}
            </ol>
            <div className="space-y-2 pl-6">
              {rulesCurrencies.map((group, i) => (
                <p key={i} className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{String.fromCharCode(97 + i)}.</span> {group}
                </p>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DailyContestPage;
