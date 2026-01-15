const Footer = () => {
  const footerLinks = {
    casino: ["Casino Promo", "Slots", "Live Casino", "New Releases", "Recommended", "Table Game", "Blackjack", "Baccarat"],
    sports: ["Sports Home", "Live", "Rules", "Sport Betting Insights"],
    support: ["VIP Club", "Referral", "Promotions", "Refer-a-friend", "Lottery", "BC Store"],
    legal: ["License", "Help Center", "Cookie Assets", "Tutorials", "FAQ", "Privacy Policy", "Terms of Service"],
  };

  return (
    <footer className="bg-gaming-dark border-t border-border mt-8">
      <div className="container py-8 lg:py-12">
        {/* Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">Crypto Online Casino</h3>
            <p className="text-sm text-muted-foreground">
              Explore 5000+ slots, live dealer & crypto games, plus full sports betting with over 100,000 events and crypto payment. We proudly for industry and audit third party rewards.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">Keep us improve your experience</h3>
            <p className="text-sm text-muted-foreground">
              Got searched for your valuable feedback? Contact our customer support for any feedback or if you have any questions about our platform or service.
            </p>
          </div>
        </div>

        {/* Responsible Gaming Badges */}
        <div className="flex flex-wrap items-center gap-4 py-4 border-y border-border mb-8">
          <span className="text-sm text-muted-foreground">Responsible Gaming:</span>
          {["SIGMA", "🛡️ Responsible Gambling", "GamCare", "betblocker"].map((badge, i) => (
            <span key={i} className="text-xs text-muted-foreground px-2 py-1 bg-secondary rounded">
              {badge}
            </span>
          ))}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Casino</h4>
            <ul className="space-y-2">
              {footerLinks.casino.slice(0, 5).map((link) => (
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
              {footerLinks.legal.map((link) => (
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">G</span>
            </div>
            <span className="text-sm font-bold text-foreground">GAME.WIN</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Join Our Global Community</span>
            <div className="flex items-center gap-2">
              {["📱", "✈️", "🐦", "💬", "📺"].map((icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-4">
          <p className="text-xs text-muted-foreground">
            © 2024 GAME.WIN | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
