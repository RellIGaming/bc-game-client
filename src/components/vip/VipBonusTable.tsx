import { useBonusStore } from "@/store/walletStore";
import {
  Star,
  Gift,
  Coins,
  DollarSign,
  Trophy,
  Flame,
  Crown,
} from "lucide-react";
import { useEffect } from "react";

interface Props {
  isLoggedIn?: boolean;
}
const tierColors: Record<string, string> = {
  Bronze: "#CD7F32",
  Silver: "#C0C0C0",
  Gold: "#FFD700",
  "Platinum I": "linear-gradient(135deg, #E5E4E2, #A0B2C6)",
  "Diamond II": "linear-gradient(135deg, #B9F2FF, #7FDBFF)",
};


export default function VipBonusTable({ isLoggedIn }: Props) {
  if (!isLoggedIn) return null;
  const { vipTable, fetchVipTable } = useBonusStore();

  useEffect(() => {
    fetchVipTable();
  }, []);


  const iconMap = {
    gift: Gift,
    trophy: Trophy,
    coins: Coins,
    flame: Flame,
    star: Star
  };
  const progress = vipTable?.userProgress;
  const tiers = vipTable?.tiers || [];
  const rows = vipTable?.rows || [];

  // const tiers = vipTable?.tiers || [
  //   { name: "Bronze", color: "#CD7F32" },
  //   { name: "Silver", color: "#C0C0C0" },
  //   { name: "Gold", color: "FFD700" },
  //   { name: "Platinum I", color: "linear-gradient(135deg, #E5E4E2, #A0B2C6)" },
  //   { name: "Diamond II", color: "linear-gradient(135deg, #B9F2FF, #7FDBFF)"}


  // ];

  // const rows = vipTable?.rows || [
  //   {
  //     label: "Daily Bonus",
  //     icon: "gift",
  //     enabled: ["Bronze"]
  //   }
  // ];
  console.log("VIP TABLE:", vipTable);
  // if (!vipTable) {
  //   return <div className="text-white">Loading VIP data...</div>;
  // }
  return (
    <div className="mt-6">
      <div className="bg-secondary rounded-lg p-4">
        {progress && (
          <div className="bg-card p-4 rounded-lg mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>{progress.currentTier}</span>
              <span>{progress.nextTier || "MAX"}</span>
            </div>

            <div className="w-full bg-black/30 h-2 rounded-full">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${progress.progressPercent}%` }}
              />
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              {progress.currentXp} XP
            </p>
          </div>
        )}
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
            <div
              className="grid bg-[#2a2f30] text-white/80 text-sm font-semibold rounded-t-lg"
              style={{
                gridTemplateColumns: `200px repeat(${tiers.length}, 1fr)`
              }}
            >
              <div className="p-3">Bonus Type</div>
              {tiers.map((tier: any) => (
                <div key={tier.name} className="p-3 text-center">
                  {tier.name}
                </div>
              ))}
            </div>

            {/* Rows */}
            {rows.map((row: any, index: number) => {
              const Icon = iconMap[row.icon as keyof typeof iconMap];

              return (
                <div
                  key={row.label}
                  className={`grid grid-cols-6 text-sm items-center ${index % 2 === 0 ? "bg-[#242829]" : "bg-[#2a2f30]"
                    }`}
                >
                  <div className="flex items-center gap-2 p-3 text-white">
                    {Icon && <Icon size={16} className="text-primary" />}
                    {row.label}
                  </div>

                  {tiers.map((tier: any) => (
                    <div key={tier.name} className="flex justify-center p-3">
                      {row.enabled.includes(tier.name) ? (
                        <Star
                          size={16}
                          style={{ color: tier.color }}
                          fill={tier.color}
                        />
                      ) : (
                        "-"
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
