import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

const SignUpModal = ({ isOpen, onClose, onSwitchToSignIn }: SignUpModalProps) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    if (!password) return { level: 0, text: "", color: "" };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    if (strength <= 1) return { level: 1, text: "Weak", color: "bg-red-500" };
    if (strength === 2) return { level: 2, text: "Medium", color: "bg-yellow-500" };
    if (strength === 3) return { level: 3, text: "Good", color: "bg-blue-500" };
    return { level: 4, text: "Strong", color: "bg-primary" };
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration:", { email, username, password, promoCode });
  };

  const generateUsername = () => {
    const adjectives = ["Lucky", "Swift", "Cool", "Epic", "Wild"];
    const nouns = ["Player", "Gamer", "Star", "Hero", "Legend"];
    const randomNum = Math.floor(Math.random() * 1000);
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    setUsername(`${adj}${noun}${randomNum}`);
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
            className="w-full max-w-md bg-card rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto scrollbar-hide"
          >
            {/* Form */}
            <div className="p-6 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              <h2 className="text-xl font-bold text-foreground mb-6">Sign Up</h2>

              <form onSubmit={handleSubmit} className="space-y-3">
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
                    onClick={generateUsername}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2">
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

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 flex gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={cn(
                              "flex-1 h-1 rounded-full transition-colors",
                              level <= passwordStrength.level
                                ? passwordStrength.color
                                : "bg-secondary"
                            )}
                          />
                        ))}
                      </div>
                      <span className={cn("text-xs font-medium", 
                        passwordStrength.level <= 1 ? "text-red-500" :
                        passwordStrength.level === 2 ? "text-yellow-500" :
                        passwordStrength.level === 3 ? "text-blue-500" :
                        "text-primary"
                      )}>
                        {passwordStrength.text}
                      </span>
                    </div>
                  )}
                </div>

                {/* Promo Code Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPromoCode(!showPromoCode)}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  Enter Referral / Promo Code
                  {showPromoCode ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {/* Promo Code Input */}
                <AnimatePresence>
                  {showPromoCode && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <Input
                        type="text"
                        placeholder="Enter referral or promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="bg-secondary border-border h-12"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-3 pt-2">
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
                      I want to receive Promotion
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base"
                >
                  Sign Up
                </Button>
              </form>

              <div className="mt-4">
                <p className="text-center text-sm text-muted-foreground mb-4">Sign up directly with</p>
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

              <p className="text-center text-sm text-muted-foreground mt-4">
                Already have an account?{" "}
                <button onClick={onSwitchToSignIn} className="text-primary font-medium hover:underline">
                  Sign In
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignUpModal;
