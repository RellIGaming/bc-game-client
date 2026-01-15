import bcLogo from "@/assets/images/bc-logo.svg";

const Footer = () => {
  const footerLinks = {
    casino: ["Casino Promo", "Slots", "Live Casino", "New Releases", "Recommended", "Table Game", "Blackjack", "Baccarat"],
    sports: ["Sports Home", "Live", "Rules", "Sport Betting Insights"],
    support: ["VIP Club", "Referral", "Promotions", "Refer-a-friend", "Lottery", "BC Store"],
    supportLegal: ["Licenses", "Help Center", "Cookie Assets", "Tutorials", "FAQ", "Privacy Policy", "Terms of Service", "Live Support", "Help Representative", "Verify This Site"],
  };

  return (
    <footer className="bg-sidebar border-t border-border/30 mt-8">
      <div className="container py-8 lg:py-12">
        {/* Crypto Online Casino Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-base font-bold text-foreground mb-2">Crypto Online Casino</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Explore 5000+ slots, live dealer tables, crash and original games, plus full sports betting with one-click login at any time. Instant deposits, low fees, and withdrawals.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Our proprietary fair system is the distributed PRNG concept model. Use web3 fairness casino and sports platform. Design degen memes, and your mobile money safe. Easy play on this website apps. How to make real passive wealth. Round hold NPC tool are so user-connect. Simply users and built for real-money crypto gaming.
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground mb-2">Help us improve your experience</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Got searched for your valuable feedback!
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Feel free: <span className="text-primary cursor-pointer hover:underline">Feedback Form</span>
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              If you find any vulnerabilities file or error, please contact us ASAP for internal issues (Only any related issues will be rewarded)
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1">
              Send to email: <span className="text-primary">security@bc.game</span>
            </p>
          </div>
        </div>

        {/* Responsible Gaming Badges */}
        <div className="flex flex-wrap items-center gap-4 py-4 border-y border-border/30 mb-8">
          {["SIGMA", "🛡️ Responsible Gambling", "GamCare", "betblocker"].map((badge, i) => (
            <span key={i} className="text-xs text-muted-foreground px-3 py-1.5 bg-secondary rounded-lg">
              {badge}
            </span>
          ))}
        </div>

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
              {["News 📰", "We're Hiring 🎉", "Business Contacts 📧", "Help Center", "Help Representative", "Verify This Site", "Blog Posts", "Responsible Gambling", "API", "Today Releases 🎉", "Live Support 💬", "eSports Betting", "CEO Infomics"].map((link) => (
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
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 py-4 border-t border-border/30">
          <div className="flex items-center gap-3">
            <img src={bcLogo} alt="BC.GAME" className="h-6 w-auto" />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-xs text-muted-foreground">Join Our Global Community</span>
            <div className="flex items-center gap-2">
              {["📱", "✈️", "🐦", "💬", "📺", "📷"].map((icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Join Our Local Community</span>
            <div className="flex items-center gap-2">
              {["🇺🇸", "🇬🇧", "🇫🇷", "🇩🇪"].map((flag, i) => (
                <span key={i} className="text-lg cursor-pointer hover:scale-110 transition-transform">{flag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-6">
          <div className="flex items-center gap-3">
            <img src={bcLogo} alt="BC.GAME" className="h-5 w-auto opacity-60" />
            <div className="text-[10px] text-muted-foreground max-w-md">
              The ultimate crypto gaming platform, is ready for the fun enthusiast. We're inspired by the needs and feedback of our players. A fresh approach and the dedication for continuous platform. 
            </div>
          </div>
          <div className="text-[10px] text-muted-foreground max-w-md">
            BC.GAME is operated by Paradigm B.V., registered under number 166165. Address: Korporaalweg 10, Curacao BC.GAME is licensed under...
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-border/30 mt-6">
          <p className="text-[10px] text-muted-foreground">
            Copyright © 2025 Blockdrake Gaming Limited. All Rights Reserved. | SUPPORT@BC.GAME | +599-9-5555123 TI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
