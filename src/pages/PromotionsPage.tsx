import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DepositModal from "@/components/header/DepositModal";

const depositTiers = [
  { pct: "180%", label: "1st Deposit", min: "₹150.00" },
  { pct: "240%", label: "2nd Deposit Bonus", min: "₹300.00" },
  { pct: "300%", label: "3rd Deposit Bonus", min: "₹450.00" },
  { pct: "360%", label: "4th Deposit Bonus", min: "₹800.00" },
];

const promotionTabs = ["All", "Casino", "Sports", "Rellbet Exclusive"];

const promotionCards = [
  { title: "0 House Edge + Instant Rakeback", sub: "1,000,000,000 TOKENS UP FOR GRABS", ends: "Ends 3/1/2026, 5:29:59 AM", category: ["All", "Casino"], badge: "EXCLUSIVE" },
  { title: "Double The Spins", sub: "BET $10 - GET 20 FREE SPINS", ends: "Ends 2/10/2026, 9:29:59 PM", category: ["All", "Casino"], badge: "EXCLUSIVE" },
  { title: "Play Lightning Roulette", sub: "EXTRA ₹10 DAILY", ends: "Ends 2/9/2026, 9:29:59 PM", category: ["All", "Casino"], badge: null },
  { title: "IEM Kraków 2026", sub: "WAGER LEADERBOARD HONORS", ends: "Ends 2/9/2026, 5:29:59 AM", category: ["All", "Sports"], badge: null },
  { title: "IEM Kraków 2026 Cashdrop", sub: "CS DAILY CASH", ends: "Ends 2/9/2026, 5:29:59 AM", category: ["All", "Sports"], badge: null },
  { title: "Bet & Win", sub: "₹6,000,000", ends: "Ends 2/9/2026, 5:29:59 AM", category: ["All", "Casino"], badge: null },
  { title: "Platipus Network Tournament", sub: "SHARE €25000 PRIZE POOL", ends: "Ends 2/8/2026, 5:29:59 AM", category: ["All", "Rellbet Exclusive"], badge: null },
  { title: "BNG Prize Drop", sub: "$260,000 PRIZE POOL", ends: "Ends 4/2/2026, 9:29:59 AM", category: ["All", "Casino"], badge: null },
  { title: "Lucky Horse Cash Rain", sub: "€500,000", ends: "Ends 3/2/2026, 5:29:59 AM", category: ["All", "Casino"], badge: null },
  { title: "Sport Weekly Bonus", sub: "BET $500 AND GET UP TO $1000!", ends: "Ends 4/1/2026, 5:29:59 AM", category: ["All", "Sports"], badge: null },
];

const PromotionsPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [promoTab, setPromoTab] = useState("Latest Promotion");
  const [showBonusTnC, setShowBonusTnC] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);

  const filteredCards = promotionCards.filter((c) => c.category.includes(activeTab));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-1 sm:px-2 py-6 space-y-6">
        {/* Header Banner */}
        <div className="bg-card b-radius p-5 sm:p-6">
          <p className="text-sm text-muted-foreground">Promotion</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
            <div>
              <p className="text-muted-foreground text-sm">Great Deposit Bonus</p>
              <h1 className="text-2xl sm:text-3xl font-bold">Up TO 360% Bonus</h1>
              <div className="flex gap-2 mt-3">
                <button onClick={() => setShowDeposit(true)} className="bg-primary text-primary-foreground px-4 py-2 b-radius text-sm font-medium">
                  Deposit Now
                </button>
                <button onClick={() => setShowBonusTnC(true)} className="bg-secondary text-foreground px-4 py-2 b-radius text-sm font-medium hover:bg-muted">
                  More Details
                </button>
              </div>
            </div>
            {/* Deposit Tiers */}
            <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide">
              {depositTiers.map((tier, i) => (
                <div key={i} className="flex flex-col items-center shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 flex items-center justify-center">
                    <span className="text-lg sm:text-xl font-bold text-yellow-200">🏆</span>
                  </div>
                  <p className="text-sm font-bold text-primary mt-1">{tier.pct} Bonus</p>
                  <p className="text-[10px] text-muted-foreground">{i + 1}{["st", "nd", "rd", "th"][i]} Deposit</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Promotion Tabs */}
        <div className="flex gap-4 border-b border-border">
          {["Latest Promotion", "Archived"].map((tab) => (
            <button
              key={tab}
              onClick={() => setPromoTab(tab)}
              className={cn(
                "pb-2 text-sm font-medium border-b-2 transition-colors",
                promoTab === tab ? "border-primary text-foreground" : "border-transparent text-muted-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {promotionTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-1.5 text-sm b-radius font-medium shrink-0 transition-colors",
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCards.map((card, i) => (
            <div key={i} className="bg-card b-radius overflow-hidden group cursor-pointer hover:ring-1 hover:ring-primary/30 transition-all">
              {/* Card Image Placeholder */}
              <div className="relative h-36 sm:h-40 bg-gradient-to-br from-secondary to-card flex items-center justify-center">
                {card.badge && (
                  <span className="absolute top-2 right-2 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 b-radius">
                    {card.badge}
                  </span>
                )}
                <div className="text-center p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground">{card.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{card.sub}</p>
                  <button className="mt-3 bg-accent text-accent-foreground px-3 py-1 b-radius text-xs font-medium">
                    PLAY NOW
                  </button>
                </div>
              </div>
              {/* Card Info */}
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium truncate">{card.title}</p>
                  <p className="text-[10px] text-muted-foreground">{card.ends}</p>
                </div>
                <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 b-radius shrink-0">
                  In Progress
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deposit Modal */}
      <DepositModal open={showDeposit} onClose={() => setShowDeposit(false)} />

      {/* Bonus T&C Modal */}
      <Dialog open={showBonusTnC} onOpenChange={setShowBonusTnC}>
        <DialogContent className="p-0 max-w-md max-h-[85vh] flex flex-col">
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b bg-background">
            <h3 className="font-bold">Bonus T&C</h3>
            <button onClick={() => setShowBonusTnC(false)}>
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Deposit Tier Cards */}
            <div className="grid grid-cols-2 gap-3">
              {depositTiers.map((tier, i) => (
                <div key={i} className="bg-card b-radius p-3 border border-border">
                  <p className="text-xs text-muted-foreground">{tier.label}</p>
                  <p className="text-2xl font-bold text-primary">{tier.pct}</p>
                  <p className="text-[10px] text-muted-foreground">Min. deposit: {tier.min}</p>
                </div>
              ))}
            </div>
            {/* T&C Content */}
            <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
              <p>
                Our platform offers an outstanding bonus for <span className="text-primary font-bold">4 consecutive deposits every month</span>. Each deposit earns you a higher bonus percentage and a higher maximum limit than the last. Enjoy increasing rewards with every deposit, supporting any currency of your choice. Take advantage of this opportunity to maximize your benefits with our generous bonuses!
              </p>
              <ul className="space-y-2 list-disc pl-4">
                <li>
                  The first deposit earns you <span className="text-primary font-bold">180%</span>(or 300% for new registrations within 7 minutes), up to a maximum of ₹20,000.00 or an equivalent amount in other currencies.
                </li>
                <li>
                  The second deposit earns you <span className="text-primary font-bold">240%</span>, up to a maximum of $40,000.00 or an equivalent amount in other currencies.
                </li>
                <li>
                  The third deposit earns you <span className="text-primary font-bold">300%</span>, up to a maximum of $60,000.00 or an equivalent amount in other currencies.
                </li>
                <li>
                  The fourth deposit earns you <span className="text-primary font-bold">360%</span>, up to a maximum of $100,000.00 or an equivalent amount in other currencies.
                </li>
              </ul>
              <p>
                The deposit bonus you receive will be credited to Rakeback. Simply place bets on the platform, and you can claim your bonus from Rakeback.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PromotionsPage;
