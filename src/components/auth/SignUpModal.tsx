import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, RefreshCw, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Logo from "@/components/ui/Logo";
import { signup } from "@/services/api";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

const SignUpModal = ({ isOpen, onClose, onSwitchToSignIn }: SignUpModalProps) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!agreeTerms) {
    alert("You must agree to the User Agreement");
    return;
  }

  try {
    const res = await signup({
      email,
      username,
      password,
    });

    // Save token
    localStorage.setItem("token", res.data.token);

    // Optional: store user
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // Close modal or redirect
    onClose();

    console.log("Signup success:", res.data);
  } catch (error: any) {
    alert(error?.response?.data?.message || "Signup failed");
  }
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
                <div className="text-6xl">🏆</div>
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
                <p className="text-muted-foreground">Registration & Get Welcome Bonus</p>
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

              <h2 className="text-xl font-bold text-foreground mb-6">Registration</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Email / Phone Number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-secondary border-border h-12"
                  />
                </div>

                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-secondary border-border h-12 pr-12"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-secondary border-border h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <button type="button" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                  Enter Referral / Promo Code
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                      className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the <span className="text-foreground font-medium">User Agreement</span> & confirm I am at least 18 years old
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="marketing"
                      checked={agreeMarketing}
                      onCheckedChange={(checked) => setAgreeMarketing(checked as boolean)}
                      className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <label htmlFor="marketing" className="text-sm text-muted-foreground">
                      I agree to receive marketing promotions from GAME.WIN.
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base"
                >
                  Registration
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Already have an account?{" "}
                <button onClick={onSwitchToSignIn} className="text-primary font-medium hover:underline">
                  Login
                </button>
              </p>

              <div className="mt-6">
                <p className="text-center text-sm text-muted-foreground mb-4">Log in directly with</p>
                <div className="flex items-center justify-center gap-3">
                  {["G", "X", "✈", "👾", "〰", "💬", "◎"].map((icon, i) => (
                    <button
                      key={i}
                      className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center text-muted-foreground transition-colors"
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignUpModal;
