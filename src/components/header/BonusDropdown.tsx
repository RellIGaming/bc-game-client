import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BonusDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onBonusDashboard: () => void;
}

const BonusDropdown = ({ isOpen, onClose, onBonusDashboard }: BonusDropdownProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="
    fixed lg:absolute
    top-16 lg:top-auto
    left-0 lg:left-auto
    right-0
    w-full lg:w-80
    mt-0 lg:mt-2
    bg-card border border-border
    rounded-t-lg lg:rounded-lg
    shadow-2xl
    z-50
    overflow-hidden" >
            {/* Email Verification */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <h4 className="text-foreground font-semibold">Email Verification</h4>
                    <div className="flex items-center gap-1">
                      <span className="text-orange-500">🟠</span>
                      <span className="text-muted-foreground text-sm">₹90.67</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Claim
                </button>
              </div>
            </div>

            {/* Bonus Dashboard */}
            <button
              onClick={onBonusDashboard}
              className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
            >
              <span className="text-foreground font-medium">Bonus Dashboard</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BonusDropdown;
