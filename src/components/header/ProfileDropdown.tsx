import { 
  Wallet, 
  ArrowDownToLine, 
  Coins, 
  RotateCcw, 
  History, 
  BarChart3, 
  Crown, 
  Lock, 
  Users, 
  User, 
  Settings, 
  LogOut 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const ProfileDropdown = ({ isOpen, onClose, onLogout }: ProfileDropdownProps) => {
  const menuItems: MenuItem[] = [
    { icon: <Wallet className="w-5 h-5" />, label: "Wallet" },
    { icon: <ArrowDownToLine className="w-5 h-5" />, label: "Withdraw" },
    { icon: <Coins className="w-5 h-5" />, label: "Buy Crypto" },
    { icon: <RotateCcw className="w-5 h-5" />, label: "Transactions" },
    { icon: <History className="w-5 h-5" />, label: "Bet History" },
    { icon: <BarChart3 className="w-5 h-5" />, label: "Rollover Overview" },
    { icon: <Crown className="w-5 h-5" />, label: "VIP Club" },
    { icon: <Lock className="w-5 h-5" />, label: "Vault Pro" },
    { icon: <Users className="w-5 h-5" />, label: "Referral" },
    { icon: <User className="w-5 h-5" />, label: "My Profile" },
    { icon: <Settings className="w-5 h-5" />, label: "Global Settings" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="py-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
              
              {/* Divider */}
              <div className="border-t border-border my-1" />
              
              {/* Logout */}
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Log Out</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileDropdown;
