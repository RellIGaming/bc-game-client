import { useState } from "react";
import { ChevronRight, Info, Lock, Gift, Clock, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import bonusBadge from "../assets/images/badge-bonus.png";
import bonusAngel from "../assets/images/angle-bonus.png";
import bonusDaily from "../assets/images/daily-bonus-calendar.png";
import rockBack from "../assets/images/bcd-roclback.png";
import telegram from "../assets/images/telegram-bonus.png";
import luckySpin from "../assets/images/lucky-spin.png";
import quest from "../assets/images/quest-bonus.png";
import challenge from "../assets/images/challenge.png";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DailyBonusModal } from "@/components/bonus/DailyBonusModal";
import { WagerContributionModal } from "@/components/bonus/WagerContributionModal";
import { BcdRakebackModal } from "@/components/bonus/BcdRakebackModal";
import { LuckySpinModal } from "@/components/bonus/LuckySpinModal";
import { VaultProModal } from "@/components/bonus/VaultProModal";

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
  {
    icon: bonusDaily,
    title: "Daily Bonus",
    lockedText: "Available at VIP 2",
    action: null,
  },
  {
    icon: rockBack,
    title: "BCD Rakeback",
    stats: [
      { label: "Locked BCD:", value: "1 BCD" },
      { label: "Unlock Rate:", value: "20%" },
      { label: "Ready to claim:", value: "0 BCD" },
    ],
    countdown: "Claim in 17h 33m 45s",
    action: "Claim",
  },
  {
    icon: telegram,
    title: "Telegram Subscription",
    badge: "Earn 2 BCD Bonus",
    description:
      "Connect your TG account, join our TG channel to claim more daily bonuses!",
    action: "Go Verify",
  },
  {
    icon: quest,
    title: "Quests",
    stats: [
      { label: "Daily Quests:", value: "0/3" },
      { label: "Weekly Quests:", value: "0/1" },
    ],
    action: "Claim",
  },
  {
    icon: challenge,
    title: "Challenge",
    stats: [
      { label: "Challenges completed:", value: "0/6" },
      { label: "My rewards:", value: "0 BCD" },
    ],
    action: "View",
  },
  {
    icon: luckySpin,
    title: "Lucky Spin",
    stats: [
      { label: "VIP Spin:", value: "Reach VIP 8" },
      { label: "Daily Spin:", value: "₹0.00/₹18,134.87" },
    ],
    action: "Claim",
  },
  {
    icon: luckySpin,
    title: "Vault Pro",
    stats: [
      { label: "My Holdings:", value: "₹0.00" },
      { label: "Total Return:", value: "₹0.00" },
    ],
    action: "Transfer In",
  },
];
type ModalType =
  | "daily"
  | "bcd"
  | "lucky"
  | "vault"
  | "wager"
  | null;

const BonusPage = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
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

        {/* General Bonus */}
        <div>
          <h2 className="text-xl font-bold mb-4">General Bonus</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {generalBonuses.map((bonus, i) => (
              <div key={i} className="bg-card rounded-lg p-2 flex flex-col h-full">
                {bonus.title !== "Telegram Subscription" &&
                  bonus.title !== "Quests" &&
                  bonus.title !== "Challenge" && (
                    <button
                      onClick={() => {
                        if (bonus.title === "Daily Bonus") {
                          setActiveModal("daily");
                        } else if (bonus.title === "BCD Rakeback") {
                          setActiveModal("bcd");
                        } else if (bonus.title === "Lucky Spin") {
                          setActiveModal("lucky");
                        } else if (bonus.title === "Vault Pro") {
                          setActiveModal("vault");
                        }
                      }}
                    >
                      <Info className="w-4 h-4 text-muted-foreground ml-auto" />
                    </button>
                  )}
                <div className="flex items-center justify-center mb-2">
                  <img src={bonus.icon} alt="icon" className="w-24 h-24" />
                </div>
                <h4 className="font-bold text-sm mb-2 flex items-center justify-center">{bonus.title}</h4>
                <div className="bg-background rounded-lg p-2 flex flex-col flex-1">

                  {/* Badge */}
                  {bonus.badge && (
                    <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded w-fit mb-2">
                      {bonus.badge}
                    </span>
                  )}

                  {/* Locked Text */}
                  {bonus.lockedText && (
                    <p className="text-xs text-muted-foreground mb-2">
                      🔒 {bonus.lockedText}
                    </p>
                  )}

                  {/* Description */}
                  {bonus.description && (
                    <p className="text-xs text-muted-foreground mb-2">
                      {bonus.description}
                    </p>
                  )}

                  {/* Stats (Label + Value aligned like image) */}
                  {bonus.stats &&
                    bonus.stats.map((stat, index) => (
                      <div key={index} className="flex justify-between text-xs text-muted-foreground mb-2">
                        <span>{stat.label}</span>
                        <span className="font-medium text-foreground">{stat.value}</span>
                      </div>
                    ))}

                  {/* Countdown */}
                  {bonus.countdown && (
                    <p className="text-xs text-muted-foreground mt-2 flex items-center mb-2">
                      <Clock className="w-3 h-3 mr-1" />
                      {bonus.countdown}
                    </p>
                  )}
                  {bonus.action && (
                    <Button
                      size="sm"
                      className="mt-auto w-full bg-primary text-primary-foreground text-xs"
                    >
                      {bonus.action}
                    </Button>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">VIP Bonus</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {generalBonuses.map((bonus, i) => (
              <div key={i} className="bg-card rounded-lg p-2 flex flex-col h-full">
                {bonus.title !== "Telegram Subscription" &&
                  bonus.title !== "Quests" &&
                  bonus.title !== "Challenge" && (
                    <button
                      onClick={() => {
                        if (bonus.title === "Daily Bonus") {
                          setActiveModal("daily");
                        } else if (bonus.title === "BCD Rakeback") {
                          setActiveModal("bcd");
                        } else if (bonus.title === "Lucky Spin") {
                          setActiveModal("lucky");
                        } else if (bonus.title === "Vault Pro") {
                          setActiveModal("vault");
                        }
                      }}
                    >
                      <Info className="w-4 h-4 text-muted-foreground ml-auto" />
                    </button>
                  )}
                <div className="flex items-center justify-center mb-2">
                  <img src={bonus.icon} alt="icon" className="w-24 h-24" />
                </div>
                <h4 className="font-bold text-sm mb-2 flex items-center justify-center">{bonus.title}</h4>
                <div className="bg-background rounded-lg p-2 flex flex-col flex-1">

                  {/* Badge */}
                  {bonus.badge && (
                    <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded w-fit mb-2">
                      {bonus.badge}
                    </span>
                  )}

                  {/* Locked Text */}
                  {bonus.lockedText && (
                    <p className="text-xs text-muted-foreground mb-2">
                      🔒 {bonus.lockedText}
                    </p>
                  )}

                  {/* Description */}
                  {bonus.description && (
                    <p className="text-xs text-muted-foreground mb-2">
                      {bonus.description}
                    </p>
                  )}

                  {/* Stats (Label + Value aligned like image) */}
                  {bonus.stats &&
                    bonus.stats.map((stat, index) => (
                      <div key={index} className="flex justify-between text-xs text-muted-foreground mb-2">
                        <span>{stat.label}</span>
                        <span className="font-medium text-foreground">{stat.value}</span>
                      </div>
                    ))}

                  {/* Countdown */}
                  {bonus.countdown && (
                    <p className="text-xs text-muted-foreground mt-2 flex items-center mb-2">
                      <Clock className="w-3 h-3 mr-1" />
                      {bonus.countdown}
                    </p>
                  )}
                  {bonus.action && (
                    <Button
                      size="sm"
                      className="mt-auto w-full bg-primary text-primary-foreground text-xs"
                    >
                      {bonus.action}
                    </Button>
                  )}
                </div>

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
        {/* Daily Modal */}
        <DailyBonusModal
          open={activeModal === "daily"}
          onOpenChange={() => setActiveModal(null)}
          onOpenWager={() => setActiveModal("wager")}
        />

        {/* Wager Modal */}
        <WagerContributionModal
          open={activeModal === "wager"}
          onOpenChange={() => setActiveModal(null)}
        />
        <BcdRakebackModal
          open={activeModal === "bcd"}
          onOpenChange={() => setActiveModal(null)}
          onOpenWager={() => setActiveModal("wager")}
        />
        <LuckySpinModal
          open={activeModal === "lucky"}
          onOpenChange={() => setActiveModal(null)}
        />
        <VaultProModal
          open={activeModal === "vault"}
          onOpenChange={() => setActiveModal(null)}
        />
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


