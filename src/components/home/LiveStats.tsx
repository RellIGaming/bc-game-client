import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { FileText, Vault, Ticket, ExternalLink, Info, TrendingDown, TrendingUp, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import LanguageCurrencyModal from "@/components/layout/LanguageCurrencyModal";
import Blogo from "../../assets/images/logo.png";
// Mock chart data
const chartData = [
  { time: "6", price: 0.00073 },
  { time: "8", price: 0.000725 },
  { time: "10", price: 0.00072 },
  { time: "12", price: 0.000718 },
  { time: "14", price: 0.000715 },
  { time: "16", price: 0.00072 },
  { time: "18", price: 0.000735 },
  { time: "20", price: 0.000742 },
  { time: "22", price: 0.000731 },
];

// Mock bets data
const allBets = [
  { game: "FORTUNE GEMS 2", player: "ptPhilid6", betAmount: 6.60, currency: "USDT", multiplier: "0.00x", profit: -6.60, isWin: false },
  { game: "LIMBO", player: "Omahoc", betAmount: 13.14, currency: "USDT", multiplier: "1.24x", profit: 3.30, isWin: true },
  { game: "KENO", player: "ChampionIM", betAmount: 0.35, currency: "USDT", multiplier: "0.00x", profit: -0.35, isWin: false },
  { game: "ULTIMATE DICE", player: "Maredo", betAmount: 0.18, currency: "USDT", multiplier: "1.00x", profit: 0.01, isWin: true },
  { game: "CAVE OF PLUNDER", player: "***", betAmount: 12.77, currency: "USDT", multiplier: "4.00x", profit: 41.32, isWin: true },
  { game: "CLASSIC DICE", player: "***", betAmount: 68.95, currency: "USDT", multiplier: "0.00x", profit: -68.95, isWin: false },
  { game: "FORTUNE GEMS 2", player: "ptPhilid6", betAmount: 6.60, currency: "USDT", multiplier: "0.00x", profit: -6.60, isWin: false },
  { game: "BEAUTIES", player: "NgBaycamp3", betAmount: 5.12, currency: "USDT", multiplier: "0.00x", profit: -1.02, isWin: false },
];

const LiveStats = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [timeRange, setTimeRange] = useState("1H");

  const tokenStats = {
    price: "$0.00731",
    change: "+0.77%",
    marketCap: "$29.1M",
    holders: "10,308",
    circulatingSupply: "2,542,200,432.01 BC",
    circulatingPercent: "25.422%",
    maxSupply: "10,000,000,000 BC",
    locked: "72%",
    lockedAmount: "7,200,000,000 BC",
  };

  const platformStats = {
    totalWager: "$52,091,642.57",
    totalWagerLast24h: "Last 24h",
    online: "191,709",
    onlineLast24h: "Last 24h",
    bets: "6,537,763",
    betsLast24h: "Last 24h",
    winAmount: "$48,181,296.11",
    winAmountLast24h: "Last 24h",
  };

  return (
    <div className="min-h-screen bg-background">
    
      <main>
        <div className="p-4 lg:p-6 space-y-6">
          {/* Token Header Card */}
          <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                  <img src={Blogo} alt="logo" className="w-12 h-12 lg:w-16 lg:h-16"/>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl lg:text-2xl font-bold text-foreground">Rell Token</h1>
                    <span className="text-primary text-sm font-medium">{tokenStats.change}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-lg font-semibold text-foreground">{tokenStats.price}</span>
                    <span>24h Vol: $183.0k</span>
                    <span>Holders: {tokenStats.holders}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Button variant="outline" className="gap-2">
                  <Info className="w-4 h-4" />
                  What's BC
                </Button>
                <Button variant="outline" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Whitepaper
                </Button>
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <ExternalLink className="w-4 h-4" />
                  Contract
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-secondary/50 border border-border">
              <TabsTrigger value="overview" className="gap-2">
                <FileText className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="trade" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                Trade
              </TabsTrigger>
              <TabsTrigger value="vault" className="gap-2">
                <Vault className="w-4 h-4" />
                Vault Pro
              </TabsTrigger>
              <TabsTrigger value="lottery" className="gap-2">
                <Ticket className="w-4 h-4" />
                Lottery
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Price Chart */}
              <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">{tokenStats.price}</span>
                      <span className="text-sm text-primary">{tokenStats.change}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Market Cap: {tokenStats.marketCap} • Current Supply: TBN
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {["1H", "4H", "1D"].map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                          timeRange === range
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-64 lg:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                        domain={["dataMin - 0.00001", "dataMax + 0.00001"]}
                        tickFormatter={(value) => value.toFixed(5)}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`$${value.toFixed(6)}`, "Price"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fill="url(#colorPrice)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Token Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Token Supply Card */}
                <div className="bg-card border border-border rounded-lg p-4 col-span-1 md:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-secondary"
                          strokeWidth="3"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-primary"
                          strokeWidth="3"
                          strokeDasharray={`${25.422} 100`}
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-yellow-500"
                          strokeWidth="3"
                          strokeDasharray={`${72} 100`}
                          strokeDashoffset="-25.422"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-primary" />
                        <span className="text-muted-foreground">Circulating: {tokenStats.circulatingPercent}</span>
                      </div>
                      <div className="text-xs text-foreground">{tokenStats.circulatingSupply}</div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span className="text-muted-foreground">Locked: {tokenStats.locked}</span>
                      </div>
                      <div className="text-xs text-foreground">{tokenStats.lockedAmount}</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border text-center">
                    <span className="text-xs text-muted-foreground">Rellbet Supply (Max. Supply)</span>
                    <div className="text-lg font-bold text-foreground">{tokenStats.maxSupply}</div>
                  </div>
                </div>

                {/* Platform Stats Cards */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Total Wager
                  </div>
                  <div className="text-xl font-bold text-foreground">{platformStats.totalWager}</div>
                  <div className="text-xs text-muted-foreground">{platformStats.totalWagerLast24h}</div>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Online
                  </div>
                  <div className="text-xl font-bold text-foreground">{platformStats.online}</div>
                  <div className="text-xs text-muted-foreground">{platformStats.onlineLast24h}</div>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    Bets
                  </div>
                  <div className="text-xl font-bold text-foreground">{platformStats.bets}</div>
                  <div className="text-xs text-muted-foreground">{platformStats.betsLast24h}</div>
                </div>
              </div>

              {/* Win Amount Card */}
              <div className="bg-card border border-border rounded-l p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Win Amount
                </div>
                <div className="text-2xl font-bold text-primary">{platformStats.winAmount}</div>
                <div className="text-xs text-muted-foreground">{platformStats.winAmountLast24h}</div>
              </div>

              {/* Partner Logos */}
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12 text-muted-foreground">
                  {["SOLSCAN", "CoinMarketCap", "OKX", "CoinGecko", "GMGN"].map((partner) => (
                    <div key={partner} className="text-sm font-medium hover:text-foreground transition-colors cursor-pointer">
                      {partner}
                    </div>
                  ))}
                </div>
              </div>

              {/* All Bets Table */}
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">All Bets</h3>
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </div>
                  <button className="p-2 hover:bg-secondary/50 rounded-lg transition-colors">
                    <RefreshCw className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">GAME</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">PLAYER</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">BET AMOUNT</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">MULTIPLIER</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">PROFIT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allBets.map((bet, index) => (
                        <tr
                          key={index}
                          className={`border-b border-border hover:bg-secondary/30 transition-colors ${
                            index % 2 === 0 ? "bg-card" : "bg-secondary/20"
                          }`}
                        >
                          <td className="p-3 text-sm text-foreground">{bet.game}</td>
                          <td className="p-3 text-sm text-primary">{bet.player}</td>
                          <td className="p-3 text-sm text-foreground">
                            {bet.betAmount.toFixed(2)} <span className="text-xs text-muted-foreground">{bet.currency}</span>
                          </td>
                          <td className="p-3 text-sm text-foreground">{bet.multiplier}</td>
                          <td className={`p-3 text-sm flex items-center gap-1 ${bet.isWin ? "text-primary" : "text-destructive"}`}>
                            {bet.isWin ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {bet.profit > 0 ? "+" : ""}{bet.profit.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trade" className="mt-6">
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Trade Coming Soon</h3>
                <p className="text-muted-foreground">Trading features will be available soon.</p>
              </div>
            </TabsContent>

            <TabsContent value="vault" className="mt-6">
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <Vault className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Vault Pro</h3>
                <p className="text-muted-foreground">Secure vault features coming soon.</p>
              </div>
            </TabsContent>

            <TabsContent value="lottery" className="mt-6">
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <Ticket className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Lottery</h3>
                <p className="text-muted-foreground">Lottery features coming soon.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

    </div>
  );
};

export default LiveStats;
