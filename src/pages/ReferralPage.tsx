import { useEffect, useState } from "react";
import { Copy, ChevronRight, Users, DollarSign, Gift, Home, Award, UserPlus, BookOpen, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useReferralStore } from "@/store/walletStore";
import useAuthStore from "@/store/authStore";
import ReferralDashboard from "@/components/referral/ReferralDashboard";
import MyRewardsTab from "@/components/referral/MyRewardsTab";
import ReferralCodesTab from "@/components/referral/ReferralCodesTab";
import RateAndRulesTab from "@/components/referral/RateAndRulesTab";
import DownloadBannersTab from "@/components/referral/DownloadBannersTab";

const tabs = [
  { id: "Dashboard", icon: Home },
  { id: "My Rewards", icon: Award },
  { id: "Referral Codes & Friends", icon: UserPlus },
  { id: "Rate & Rules", icon: BookOpen },
  { id: "Download Banners", icon: Download },
];

const ReferralPage = () => {
  const {
    referralDashboard,
    referralFriends,
    referralEarnings,
    referralLoading,
    fetchReferralDashboard,
    fetchReferralFriends,
    fetchReferralEarnings,
  } = useReferralStore();

  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("Dashboard");

  useEffect(() => {
    fetchReferralDashboard();
    fetchReferralFriends();
    fetchReferralEarnings();
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "Dashboard":
        return <ReferralDashboard referralDashboard={referralDashboard} referralEarnings={referralEarnings} />;
      case "My Rewards":
        return <MyRewardsTab />;
      case "Referral Codes & Friends":
        return <ReferralCodesTab referralDashboard={referralDashboard} />;
      case "Rate & Rules":
        return <RateAndRulesTab />;
      case "Download Banners":
        return <DownloadBannersTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold">Referral</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 bg-card/50 rounded-xl p-1.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.id}</span>
                <span className="sm:hidden">{tab.id.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {renderTab()}
      </div>
    </div>
  );
};

export default ReferralPage;
