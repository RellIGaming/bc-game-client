import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Key, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

const ResetPasswordModal = ({ isOpen, onClose, onBackToLogin }: ResetPasswordModalProps) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset password for:", username);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl bg-card rounded-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Left Side - Promo */}
            <div className="hidden md:flex flex-col items-center justify-center p-8 bg-gradient-to-br from-card to-gaming-dark flex-1">
              <div className="mb-6">
                <Logo />
              </div>
              <div className="w-64 h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6">
                <div className="text-6xl">🔐</div>
              </div>
              <div className="flex items-center gap-8 text-center">
                <div>
                  <div className="flex items-center gap-1 text-primary font-bold">
                    <span>📊</span> 470%
                  </div>
                  <p className="text-xs text-muted-foreground">Welcome deposit bonus</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-primary font-bold">
                    <span>💎</span> 5 BTC
                  </div>
                  <p className="text-xs text-muted-foreground">Free daily lucky spin</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-primary font-bold">
                    <span>🎁</span> Free Perks
                  </div>
                  <p className="text-xs text-muted-foreground">Daily free rewards</p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <h2 className="text-2xl font-bold text-foreground italic">Stay Untamed</h2>
                <p className="text-muted-foreground">Sign Up & Get Welcome Bonus</p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-6 md:p-8 flex-1 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              <h2 className="text-xl font-bold text-foreground mb-6">Reset Password</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Username or Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-secondary border-border h-12"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base"
                >
                  Reset Password
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 border-border text-foreground hover:bg-secondary"
                >
                  <Key className="w-4 h-4 mr-2" />
                  Reset by Passkey
                </Button>

                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Login
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResetPasswordModal;
