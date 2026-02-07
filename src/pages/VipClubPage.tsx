import { useState } from "react";
import { ChevronRight, Star, Trophy, Shield, Gift, Crown, Users, Gem } from "lucide-react";
import { cn } from "@/lib/utils";
const vipPerks = [
  { icon: "💎", title: "Instant Lossback", desc: "Earn rewards back instantly as you play" },
  { icon: "🎁", title: "Reload Bonuses", desc: "Receive rewards every day — the more you play, the higher you get." },
  { icon: "🎮", title: "Gameplay Bonuses", desc: "Play across different game types to unlock richer rewards." },
  { icon: "🏆", title: "Top Player Bonuses", desc: "Play at the top to unlock exclusive rewards." },
  { icon: "💸", title: "Fee-Free D & W", desc: "All deposits and withdrawals are fee-free, fiat and crypto." },
  { icon: "🎉", title: "IRL VIP Events & Rewards", desc: "Exclusive real-world VIP experiences." },
  { icon: "👤", title: "Dedicated VIP Host", desc: "Personalized support whenever you need it" },
];
const accessItems = [
  { icon: "🔥", title: "Activity", desc: "Consistent and responsible gameplay helps you stand out as a valued player." },
  { icon: "❤️", title: "Loyalty", desc: "Stable and ongoing loyalty increases your chance of unlocking VIP service." },
  { icon: "🚫", title: "No Barriers", desc: "No level or specific game requirements — every player has the opportunity to qualify for VIP." },
];
const faqCategories = ["General", "Benefits"];
const faqs = [
  { q: "How do I become a VIP?", a: "VIP status is awarded based on your activity, loyalty, and gameplay consistency. There are no specific level requirements." },
  { q: "What is the VIP Transfer?", a: "VIP Transfer allows you to transfer your VIP benefits to another platform account under certain conditions." },
  { q: "What makes the BC.GAME VIP Club different from others?", a: "Our VIP program focuses on personalized rewards, real-world experiences, and dedicated support without rigid level requirements." },
];
const VipClubPage = () => {
  const [faqCategory, setFaqCategory] = useState("General");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-r from-secondary via-card to-secondary rounded-2xl p-8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
          <div className="relative z-10">
            <div className="text-5xl mb-4">👑</div>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-2">Exclusive Rewards</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">ELITE VIP EXPERIENCE</h1>
            <p className="text-muted-foreground text-sm">Instant withdrawal on all VIP rewards, reserved for our elite members.</p>
          </div>
        </div>
        {/* Premium VIP Rewards */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Experience <span className="text-primary">Premium VIP Rewards</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vipPerks.slice(0, 6).map((perk, i) => (
            <div key={i} className="bg-card rounded-xl p-6 text-center hover:bg-card-hover transition-colors">
              <div className="text-4xl mb-3">{perk.icon}</div>
              <h3 className="font-semibold mb-2">{perk.title}</h3>
              <p className="text-sm text-muted-foreground">{perk.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="bg-card rounded-xl p-6 text-center w-full sm:w-auto sm:min-w-[240px]">
            <div className="text-4xl mb-3">{vipPerks[6].icon}</div>
            <h3 className="font-semibold mb-2">{vipPerks[6].title}</h3>
            <p className="text-sm text-muted-foreground">{vipPerks[6].desc}</p>
          </div>
          <div className="bg-card rounded-xl p-6 text-center w-full sm:w-auto">
            <div className="text-4xl mb-3">🚀</div>
            <p className="text-muted-foreground text-sm">More perks are coming...<br />Your VIP journey keeps getting better</p>
          </div>
        </div>
        {/* Play and Engage */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Play and Engage for <span className="text-primary">VIP Access</span>
          </h2>
        </div>
        <div className="space-y-3">
          {accessItems.map((item, i) => (
            <div key={i} className="bg-card rounded-xl p-5 flex items-start gap-4">
              <div className="text-3xl">{item.icon}</div>
              <div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Video placeholder */}
        <div className="bg-card rounded-xl aspect-video flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="text-5xl mb-3">▶️</div>
            <p>Welcome to BC.GAME VIP Club</p>
          </div>
        </div>
        {/* FAQ */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        </div>
        <div className="bg-card rounded-xl overflow-hidden">
          <div className="flex border-b border-border">
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFaqCategory(cat)}
                className={cn(
                  "px-6 py-3 text-sm font-medium transition-colors",
                  faqCategory === cat ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="divide-y divide-border">
            {faqs.map((faq, i) => (
              <button
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
              >
                <span className="text-sm font-medium">{faq.q}</span>
                <ChevronRight className={cn("w-5 h-5 text-muted-foreground transition-transform", openFaq === i && "rotate-90")} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default VipClubPage;