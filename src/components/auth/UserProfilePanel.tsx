import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, LogOut, Wallet, History, Gift, Star, Shield, Bell, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";

interface UserProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: "wallet", label: "Wallet", icon: Wallet, path: "/wallet/deposit" },
  { id: "history", label: "Bet History", icon: History, path: "/wallet/bet-history" },
  { id: "bonus", label: "Bonus", icon: Gift, path: "/bonus" },
  { id: "vip", label: "VIP Progress", icon: Star, path: "/" },
  { id: "security", label: "Security", icon: Shield, path: "/referal" },
  { id: "notifications", label: "Notifications", icon: Bell, path: "/" },
  { id: "settings", label: "Settings", icon: Settings, path: "/globalSettings" },
];

const UserProfilePanel = ({ isOpen, onClose }: UserProfilePanelProps) => {
  const navigate = useNavigate();
  const { user, logout, fetchProfile } = useAuthStore();
  const [frame, setFrame] = useState<number>(0);

  useEffect(() => {
    if (isOpen) fetchProfile();
  }, [isOpen, fetchProfile]);

  useEffect(() => {
    const saved = localStorage.getItem("frame");
    if (saved) setFrame(Number(saved));
  }, []);
  const imageUrl = user?.profileImage
    ? `https://bc-game-server.onrender.com${user.profileImage}`
    : "";
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-80 bg-card border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Profile</h2>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar onClick={() => {
                    if (!user) {
                      navigate("/login"); 
                    } else {
                      navigate("/profile");
                    }
                  }}
                    className={`w-16 h-16 cursor-pointer
    ${frame === 1 ? "ring-4 ring-yellow-400" :
                        frame === 2 ? "ring-4 ring-blue-500" :
                          frame === 3 ? "ring-4 ring-pink-500" : ""}
  `}>
                    <AvatarImage
                      src={imageUrl || undefined}
                      alt={user?.username || "User"}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                      {user?.username
                        ? user.username.charAt(0).toUpperCase()
                        : "G"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute -bottom-1 -right-1 bg-vip text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    VIP
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{user?.username || "Guest"}</h3>
                  <p className="text-sm text-muted-foreground">Level 1</p>
                  <div className="mt-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full w-1/4 bg-primary rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Balance */}
            <div className="p-4 border-b border-border">
              <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
              <p className="text-2xl font-bold text-foreground">ট {user?.balance ? Number(user.balance).toFixed(2) : "0.00"}</p>
              <div className="flex items-center gap-2 mt-3">
                <button onClick={() => navigate("/wallet/deposit")} className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm">
                  Deposit
                </button>
                <button onClick={() => navigate("/wallet/withdraw")} className="flex-1 py-2 rounded-lg bg-secondary text-foreground font-medium text-sm">
                  Withdraw
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto p-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Logout */}
            <div className="p-4 border-t border-border">
              <button onClick={() => {
                logout();
                onClose();
                navigate("/");
              }} className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-destructive/10 text-destructive font-medium text-sm hover:bg-destructive/20 transition-colors">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UserProfilePanel;
