import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Key, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import useAuthStore from "@/store/authStore";
import { useParams } from "react-router-dom";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

const ResetPasswordModal = ({
  isOpen,
  onClose,
  onBackToLogin,
}: ResetPasswordModalProps) => {
  const { token } = useParams(); // ✅ GET TOKEN FROM URL
  const [password, setPassword] = useState("");
  const { resetPassword, loading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      alert("Enter new password");
      return;
    }

    try {
      await resetPassword(token!, password); // ✅ CORRECT API

      alert("Password reset successful ✅");

      onBackToLogin(); // go back to login
    } catch (err: any) {
      alert(err.message || "Reset failed ❌");
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
                <Input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary border-border"
                />

                <Button disabled={loading} className="w-full">
                  {loading ? "Resetting..." : "Set New Password"}
                </Button>
              </form>

              <button
                onClick={onBackToLogin}
                className="mt-4 w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Login
              </button>

              {/* <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10 border-border text-foreground hover:bg-secondary"
                >
                  <Key className="w-4 h-4 mr-2" />
                  Reset by Passkey
                </Button> */}
          </div>
        </motion.div>
        </motion.div>
  )
}
    </AnimatePresence >
  );
};

export default ResetPasswordModal;
