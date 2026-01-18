import { X, Gift, Ticket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BonusDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const bonusCards = [
  { id: 1, title: "Daily Bonus", description: "Available at VIP 2", icon: "🎁", status: "locked" },
  { id: 2, title: "BCD Rollback", description: "Locked BCD: 0 BCD\nReady to claim: 0 BCD", icon: "💰", action: "Claim" },
  { id: 3, title: "Phone Verification", description: "Verify your phone now to protect your account.", icon: "📱", action: "Go Verify" },
  { id: 4, title: "Telegram Subscription", description: "Connect your TG account, join our TG channel to claim more daily bonuses!", icon: "✈️", action: "Go Verify" },
  { id: 5, title: "Email Verification", description: "Verify your email now to protect your account.", icon: "📧", action: "Claim", highlight: true },
  { id: 6, title: "Quests", description: "Daily Quests: 0/1\nWeekly Quests: —", icon: "⚔️", action: "Claim" },
  { id: 7, title: "Challenge", description: "Challenges com...\nPri rewards: 0/4 0 BCD", icon: "🏆", action: "View" },
  { id: 8, title: "Lucky Spin", description: "VIP Spin: Reach VIP 6\nDaily Spin: 00:12:55:55", icon: "🎰", action: "Claim" },
  { id: 9, title: "Vault Pro", description: "My Holdings\nTotal Return: +0.60 +0.60", icon: "🔐", action: "Transfer In" },
];

const vipBenefits = [
  { icon: "💰", title: "Weekly Cashback", description: "Personalised cash drop every Friday" },
  { icon: "⚽", title: "Sports Weekly Cashback", description: "Up to $1,000 every Saturday" },
  { icon: "🌮", title: "Taco Tuesday", description: "Snag your exclusive Taco Bonus every" },
];

const BonusDashboardModal = ({ isOpen, onClose }: BonusDashboardModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-card border border-border rounded-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
              <h2 className="text-xl font-bold text-foreground">Bonus</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
                  <span className="text-muted-foreground text-sm">Redeem your bonus here.</span>
                </div>
                <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 rounded-lg px-4 py-2 transition-colors">
                  <Ticket className="w-4 h-4 text-primary" />
                  <span className="text-foreground text-sm font-medium">Redeem Code</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Top Banners */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bonus Games Banner */}
                <div className="bg-gradient-to-r from-orange-600 to-yellow-500 rounded-xl p-4 relative overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-sm text-white/80">Total Bonus Games Current:</p>
                    <p className="text-2xl font-bold text-white">$0.00</p>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-xs text-white/70">Total VIP Bonus</p>
                        <p className="text-white font-medium">—</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/70">Total Sports Bonus</p>
                        <p className="text-white font-medium">—</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/70">Total Locked Bonus</p>
                        <p className="text-white font-medium">—</p>
                      </div>
                    </div>
                    <button className="mt-4 text-white text-sm underline">Details &gt;</button>
                  </div>
                </div>

                {/* Monthly Deposit Bonus */}
                <div className="bg-gradient-to-r from-purple-700 to-indigo-600 rounded-xl p-4 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-white">Monthly Deposit Bonus</h3>
                    <p className="text-sm text-white/80">Get up to +0.00 +0.00</p>
                    <div className="mt-4">
                      <p className="text-xs text-white/70">Currently: Reset 30days remaining</p>
                      <div className="flex items-center gap-2 mt-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-xs text-white/70">Deposit bonus will be added to your</span>
                      </div>
                    </div>
                    <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
                      Deposit Now
                    </button>
                  </div>
                </div>
              </div>

              {/* VIP Bonus Section */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">VIP Bonus</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* VIP Level Card */}
                  <div className="bg-secondary rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">V</span>
                        </div>
                        <div>
                          <p className="text-foreground font-bold">VIP 0</p>
                          <p className="text-xs text-muted-foreground">0 XP</p>
                        </div>
                      </div>
                      <button className="text-primary text-sm">View Level Up Details</button>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Total VIP Bonus Claimed</span>
                        <span>+500</span>
                      </div>
                      <div className="h-2 bg-background rounded-full overflow-hidden">
                        <div className="h-full w-0 bg-primary rounded-full" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Available at VIP 22</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Bet to wXP to Claim 1.5 × XP</p>
                  </div>

                  {/* VIP Benefits */}
                  <div className="bg-secondary rounded-xl p-4">
                    <h4 className="text-sm font-bold text-primary mb-3">Hit VIP 22 – Your Bonus Buffet Awaits!</h4>
                    <div className="space-y-3">
                      {vipBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <span className="text-xl">{benefit.icon}</span>
                          <div>
                            <p className="text-foreground font-medium text-sm">{benefit.title}</p>
                            <p className="text-xs text-muted-foreground">{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* General Bonus Section */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  General Bonus
                  <span className="text-xs text-muted-foreground">i</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {bonusCards.map((card) => (
                    <div
                      key={card.id}
                      className={`bg-secondary rounded-xl p-4 relative ${
                        card.highlight ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      {card.status === "locked" && (
                        <span className="absolute top-2 right-2 text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">
                          i
                        </span>
                      )}
                      <div className="text-3xl mb-2">{card.icon}</div>
                      <h4 className="text-foreground font-medium text-sm mb-1">{card.title}</h4>
                      <p className="text-xs text-muted-foreground whitespace-pre-line mb-3">
                        {card.description}
                      </p>
                      {card.action && (
                        <button
                          className={`w-full py-2 rounded-lg text-sm font-medium ${
                            card.highlight
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {card.action}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Bonus */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">Special Bonus</h3>
                <div className="text-muted-foreground text-sm">Coming soon...</div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BonusDashboardModal;
