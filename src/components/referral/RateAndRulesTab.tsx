import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReferralStore } from "@/store/walletStore";



export default function RateAndRulesTab() {
  const {
    commissionRules,
    commissionResult,
    rewardsSummary,
    vipReferralLevels,
    fetchCommissionRules,
    calculateCommission,
    fetchVipReferralLevels,
    fetchRewardsSummary
  } = useReferralStore();

  const [wagerAmount, setWagerAmount] = useState("1000");
  const [gameType, setGameType] = useState("Original Games (28%)");
  const [gameDropdown, setGameDropdown] = useState(false);
  const [rulesExpanded, setRulesExpanded] = useState(true);
  const [currencyType, setCurrencyType] = useState("BDT");

  useEffect(() => {
    fetchCommissionRules();
    fetchVipReferralLevels();
    fetchRewardsSummary();
  }, []);
  useEffect(() => {
    if (!wagerAmount) return;

    const type =
      gameType === "Original Games"
        ? "original"
        : gameType === "3rd Party Slots"
          ? "slots"
          : "sports";

    calculateCommission({
      wager: Number(wagerAmount),
      gameType: type,
    });
  }, [wagerAmount, gameType]);
  const maxReward =
  rewardsSummary?.maxReward || 
  (vipReferralLevels?.length
    ? Math.max(...vipReferralLevels.map((v: any) => Number(v.unlock)))
    : 0);

const currency = rewardsSummary?.currency || "BDT";
  const commissionRate = 1;
  const calculatedRate = (Number(wagerAmount) * commissionRate / 100).toFixed(2);
  const gameRate = gameType.includes("28") ? 28 : gameType.includes("60") ? 60 : 100;
  const result = (Number(calculatedRate) * gameRate / 100).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Commission Rate + Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Commission Reward Rate */}
        <div className="bg-card rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Commission Reward Rate</h3>
            <button
              onClick={() => setRulesExpanded(!rulesExpanded)}
              className="text-sm text-muted-foreground flex items-center gap-1"
            >
              View Rules <ChevronDown className={cn("w-4 h-4 transition-transform", rulesExpanded && "rotate-180")} />
            </button>
          </div>

          {rulesExpanded && commissionRules && (
            <div className="space-y-3 text-sm">
              <p>Base Rate: <b>{commissionRules.baseRate}%</b></p>

              {commissionRules.games.map((g: any, i: number) => (
                <div key={i} className="bg-secondary rounded-lg px-3 py-2">
                  {g.name} → <span className="text-primary font-semibold">{g.rate}%</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Commission Calculator */}
        <div className="bg-card rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2">🧮 Commission Calculator</h3>
            <span className="flex items-center gap-1 bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
              💎 {currencyType}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground block mb-1">Wager (BDT)</label>
              <input
                value={wagerAmount}
                onChange={(e) => setWagerAmount(e.target.value)}
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none"
              />
            </div>
            <span className="text-muted-foreground mt-5">× 1% =</span>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Commission Rate</label>
              <input readOnly value={(Number(wagerAmount) * 0.01).toFixed(0)} className="w-20 bg-secondary border border-border rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>

          <div className="relative">
            <label className="text-xs text-muted-foreground block mb-1">Game</label>
            <button
              onClick={() => setGameDropdown(!gameDropdown)}
              className="w-full flex items-center justify-between bg-secondary border border-border rounded-lg px-3 py-2 text-sm"
            >
              {gameType} <ChevronDown className="w-4 h-4" />
            </button>
            {gameDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-10">
                {["Original Games (28%)", "3rd Party Slots (60%)", "All Sports (100%)"].map(g => (
                  <button key={g} onClick={() => { setGameType(g); setGameDropdown(false); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-secondary">{g}</button>
                ))}
              </div>
            )}
          </div>

          <p className="text-lg font-bold">= {result} BDT</p>
        </div>
      </div>

      {/* How to Get Referral Reward */}
      <div className="bg-card rounded-xl p-5 space-y-6">
        <h3 className="font-bold text-lg">How to Get your Referral Reward</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-secondary/50 rounded-xl p-4 text-center">
            <span className="text-3xl font-bold text-primary">1</span>
            <h4 className="font-semibold mt-2 text-primary">Share</h4>
            <p className="text-xs text-muted-foreground mt-1">Share your referral link or code to your friends</p>
          </div>
          <div className="bg-secondary/50 rounded-xl p-4 text-center">
            <span className="text-3xl font-bold text-primary">2</span>
            <h4 className="font-semibold mt-2">Get <span className="text-primary">{maxReward} {currency}</span></h4>
            <p className="text-xs text-muted-foreground mt-1">Your awards will be locked for now</p>
          </div>
          <div className="bg-secondary/50 rounded-xl p-4 text-center">
            <span className="text-3xl font-bold text-primary">3</span>
            <h4 className="font-semibold mt-2">Level Up & <span className="text-primary">Receive</span></h4>
            <p className="text-xs text-muted-foreground mt-1">Your friend's VIP level will unlock your awards (see rules below)</p>
          </div>
        </div>

        {/* VIP Level Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[500px]">
            <div className="grid grid-cols-3 text-xs text-muted-foreground px-4 py-2 border-b border-border">
              <span>Friend's Level</span>
              <span>Total Wager</span>
              <span className="text-right">Unlock Amount</span>
            </div>
            {vipReferralLevels.map((v, i) => (
              <div key={i} className="grid grid-cols-3 px-4 py-2.5 border-b border-border text-sm items-center">
                <span className={cn("flex items-center gap-2", v.color)}>
                  💎 {v.level}
                </span>
                <span>{v.wager}</span>
                <span className="text-right">
                  <span className="bg-red-500/10 text-primary px-2 py-0.5 rounded text-xs font-medium">{v.unlock}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
