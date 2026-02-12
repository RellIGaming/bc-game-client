import bcLogo from "../../assets/images/logo.png";
import { Github, Globe, Icon, Mail, MessageCircle, Phone, Send, Share2 } from "lucide-react";
import HelpUs from "./HelpUs";
import GameFooterLogo from "./GameFooterLogo";


const Footer = () => {

  const footerLinks = {
    casino: ["Casino Home", "Slots", "Live Casino", "New Releases", "Recommended", "Table Game", "Blackjack", "Roulette", "Provides"],
    sports: ["Sports Home", "Live Sports", "Football(Soccer)", "Cricket", "BasketBall", "Tennis", "FIFA", "Sports Rules"],
    promo: ["VIP Club", "Bonus", "Promotions", "Affiliate", "Refer-a-friend", "Rellbet Shops"],
    supportLegal: ["Help Center", "FAQ", "Live Support", "Licenses", "Privacy Policy", "Terms of Service", ,],
  };


  return (
    <footer className="w-full bg-sidebar border-t border-border/30 px-4 py-4">

      <div className="py-1 lg:py-4">

        <HelpUs />
        <GameFooterLogo />
        {/* Responsible Gaming Badges */}
        {/* <div className="flex flex-wrap items-center gap-4 py-4 border-y border-border/30 mb-8">
          {["SIGMA", "🛡️ Responsible Gambling", "GamCare", "betblocker"].map((badge, i) => (
            <span key={i} className="text-xs text-muted-foreground px-3 py-1.5 bg-secondary rounded-lg">
              {badge}
            </span>
          ))}
        </div> */}

        {/* Links Grid */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 mb-8 px-2">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Casino</h4>
              <ul className="space-y-1">
                {footerLinks.casino.slice(0, 6).map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Sports</h4>
              <ul className="space-y-2">
                {footerLinks.sports.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Promo</h4>
              <ul className="space-y-2">
                {footerLinks.promo.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Support & Legal</h4>
              <ul className="space-y-2">
                {footerLinks.supportLegal.slice(0, 8).map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">About Us</h4>
              <ul className="space-y-2">
                {["Licence", "News ", "Work with us", "Business Contacts", "Help Desk", "Verify Representative", "Design Resource",].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Social & Community */}
        <div className="flex flex-row lg:flex-row items-center justify-center gap-6 py-4  bg-[#213744] sm:bg-transparent 
                p-4 sm:p-0 
                rounded-lg sm:rounded-none mt-2">
          {/* <div className="flex items-center gap-3">
            <img src={bcLogo} alt="Rellbet" className="w-6 h-6 w-auto" />
          </div> */}
         <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-xs text-muted-foreground">Join Our Community</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                {[MessageCircle, Share2, Send, Phone, Mail, Globe].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-8 h-8 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Join Our Local Community</span>
            <div className="flex items-center gap-2">
              {[Phone, Mail, Globe].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div> */}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-6 mx-2">
          <div className="flex flex-col gap-1">
            <div className="flex"><img src={bcLogo} alt="Rellbet" className="h-8 w-10 pr-2" /> <span className="text-xl font-bold">Rellbet</span></div>
            <div className="text-[12px] text-muted-foreground max-w-md font-bold">
              Rellbet offers an entertaining gaming experience that may involve certain risks.  You must be at least 18 years old to use this site.              </div>
          </div>
          <div className="flex flex-col gap-1">
        <div className="flex"><img src={bcLogo} alt="Rellbet" className="h-8 w-10 pr-2" /> <span className="text-xl font-bold">Rellbet</span></div>
            <div className="text-[12px] text-muted-foreground max-w-md font-bold">
            Rellbet is operated by Rell Corporation.  Unauthorized use, copying, or distribution of any content is strictly prohibited.            </div>
        </div>
</div>
        {/* Copyright */}
        <div className="text-center pt-6 border-t border-border/30 mt-2">
          <p className="text-[10px] text-muted-foreground">
            Copyright © 2025 Rellbet.com All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
