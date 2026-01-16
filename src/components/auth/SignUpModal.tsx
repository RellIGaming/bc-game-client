import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, RefreshCw, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration:", { email, username, password });
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
            className="w-full max-w-md bg-card rounded-2xl overflow-hidden"
          >
            {/* Form */}
            <div className="p-6 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              <h2 className="text-xl font-bold text-foreground mb-6">Registration</h2>

              <form onSubmit={handleSubmit} className="space-y-2">
                <div>
                  <Input
                    type="text"
                    placeholder="Email / Phone Number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-secondary border-border h-10"
                  />
                </div>

                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-secondary border-border h-10 pr-12"
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
                    className="bg-secondary border-border h-10 pr-12"
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
                  <ChevronDown className="w-4 h-4 "/>
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
                      I agree to receive marketing promotions from Rellbet.
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base"
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

              <div className="mt-2">
                <p className="text-center text-sm text-muted-foreground mb-4">Sign up with</p>
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