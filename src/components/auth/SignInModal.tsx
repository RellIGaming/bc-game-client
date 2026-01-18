import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, Key, Smartphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signin } from "@/services/api";
import { toast } from "sonner";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
  onForgotPassword: () => void;
  setIsLoggedIn: (value: boolean) => void;
}

const SignInModal = ({ isOpen, onClose, onSwitchToSignUp, onForgotPassword,setIsLoggedIn }: SignInModalProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password");

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    if (loginMethod === "password") {
      const res = await signin({
        identifier: emailOrPhone || username, // ✅ KEY FIX
        password,
      });

      localStorage.setItem("token", res.token);
       setIsLoggedIn(true);
       toast.success("Login successful! 🎉");
      onClose();
    } else {
      alert("OTP login not implemented yet");
    }
  } catch (err: any) {
    alert(err.message || "❌ Login failed");
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

              <h2 className="text-xl font-bold text-foreground mb-6">Sign In</h2>

              {/* Login Method Toggle */}
              <div className="flex rounded-lg bg-secondary p-1 mb-4">
                <button
                  onClick={() => setLoginMethod("password")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    loginMethod === "password"
                      ? "bg-card text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Key className="w-4 h-4" />
                  Password
                </button>
                <button
                  onClick={() => setLoginMethod("otp")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    loginMethod === "otp"
                      ? "bg-card text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  One-time Code
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {loginMethod === "password" ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <div>
                      <Input
                        type="text"
                        placeholder="Email / Phone Number"
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        className="bg-secondary border-border h-12"
                      />
                    </div>

                    <p className="text-sm text-muted-foreground">
                      We'll send a 6-digit code to your device
                    </p>
                  </>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base"
                >
                  {loginMethod === "password" ? "Sign In" : "Send One-time Code"}
                </Button>
              </form>

              <div className="mt-4">
                <p className="text-center text-sm text-muted-foreground mb-4">Log in directly with</p>
                <Button
                  variant="outline"
                  className="w-full h-12 border-border text-foreground hover:bg-secondary mb-3"
                >
                  <Key className="w-4 h-4 mr-2" />
                  Sign In with passkey
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

              <p className="text-center text-sm text-muted-foreground mt-4">
                New to Rellbet?{" "}
                <button onClick={onSwitchToSignUp} className="text-primary font-medium hover:underline">
                  Create account
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignInModal;
