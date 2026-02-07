import { useState } from "react";
import { Copy, ChevronRight, Users, DollarSign, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
const tabs = ["Dashboard", "My Rewards", "Referral Codes & Friends", "Rate & Rules", "Download Banners"];
const socialIcons = ["🔵", "✖️", "📱", "💬", "💚", "🔴", "📸", "🟢", "💼", "📞"];
const liveRewards = [
  { user: "Rikkkkkkkkkk", amount: "+0.5", icon: "🟡" },
  { user: "Ayyshortyyyy", amount: "+130", icon: "🟠" },
  { user: "Tipatopa", amount: "+0.43", icon: "🔵" },
  { user: "Weudolulfucc", amount: "+12.47", icon: "🟢" },
];
const faqs = [
  "How does the referral system work?",
  "How much can I earn from my referral?",
  "Are there any banners I can use to advertise?",
  "What is USD reward and how does it work?",
  "I have big audience, how I can get special deals?",
  "How many referral links I can create if I have different websites/accounts?",
  "Can I see the data of my referral?",
  "Can I send tip or reward to my referrals?",
];
const ReferralPage = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-2xl font-bold">Referral</h1>
        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeTab === tab ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-secondary"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Invite Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-card rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Invite a Friend to Get</h3>
              <button className="text-primary text-xs">Referral Terms & Conditions</button>
            </div>
            <div className="flex gap-6 text-sm">
              <span><span className="text-primary font-bold">₹90,524.48</span> Referral Rewards</span>
              <span><span className="text-primary font-bold">25%</span> Commission Rewards</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Get ₹90,524.48 for each friend you invite, plus up to 25% commission on their wagers. Enjoy consistent commission, whether they win or lose, in our Casino and Sportsbook. Start earning now!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Referral Link</label>
                <div className="flex items-center gap-2 mt-1">
                  <input readOnly value="https://bc.game/i-47fxv73u0-n/" className="flex-1 bg-secondary rounded-lg px-3 py-2 text-xs border border-border" />
                  <Button size="sm" variant="outline" onClick={() => handleCopy("https://bc.game/i-47fxv73u0-n/")}>Copy</Button>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Referral Code</label>
                <div className="flex items-center gap-2 mt-1">
                  <input readOnly value="47fxv73u0" className="flex-1 bg-secondary rounded-lg px-3 py-2 text-xs border border-border" />
                  <Button size="sm" variant="outline" onClick={() => handleCopy("47fxv73u0")}>Copy</Button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Share via socials</span>
              <div className="flex gap-2">
                {socialIcons.map((icon, i) => (
                  <button key={i} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm hover:bg-primary/20 transition-colors">
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <Users className="w-8 h-8 mx-auto text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">Total Reward</p>
                <p className="font-bold">₹0.00</p>
              </div>
              <div>
                <Users className="w-8 h-8 mx-auto text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">Total Friends</p>
                <p className="font-bold">0</p>
              </div>
            </div>
            <div className="border-t border-border pt-4 grid grid-cols-2 gap-4 text-center">
              <div>
                <DollarSign className="w-5 h-5 mx-auto text-primary mb-1" />
                <p className="text-xs text-muted-foreground">Referral Rewards</p>
                <p className="font-bold">₹0.00</p>
              </div>
              <div>
                <Gift className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">Commission Rewards</p>
                <p className="font-bold">₹0.00</p>
              </div>
            </div>
          </div>
        </div>
        {/* Rewards Activities */}
        <div className="bg-card rounded-xl p-8 text-center">
          <h3 className="font-bold text-lg mb-6">Rewards Activities</h3>
          <div className="text-5xl mb-3">👻</div>
          <p className="text-muted-foreground text-sm">No info yet</p>
          <p className="text-muted-foreground text-sm">Invite friends to join you now!</p>
        </div>
        {/* Live Rewards */}
        <div className="bg-card rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="flex items-center gap-1 text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Live Rewards
            </span>
            <span className="text-xs text-muted-foreground ml-auto">Total Rewards Sent To-Date</span>
            <span className="text-primary font-bold text-sm">₹2,282,770.85K</span>
          </div>
          <div className="flex gap-4 overflow-x-auto">
            {liveRewards.map((r, i) => (
              <div key={i} className="flex items-center gap-2 text-xs whitespace-nowrap">
                <span className="font-medium">{r.user}</span>
                <span className="text-primary">{r.amount}</span>
                <span>{r.icon}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Affiliate Program */}
        <div className="bg-card rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="text-6xl">🎰🎲🎯</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Learn more about our <span className="text-primary">Affiliate program</span></h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you have a large audience and followers. We have special conditions for you to customize your referral program.
              If you can invite players and their wager amount reaches a billion dollars and above, you will get your own customized casino!
            </p>
            <div className="flex items-center gap-2">
              <input readOnly value="business@bc.game" className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm border border-border" />
              <Button size="sm">Send Now</Button>
            </div>
          </div>
        </div>
        {/* FAQ */}
        <div>
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="bg-card rounded-xl divide-y divide-border">
            {faqs.map((faq, i) => (
              <button
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
              >
                <span className="text-sm font-medium">{faq}</span>
                <ChevronRight className={cn("w-5 h-5 text-muted-foreground transition-transform", openFaq === i && "rotate-90")} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReferralPage;