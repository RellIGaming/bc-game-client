
import {
  User,
  ChevronLeft,
  ChevronRight,
  Wallet,
  ArrowDownToLine,
  Coins,
  RotateCcw,
  History,
  BarChart3,
  Crown,
  Lock,
  Copy,
  Eye,
  Bell,
  Gift,
  Users,
  Settings,
  Globe,
  DollarSign,
  Moon,
  MessageSquare,
  Headphones,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import profileBanner from "../../assets/images/profile-banner-mob.png"

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  onClick?: () => void;
}

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const menuItems: MenuItem[] = [
  { icon: <Wallet className="w-5 h-5" />, label: "Wallet", path: "/" },
  { icon: <ArrowDownToLine className="w-5 h-5" />, label: "Withdraw", path: "/" },
  { icon: <Coins className="w-5 h-5" />, label: "Buy Crypto", path: "/" },
  { icon: <RotateCcw className="w-5 h-5" />, label: "Transactions", path: "/" },
  { icon: <History className="w-5 h-5" />, label: "Bet History", path: "/" },
  { icon: <BarChart3 className="w-5 h-5" />, label: "Rollover Overview", path: "/" },
  { icon: <Crown className="w-5 h-5" />, label: "VIP Club", path: "/" },
  { icon: <Lock className="w-5 h-5" />, label: "Vault Pro", path: "/" },
  { icon: <Users className="w-5 h-5" />, label: "Referral", path: "/" },
  { icon: <User className="w-5 h-5" />, label: "My Profile", path: "/" },
  { icon: <Settings className="w-5 h-5" />, label: "Global Settings", path: "/" },
];

const ProfileDropdown = ({ isOpen, onClose, onLogout }: ProfileDropdownProps) => {

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          {isMobile ? (
            <MobileProfile onClose={onClose} onLogout={onLogout} isOpen={false} />
          ) : (
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
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileDropdown;


export const MobileProfile = ({ isOpen, onClose, onLogout }: ProfileDropdownProps) => {

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-[#0f1c26] text-white overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-transparent">
        <button onClick={onClose}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="text-lg font-semibold">Profile</span>
      </div>

      {/* Banner & User info */}
      <div className="relative">
        <img src={profileBanner} alt="banner" className="w-full h-24 object-cover" />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <ChevronRight className="w-5 h-5 text-white/60" />
        </div>
        <div className="absolute left-4 top-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-xl border-2 border-[#0f1c26]">
            🦁
          </div>
          <div>
            <div className="font-semibold flex items-center gap-1">
              Prince Wahid
              <span className="text-green-400">●</span>
            </div>
            <div className="text-xs text-white/60 flex items-center gap-1">
              ID: 1215411
              <Copy className="w-3 h-3 cursor-pointer hover:text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* VIP Section */}
      <div className="px-4 py-3 bg-[#0f1c26]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/80">VIP 0</span>
            <span className="px-2 py-0.5 bg-[#1c3648] text-xs rounded text-white/80">Bronze</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-white/60">
            VIP Club
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
        <div className="relative h-1.5 bg-[#1c3648] rounded-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-[15%] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
        </div>
        <div className="text-right text-xs text-white/40 mt-1">1.5k XP to VIP 2</div>
      </div>

      {/* Balance */}
      <div className="px-4 py-3">
        <div className="text-sm text-white/60 mb-1">Blance</div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold">₹ 00.00</span>
          <Eye className="w-4 h-4 text-white/40 cursor-pointer" />
        </div>

        <div className="flex gap-3 mt-4">
          <button className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] py-2.5 rounded-lg font-semibold transition-colors">
            Deposit
          </button>
          <button className="flex-1 bg-[#1c3648] hover:bg-[#243f54] py-2.5 rounded-lg transition-colors">
            Withdraw
          </button>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="px-4 py-3">
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: '💳', label: 'Buy' },
            { icon: '🔄', label: 'Swap' },
            { icon: '🏦', label: 'Vault Pro' },
            { icon: '📊', label: 'Statistics' },
          ].map((item) => (
            <button key={item.label} className="flex flex-col items-center gap-2 py-3 bg-[#122634] rounded-xl hover:bg-[#1c3648] transition-colors">
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs text-white/70">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {[
            { icon: '📝', label: 'Transaction' },
            { icon: '🔁', label: 'Rollover' },
            { icon: '📜', label: 'Bet History' },
          ].map((item) => (
            <button key={item.label} className="flex flex-col items-center gap-2 py-3 bg-[#122634] rounded-xl hover:bg-[#1c3648] transition-colors">
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs text-white/70">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="mt-2">
        {/* Notification */}
        <button className="w-full flex justify-between items-center px-4 py-4 border-b border-white/5 hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-white/60" />
            <span>Notification</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 bg-[#3b82f6] rounded-full text-xs flex items-center justify-center">5</span>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </div>
        </button>

        {/* Refer and Earn */}
        <button className="w-full flex justify-between items-center px-4 py-4 border-b border-white/5 hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5 text-white/60" />
            <span>Refer and Earn</span>
          </div>
          <ChevronRight className="w-4 h-4 opacity-50" />
        </button>

        {/* Affiliate */}
        <button className="w-full flex justify-between items-center px-4 py-4 border-b border-white/5 hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-white/60" />
            <span>Affiliate</span>
          </div>
          <ChevronRight className="w-4 h-4 opacity-50" />
        </button>

        {/* Global Settings */}
        <button className="w-full flex justify-between items-center px-4 py-4 border-b border-white/5 hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-white/60" />
            <span>Global Settings</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full" />
            <ChevronRight className="w-4 h-4 opacity-50" />
          </div>
        </button>

        {/* Language */}
        <button className="w-full flex justify-between items-center px-4 py-4 border-b border-white/5 hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-white/60" />
            <span>Language</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-sm">English</span>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </div>
        </button>

        {/* Currency */}
        <button className="w-full flex justify-between items-center px-4 py-4 border-b border-white/5 hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-white/60" />
            <span>Currency</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-sm">USD</span>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </div>
        </button>

        {/* Theme */}
        <button className="w-full flex justify-between items-center px-4 py-4 border-b border-white/5 hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <Moon className="w-5 h-5 text-white/60" />
            <span>Theme</span>
          </div>
          <div className="w-10 h-5 bg-[#3b82f6] rounded-full relative">
            <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
          </div>
        </button>
      </div>

      {/* Premium Support */}
      <div className="p-4">
        <div className="bg-[#122634] rounded-xl p-4 flex items-center gap-3">
          <Headphones className="w-8 h-8 text-[#3b82f6]" />
          <div className="flex-1">
            <div className="font-medium">24/7 Premium Support</div>
            <div className="text-xs text-white/50">Contact us if you have still question</div>
          </div>
          <button className="bg-[#3b82f6] hover:bg-[#2563eb] px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
            GO
          </button>
        </div>
      </div>

      {/* Leave Feedback */}
      <button className="w-full flex justify-between items-center px-4 py-4 border-b border-white/5 hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-white/60" />
          <span>Leave Feedback</span>
        </div>
        <ChevronRight className="w-4 h-4 opacity-50" />
      </button>

      {/* Join Community */}
      <div className="p-4 text-center">
        <div className="text-sm text-white/60 mb-3">Join Our community</div>
        <div className="flex justify-center gap-4">
          <button className="w-10 h-10 bg-[#122634] rounded-full flex items-center justify-center hover:bg-[#1c3648] transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
          <button className="w-10 h-10 bg-[#122634] rounded-full flex items-center justify-center hover:bg-[#1c3648] transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>
          <button className="w-10 h-10 bg-[#122634] rounded-full flex items-center justify-center hover:bg-[#1c3648] transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sign Out */}
      <div className="p-4 pb-8">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </motion.div>
  );
};

