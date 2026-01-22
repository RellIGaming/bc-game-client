import bcLogo from "../../assets/images/logo.png";
import { Github, Globe, Icon, Mail, MessageCircle, Phone, Send, Share2 } from "lucide-react";
import HelpUs from "./HelpUs";


const Footer = () => {

  const footerLinks = {
    casino: ["Casino Promo", "Slots", "Live Casino", "New Releases", "Recommended", "Table Game", "Blackjack", "Baccarat"],
    sports: ["Sports Home", "Live", "Rules", "Sport Betting Insights"],
    support: ["VIP Club", "Referral", "Promotions", "Refer-a-friend", "Lottery", "BC Store"],
    supportLegal: ["Licenses", "Help Center", "FAQ", "Privacy Policy", "Terms of Service", "Live Support",],
  };


  return (
    <footer className="bg-sidebar border-t border-border/30 mx-6 p-4 hidden md:block">
      <div className="py-4 lg:py-4">

        <HelpUs />
        {/* Responsible Gaming Badges */}
        {/* <div className="flex flex-wrap items-center gap-4 py-4 border-y border-border/30 mb-8">
          {["SIGMA", "🛡️ Responsible Gambling", "GamCare", "betblocker"].map((badge, i) => (
            <span key={i} className="text-xs text-muted-foreground px-3 py-1.5 bg-secondary rounded-lg">
              {badge}
            </span>
          ))}
        </div> */}

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Casino</h4>
            <ul className="space-y-2">
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
            <h4 className="text-sm font-semibold text-foreground mb-3">Sports</h4>
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
            <h4 className="text-sm font-semibold text-foreground mb-3">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Support & Legal</h4>
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
            <h4 className="text-sm font-semibold text-foreground mb-3">Support</h4>
            <ul className="space-y-2">
              {["News 📰", "We're Hiring 🎉", "Business Contacts 📧", "Help Center", "Help Representative", "Live Support 💬",].map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Social & Community */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 py-4 border-t border-b border-border/30">
          <div className="flex items-center gap-3">
            <img src={bcLogo} alt="Rellbet" className="w-6 h-6 w-auto" />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-xs text-muted-foreground">Join Our Global Community</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                {[MessageCircle, Share2, Send, Phone, Mail, Globe].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>

            </div>
          </div>

          <div className="flex items-center gap-4">
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
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-6">
          <div className="flex items-center gap-3">
            <img src={bcLogo} alt="Rellbet" className="h-5 w-auto opacity-60" />
            <div className="text-[10px] text-muted-foreground max-w-md">
              The ultimate crypto gaming platform, is ready for the fun enthusiast. We're inspired by the needs and feedback of our players. A fresh approach and the dedication for continuous platform.
            </div>
          </div>
          <div className="text-[10px] text-muted-foreground max-w-md">
            Rellbet is operated by Paradigm B.V., registered under number 166165. Address: Korporaalweg 10, Curacao Rellbet is licensed under...
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-border/30 mt-6">
          <p className="text-[10px] text-muted-foreground">
            Copyright © 2025 Blockdrake Gaming Limited. All Rights Reserved. | SUPPORT@Rellbet | +599-9-5555123 TI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
