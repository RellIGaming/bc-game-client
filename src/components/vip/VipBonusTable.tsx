import {
  Star,
  Gift,
  Coins,
  DollarSign,
  Trophy,
  Flame,
  Crown,
} from "lucide-react";

interface Props {
 isLoggedIn?: boolean;
}

export default function VipBonusTable({ isLoggedIn }: Props) {
  if (!isLoggedIn) return null;

  const tiers = ["Bronze", "Silver", "Gold", "Platinum I", "Diamond II"];

  const bonusRows = [
    { label: "Raining", icon: <Flame size={16} /> },
    { label: "Daily Bonus", icon: <Gift size={16} /> },
    { label: "Coin Drops", icon: <Coins size={16} /> },
    { label: "Tips", icon: <DollarSign size={16} /> },
    { label: "VIP Spin", icon: <Trophy size={16} /> },
    { label: "Level-up Bonus", icon: <Star size={16} /> },
    { label: "Recharge", icon: <DollarSign size={16} /> },
    { label: "Weekly Cashback", icon: <Coins size={16} /> },
    { label: "Monthly Cashback", icon: <Coins size={16} /> },
    { label: "Sports Weekly Cashback", icon: <Trophy size={16} /> },
    { label: "No-fee Withdrawal", icon: <DollarSign size={16} /> },
    { label: "Exclusive VIP Perks", icon: <Crown size={16} /> },
    { label: "Luxury Giveaway", icon: <Gift size={16} /> },
  ];

  return (
    <div className="mt-6">
      <div className="bg-[#1f2324] rounded-xl p-4">
        <h2 className="text-lg font-semibold text-white">
          Exclusive VIP Bonus
        </h2>
        <p className="text-xs text-white/60 mb-4">
          Discover the ultimate gaming experience
        </p>

        {/* Responsive Scroll Wrapper */}
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Header */}
            <div className="grid grid-cols-6 bg-[#2a2f30] text-white/80 text-sm font-semibold rounded-t-lg">
              <div className="p-3">Bonus Type</div>
              {tiers.map((tier) => (
                <div key={tier} className="p-3 text-center">
                  {tier}
                </div>
              ))}
            </div>

            {/* Rows */}
            {bonusRows.map((row, index) => (
              <div
                key={row.label}
                className={`grid grid-cols-6 text-sm items-center
                ${
                  index % 2 === 0
                    ? "bg-[#242829]"
                    : "bg-[#2a2f30]"
                }`}
              >
                {/* Bonus Type Column */}
                <div className="flex items-center gap-2 p-3 text-white">
                  <span className="text-primary">{row.icon}</span>
                  {row.label}
                </div>

                {/* Tier Columns */}
                {tiers.map((_, i) => (
                  <div
                    key={i}
                    className="flex justify-center p-3 text-white"
                  >
                    {i >= 0 && i <= 4 ? (
                      <Star
                        size={16}
                        className="text-yellow-400"
                        fill="currentColor"
                      />
                    ) : (
                      "-"
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
