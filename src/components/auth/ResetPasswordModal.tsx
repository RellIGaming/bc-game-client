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
                <div>
                  <Input
                    type="text"
                    placeholder="Username or Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-secondary border-border h-10"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base"
                >
                  Reset Password
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10 border-border text-foreground hover:bg-secondary"
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
