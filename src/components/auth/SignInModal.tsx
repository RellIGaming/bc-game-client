import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, Key } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
  onForgotPassword: () => void;
}

const SignInModal = ({ isOpen, onClose, onSwitchToSignUp, onForgotPassword }: SignInModalProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { username, password });
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

              <h2 className="text-xl font-bold text-foreground mb-6">Login</h2>

              {/* Login Method Toggle */}
              <div className="flex rounded-lg bg-secondary p-1 mb-6">
                <button
                  onClick={() => setLoginMethod("password")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors ${
                    loginMethod === "password"
                      ? "bg-background text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Key className="w-4 h-4" />
                  Password
                </button>
                <button
                  onClick={() => setLoginMethod("otp")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors ${
                    loginMethod === "otp"
                      ? "bg-background text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>📱</span>
                  One-time Code
                </button>
              </div>

              <p className="text-sm text-muted-foreground text-center mb-4">
                Download the App for more fun 📲
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-secondary border-border h-12"
                  />
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

                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-sm text-muted-foreground hover:text-foreground block ml-auto"
                >
                  Forgot your password?
                </button>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base"
                >
                  Login
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-4">
                New to GAME.WIN?{" "}
                <button onClick={onSwitchToSignUp} className="text-primary font-medium hover:underline">
                  Create account
                </button>
              </p>

              <div className="mt-6">
                <p className="text-center text-sm text-muted-foreground mb-4">Log in directly with</p>
                <Button
                  variant="outline"
                  className="w-full h-12 border-border text-foreground hover:bg-secondary mb-3"
                >
                  <Key className="w-4 h-4 mr-2" />
                  Login with passkey
                </Button>
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

export default SignInModal;