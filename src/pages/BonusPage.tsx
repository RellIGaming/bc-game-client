import { useState } from "react";
import { ChevronRight, Info, Lock, Gift, Clock, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import bonusBadge from "../assets/images/badge-bonus.png";
import bonusAngel from "../assets/images/angle-bonus.png";

const monthlyTiers = [
  { pct: "180%", active: true },
  { pct: "240%", active: false },
  { pct: "300%", active: false },
  { pct: "360%", active: false },
];
const vipBonusItems = [
  { icon: "💰", title: "Weekly Cashback", desc: "Personalised cash drop every Friday" },
  { icon: "📅", title: "Monthly Cashback", desc: "Supersized rebate on the 15th" },
  { icon: "⚽", title: "Sports Weekly Cashback", desc: "Up to $1,000 every Saturday" },
  { icon: "🔄", title: "Recharge Boost", desc: "Earned bonus credits with every reload" },
  { icon: "🌮", title: "Taco Tuesday", desc: "Snap your exclusive Taco Bonus every Tuesday" },
];
const generalBonuses = [
  { icon: "☀️", title: "Daily Bonus", desc: "Available at VIP 2", action: null },
  { icon: "🪙", title: "BCD Rakeback", desc: "Locked BCD: 1 BCD\nUnlock Rate: 20%\nReady to claim: 0 BCD", countdown: "Claim in 10h 13m 59s", action: "Claim" },
  { icon: "📱", title: "Telegram Subscription", desc: "Connect your TG account, join our TG channel to claim more daily bonuses!", badge: "Earn 2 BCD Bonus", action: "Go Verify" },
  { icon: "🎯", title: "Quests", desc: "Daily Quests: 0/3\nWeekly Quests: 0/1", action: "Claim" },
  { icon: "🏆", title: "Challenge", desc: "Challenges com...: 0/4\nMy rewards: 0 BCD", action: "View" },
  { icon: "🎰", title: "Lucky Spin", desc: "VIP Spin: Reach VIP 8\nDaily Spin: ₹0.00/₹18,104.89", action: "Claim" },
  { icon: "🏦", title: "Vault Pro", desc: "My Holdings: ₹0.00\nTotal Return: ₹0.00", action: "Transfer In" },
];
const BonusPage = () => {
  const [redeemCode, setRedeemCode] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-1 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Bonus</h1>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value)}
              placeholder="Redeem your bonus here."
              className="flex-1 sm:w-64 bg-secondary rounded-lg px-4 py-2 text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button className="bg-card hover:bg-card-hover text-foreground text-sm px-4">Redeem Code</Button>
          </div>
        </div>
        <div
          className="
    mt-4 mb-4
    relative
    flex items-center gap-4 sm:gap-6
    rounded-lg bg-card
    py-3 sm:py-4 pl-0 pr-4
    overflow-hidden
    h-[140px] sm:h-[200px]
  "
          style={{
            backgroundImage:
              "linear-gradient(-12deg, transparent 28%, rgba(113,113,113,0.45) 82%)",
          }}
        >
          {/* LEFT IMAGES */}
          <div className="relative flex-shrink-0 h-[120px] sm:h-[180px] w-[140px] sm:w-[190px]">
            <img
              src={bonusBadge}
              alt=""
              className="w-20 sm:w-40 mx-auto"
            />
            <img
              src={bonusAngel}
              alt=""
              className="w-40 sm:w-60 -mt-8 sm:-mt-12"
            />
          </div>

          {/* CENTER CONTENT */}
          <div className="flex-1 w-full">
            <h2 className="text-xl sm:text-3xl font-extrabold text-primary">
              VIP 0
            </h2>

            {/* PROGRESS BAR */}
            <div className="mt-3 sm:mt-4 bg-black/30 rounded-full h-2 sm:h-3 overflow-hidden">
              <div className="h-full w-[5%] bg-primary" />
            </div>

            <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground mt-2">
              <span>0 XP</span>
              <span>1 XP</span>
            </div>

            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
              1 XP until VIP 1
            </p>
          </div>

          {/* RIGHT ACTION */}
          <button
            onClick={() => setOpen(true)}
            className="
      absolute right-4 top-4
      px-3 sm:px-4 py-1.5 sm:py-2
      rounded-lg
      bg-primary text-black
      text-[10px] sm:text-xs font-semibold
    "
          >
            View Level Up Detail
          </button>
        </div>

        {/* MODAL */}
        {open && <VipModal onClose={() => setOpen(false)} />}
        {/* Connect Wallet Banner */}
        {/* <div className="bg-card rounded-lg p-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">💳</div>
            <div>
              <p className="font-semibold text-sm">Connect Cwallet to Earn Bonus</p>
              <p className="text-xs text-primary">ℹ️ What Is Cwallet?</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 ml-auto text-xs text-muted-foreground">
            <span>⚡ Instant Payment</span>
            <span>💸 Zero Fee</span>
            <span>🎁 Withdraw Bonus</span>
            <Button size="sm" className="bg-primary text-primary-foreground text-xs">Connect Now</Button>
          </div>
        </div> */}

        {/* Total Bonus & Monthly Deposit */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-secondary to-card rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Bonus Claimed (INR)</p>
            <p className="text-3xl font-bold mb-3">₹0.00</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>Total VIP Bonus: <span className="text-foreground">₹0.00</span></div>
              <div>Total Special Bonus: <span className="text-foreground">₹0.00</span></div>
              <div>Total General Bonus: <span className="text-foreground">₹0.00</span></div>
              <div>Total Locked Bonus: <span className="text-foreground">₹90.52</span></div>
            </div>
            <button className="text-primary text-xs mt-3 flex items-center gap-1">Details <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="bg-card rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-sm">Monthly Deposit Bonus <span className="text-xs text-muted-foreground">Get up to: ₹9,052,448.03</span></p>
            </div>
            <div className="flex gap-3 mb-4">
              {monthlyTiers.map((tier, i) => (
                <div key={i} className={cn(
                  "flex-1 text-center py-2 rounded-lg text-sm font-bold",
                  tier.active ? "bg-primary/20 text-primary border border-primary" : "bg-secondary text-muted-foreground"
                )}>
                  {tier.pct}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mb-3">🔄 Monthly Reset: 22days remaining</p>
            <Button className="w-full bg-primary text-primary-foreground">Deposit Now</Button>
            <p className="text-xs text-muted-foreground text-center mt-2">💎 Deposit bonus will be added to your 🪙 Rakeback</p>
          </div>
        </div>
        {/* VIP Bonus */}
        {/* <div className="bg-card rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-3xl">✅</div>
              <div>
                <h3 className="font-bold text-lg">VIP 0</h3>
                <div className="w-48 bg-secondary rounded-full h-2 mt-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "0%" }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">0 XP &nbsp;&nbsp; 1 XP</p>
              </div>
            </div>
            <button className="text-primary text-sm">View Level Up Details</button>
          </div>
          <h4 className="font-semibold text-sm mb-3">Hit VIP 22 - Your Bonus Buffet Awaits!</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {vipBonusItems.map((item, i) => (
              <div key={i} className="bg-secondary rounded-lg p-3 flex items-start gap-2">
                <span className="text-lg">{item.icon}</span>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">Total VIP Bonus Claimed: <span className="text-foreground">₹0.00</span></p>
            <p className="text-xs text-muted-foreground">1XP until VIP 1</p>
            <p className="text-primary text-xs mt-1">Bet in APP to Claim 1.5 x XP</p>
          </div>
        </div> */}
        {/* General Bonus */}
        <div>
          <h2 className="text-xl font-bold mb-4">General Bonus</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {generalBonuses.map((bonus, i) => (
              <div key={i} className="bg-card rounded-lg p-4 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-3xl">{bonus.icon}</div>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </div>
                <h4 className="font-semibold text-sm mb-1">{bonus.title}</h4>
                {bonus.badge && <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded w-fit mb-1">{bonus.badge}</span>}
                <p className="text-xs text-muted-foreground whitespace-pre-line flex-1">{bonus.desc}</p>
                {bonus.countdown && <p className="text-xs text-muted-foreground mt-2"><Clock className="w-3 h-3 inline mr-1" />{bonus.countdown}</p>}
                {bonus.action && (
                  <Button size="sm" className="mt-3 w-full bg-primary text-primary-foreground text-xs">{bonus.action}</Button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">VIP Bonus</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {generalBonuses.map((bonus, i) => (
              <div key={i} className="bg-card rounded-lg p-4 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-3xl">{bonus.icon}</div>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </div>
                <h4 className="font-semibold text-sm mb-1">{bonus.title}</h4>
                {bonus.badge && <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded w-fit mb-1">{bonus.badge}</span>}
                <p className="text-xs text-muted-foreground whitespace-pre-line flex-1">{bonus.desc}</p>
                {bonus.countdown && <p className="text-xs text-muted-foreground mt-2"><Clock className="w-3 h-3 inline mr-1" />{bonus.countdown}</p>}
                {bonus.action && (
                  <Button size="sm" className="mt-3 w-full bg-primary text-primary-foreground text-xs">{bonus.action}</Button>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Special Bonus */}
        <div>
          <h2 className="text-xl font-bold mb-4">Special Bonus</h2>
          <div className="bg-card rounded-lg p-12 text-center">
            <div className="text-5xl mb-4">🎁</div>
            <p className="text-muted-foreground">Stay tuned—something's coming!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BonusPage;


export const VipModal = ({ onClose }: { onClose: () => void }) => {
  const [openTier, setOpenTier] = useState<string | null>("Bronze");

  const toggleTier = (tier: string) => {
    setOpenTier((prev) => (prev === tier ? null : tier));
  };

  const tiers = [
    {
      name: "Bronze  VIP 2–7",
      key: "Bronze",
      levels: [
        { level: "VIP 02", xp: 100 },
        { level: "VIP 03", xp: 200 },
        { level: "VIP 04", xp: 1000 },
        { level: "VIP 05", xp: 2000 },
        { level: "VIP 06", xp: 3000 },
        { level: "VIP 07", xp: 4000 },
      ],
    },
    {
      name: "Silver   VIP 8–21", key: "Silver",
      levels: [
        { level: "VIP 02", xp: 100 },
        { level: "VIP 03", xp: 200 },
        { level: "VIP 04", xp: 1000 },
        { level: "VIP 05", xp: 2000 },
        { level: "VIP 06", xp: 3000 },
        { level: "VIP 07", xp: 4000 },
      ],
    },
    { name: "Gold     VIP 22–37", key: "Gold" },
    { name: "Platinum I   VIP 38–55", key: "Platinum1" },
    { name: "Platinum II  VIP 56–69", key: "Platinum2" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-xl bg-[#2b2f30] p-5 text-white relative max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">VIP Level System</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* XP BOX */}
        <div className="bg-[#1f2324] rounded-lg p-4 text-sm text-white/80 mb-4">
          <p className="font-semibold mb-1">XP Calculation:</p>
          <p>
            XP for Originals, Slots, and Live Casino is based on wager and
            house edge (max 2%); $1 wager counts 1 XP.
          </p>
          <p className="mt-1">
            Racing/Lottery/Trading count 1×, Sports count 2×.
          </p>
        </div>

        {/* ACCORDION */}
        <div className="space-y-3">
          {tiers.map((tier) => {
            const isOpen = openTier === tier.key;

            return (
              <div key={tier.key} className="bg-[#1f2324] rounded-lg overflow-hidden">

                {/* TIER HEADER */}
                <button
                  onClick={() => toggleTier(tier.key)}
                  className="w-full flex justify-between items-center px-4 py-3 text-sm font-medium"
                >
                  <span>{tier.name}</span>
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {/* DROPDOWN CONTENT */}
                {isOpen && tier.levels && (
                  <div className="border-t border-white/10 text-sm">

                    <div className="flex justify-between px-4 py-2 text-white/50 text-xs">
                      <span>Level</span>
                      <span>Required XP</span>
                    </div>

                    {tier.levels.map((item, index) => (
                      <div
                        key={item.level}
                        className={`flex justify-between px-4 py-2 transition
      ${index % 2 === 0 ? "bg-[#2a2f30]" : "bg-[#242829]"}
      hover:bg-white/5`}
                      >
                        <span>{item.level}</span>
                        <span className="font-semibold">{item.xp}</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


