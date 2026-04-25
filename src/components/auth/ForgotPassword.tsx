import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Loader2, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/authStore";

interface ForgotPasswordProps {
    isOpen: boolean;
    onClose: () => void;
    onBackToLogin: () => void;
}

const ForgotPassword = ({ isOpen, onClose, onBackToLogin }: ForgotPasswordProps) => {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);

    const { forgotPassword, loading } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            alert("Please enter your email");
            return;
        }

        try {
            await forgotPassword(email);
            setSuccess(true);
            setEmail("");
        } catch (err: any) {
            alert(err.message || "Failed to send reset link ❌");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="w-full max-w-md bg-card rounded-2xl p-6 relative"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary"
                        >
                            <X className="w-5 h-5 text-muted-foreground" />
                        </button>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-foreground mb-2">
                            Forgot Password
                        </h2>
                        <p className="text-sm text-muted-foreground mb-6">
                            Enter your email to receive a reset link
                        </p>

                        {/* Success State */}
                        {success ? (
                            <div className="text-center py-6">
                                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                                <p className="text-foreground font-medium">
                                    Reset link sent successfully 📩
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Please check your email
                                </p>

                                <Button
                                    className="mt-5 w-full"
                                    onClick={() => {
                                        setSuccess(false);
                                        onClose();
                                    }}
                                >
                                    Close
                                </Button>
                            </div>
                        ) : (
                            /* Form */
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-9 bg-secondary border-border"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary text-primary-foreground"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Sending...
                                        </span>
                                    ) : (
                                        "Send Reset Link"
                                    )}
                                </Button>
                                <button
                                    type="button"
                                    onClick={onBackToLogin}
                                    className="w-full text-sm text-muted-foreground hover:text-foreground mt-2"
                                >
                                    Back to Login
                                </button>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ForgotPassword;