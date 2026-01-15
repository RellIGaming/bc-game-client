import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, LogOut, Wallet, History, Gift, Star, Shield, Bell, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "history", label: "Bet History", icon: History },
  { id: "bonus", label: "Bonus", icon: Gift },
  { id: "vip", label: "VIP Progress", icon: Star },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

const UserProfilePanel = ({ isOpen, onClose }: UserProfilePanelProps) => {
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
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                      <User className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute -bottom-1 -right-1 bg-vip text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    VIP
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Guest User</h3>
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
              <p className="text-2xl font-bold text-foreground">$0.00</p>
              <div className="flex items-center gap-2 mt-3">
                <button className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm">
                  Deposit
                </button>
                <button className="flex-1 py-2 rounded-lg bg-secondary text-foreground font-medium text-sm">
                  Withdraw
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto p-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Logout */}
            <div className="p-4 border-t border-border">
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-destructive/10 text-destructive font-medium text-sm hover:bg-destructive/20 transition-colors">
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
