import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import ReferralDashboard from "@/components/referral/ReferralDashboard";
import MyRewardsTab from "@/components/referral/MyRewardsTab";
import ReferralCodesTab from "@/components/referral/ReferralCodesTab";
import RateAndRulesTab from "@/components/referral/RateAndRulesTab";
import DownloadBannersTab from "@/components/referral/DownloadBannersTab";
const tabs = ["Dashboard", "My Rewards", "Referral Codes & Friends", "Rate & Rules", "Download Banners"];

const ReferralPage = () => {
 
  const [activeTab, setActiveTab] = useState("Dashboard");
 
  const renderTab = () => {
    switch (activeTab) {
      case "Dashboard":
        return <ReferralDashboard />;
      case "My Rewards":
        return <MyRewardsTab />;
      case "Referral Codes & Friends":
        return <ReferralCodesTab referralDashboard={undefined}  />;
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
      <div className="max-w-5xl mx-auto px-1 py-8 space-y-8 sm:px-2">
        <h1 className="text-2xl font-bold">Referral</h1>
        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                activeTab === tab ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-secondary"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        {renderTab()}
        
      </div>
    </div>
  );
};
export default ReferralPage;