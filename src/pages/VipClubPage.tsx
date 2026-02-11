import { useState } from "react";
import { ChevronRight, Star, Trophy, Shield, Gift, Crown, Users, Gem } from "lucide-react";
import { cn } from "@/lib/utils";
import coin1 from "../assets/images/coin1.png";
import coin2 from "../assets/images/coin2.png";
import box from "../assets/images/reload-vip-gift.png";
import bonus from "../assets/images/bonus-box-vip.png";
import lossBack from "../assets/images/loseback-coin.png";
import bigBanner from "../assets/images/vip-banner.png";
import middleBanner from "../assets/images/banner-vip-middle.png";
import bonusBadge from "../assets/images/badge-bonus.png";
import bonusAngel from "../assets/images/angle-bonus.png";
import { VipModal } from "./BonusPage";
import VipBonusTable from "@/components/vip/VipBonusTable";



const vipPerks = [
  { icon: lossBack, title: "Instant Lossback", desc: "Earn rewards back instantly as you play" },
  { icon: bonus, title: "Reload Bonuses", desc: "Receive rewards every day — the more you play, the higher you get." },
  { icon: box, title: "Gameplay Bonuses", desc: "Play across different game types to unlock richer rewards." },
  { icon: lossBack, title: "Top Player Bonuses", desc: "Play at the top to unlock exclusive rewards." },
  { icon: bonus, title: "Fee-Free D & W", desc: "All deposits and withdrawals are fee-free, fiat and crypto." },
  { icon: box, title: "IRL VIP Events & Rewards", desc: "Exclusive real-world VIP experiences." },
  { icon: bonus, title: "Dedicated VIP Host", desc: "Personalized support whenever you need it" },
];
const accessItems = [
  { icon: bonus, title: "Activity", desc: "Consistent and responsible gameplay helps you stand out as a valued player." },
  { icon: lossBack, title: "Loyalty", desc: "Stable and ongoing loyalty increases your chance of unlocking VIP service." },
  { icon: box, title: "No Barriers", desc: "No level or specific game requirements — every player has the opportunity to qualify for VIP." },
];
const faqCategories = ["General", "Benefits"];
const faqs = [
  { q: "How do I become a VIP?", a: "VIP status is awarded based on your activity, loyalty, and gameplay consistency. There are no specific level requirements." },
  { q: "What is the VIP Transfer?", a: "VIP Transfer allows you to transfer your VIP benefits to another platform account under certain conditions." },
  { q: "What makes the rellbet.GAME VIP Club different from others?", a: "Our VIP program focuses on personalized rewards, real-world experiences, and dedicated support without rigid level requirements." },
];
const VipClubPage = ({ isLoggedIn }) => {
  const [faqCategory, setFaqCategory] = useState("General");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-1  space-y-2">
        {/* Hero Banner */}
        {/* <div className="hidden sm:block relative mb-14">
          <div className="relative w-full h-[320px] overflow-hidden rounded-lg">
            <img
              src={bigBanner}
              alt="VIP Background"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <img
              src={coin1}
              className="hidden sm:block absolute top-4 left-6 w-36 animate-float"
              alt=""
            />
            <img
              src={coin2}
              className="hidden sm:block absolute top-4 right-10 w-36 animate-float-delayed"
              alt=""
            />

            <div className="relative z-10 text-center px-4 pt-10">
              <img
                src={middleBanner}
                alt="VIP Crown"
                className="w-1/2 mx-auto "
              />

              <p className="text-[#d6b26a] text-xs sm:text-sm font-semibold tracking-widest uppercase -mt-12">
                Exclusive Rewards
              </p>

              <h1 className="mt-2 text-2xl sm:text-4xl font-extrabold text-[#f5d89b]">
                ELITE VIP EXPERIENCE
              </h1>

              <p className="mt-3 text-xs sm:text-sm text-white/70 max-w-xl mx-auto">
                Instant withdrawal on all VIP rewards, reserved for our elite members.
              </p>
            </div>
          </div>
          <button
            className="
      absolute -bottom-6 left-1/2 -translate-x-1/2
      px-10 py-3 rounded-lg
      bg-gradient-to-b from-[#f5d89b] to-[#d6b26a]
      text-black font-semibold
      shadow-lg
      hover:opacity-90 transition
    "
          >
            Join Now
          </button>
        </div> */}
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

        {open && <VipModal onClose={() => setOpen(false)} />}

        {isLoggedIn && <VipBonusTable isLoggedIn={isLoggedIn} />}


        {/* Premium VIP Rewards */}
        <div className="text-center mt-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Experience <span className="text-primary">Premium VIP Rewards</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vipPerks.slice(0, 6).map((perk, i) => (
            <div key={i} className="bg-card rounded-lg p-6 text-center hover:bg-card-hover transition-colors">
              <div className=" mb-3 ">
                <img src={perk.icon} alt="logo" className="w-24 h-24 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">{perk.title}</h3>
              <p className="text-sm text-muted-foreground">{perk.desc}</p>
            </div>

          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="bg-card rounded-lg p-6 text-center w-full sm:w-auto sm:min-w-[240px]">
            <div className="text-4xl mb-3"><img src={vipPerks[6].icon} alt="logo" className="w-24 h-24 mx-auto" /></div>
            <h3 className="font-semibold mb-2">{vipPerks[6].title}</h3>
            <p className="text-sm text-muted-foreground">{vipPerks[6].desc}</p>
          </div>
          <div className="bg-card rounded-lg p-6  w-full sm:w-auto flex flex-row">
            <div className="">
              <img src={vipPerks[5].icon} alt="logo" className="w-24 h-24 mx-auto" />
            </div>
            <p className="text-muted-foreground text-sm text-center my-auto">More perks are coming...<br />Your VIP journey keeps getting better</p>
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
            <div key={i} className="bg-card rounded-lg p-5 flex items-start gap-4">
              <div className="text-3xl">
                <img src={item.icon} alt="logo" className="w-12 h-12 mx-auto" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Video placeholder */}
        <div className="bg-card rounded-lg aspect-video flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="text-5xl mb-3">
              <video className="w-full rounded-md h-[95%] -mt-3" controls poster="https://bc.game/modules/bonus2/assets/poster-D0tNvOgo.png">
                <source src="https://img2.distributedresourcestorage.com/video/OP177_Kelly_Promo_EN_H_20251218_B.mp4" type="video/mp4"></source>
              </video>
            </div>
            <p>Welcome to rellbet.GAME VIP Club</p>
          </div>
        </div>
        {/* FAQ */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        </div>
        <div className="bg-card rounded-lg overflow-hidden">
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