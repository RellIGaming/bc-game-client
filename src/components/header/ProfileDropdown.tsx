
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
import { cn } from '@/lib/utils';
import profileBanner from "../../assets/images/profile-banner-mob.png"
import VipProgressBar from '../home/VipProgressBar';
import buyIcon from "../../assets/images/buy-icon.png"
import swapIcon from "../../assets/images/swap-icon.png"
import staticIcon from "../../assets/images/static-icon.png"
import transaction from "../../assets/images/credit_card.png"
import rolover from "../../assets/images/rolover-icon.png"
import notifyIcon from "../../assets/images/profile-notification.png"
import referIcon from "../../assets/images/refer-icon.png"
import affiliate from "../../assets/images/affiliate-icon.png"
import currency from "../../assets/images/currency-icon.png"
import betIcon from "../../assets/images/bet-history.png"
import themeIcon from "../../assets/images/theme-icon.png"
import sunIcon from "../../assets/images/sun-icon.png"
import moonIcon from "../../assets/images/moon-icon.png"
import support from "../../assets/images/support-blue.png"
import facebook from "../../assets/images/facebook-icon.png"
import tweeter from "../../assets/images/tweeter-icon.png"
import whatsapp from "../../assets/images/whatsapp-icon.png"
import instagram from "../../assets/images/instagram-icon.png"

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MobileProfileProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
}


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
  { icon: <Wallet className="w-5 h-5" />, label: "Wallet", path: "/wallet/deposit" },
  { icon: <ArrowDownToLine className="w-5 h-5" />, label: "Withdraw", path: "/wallet/withdraw" },
  { icon: <Coins className="w-5 h-5" />, label: "Buy Crypto", path: "/wallet/buy-crypto" },
  { icon: <RotateCcw className="w-5 h-5" />, label: "Transactions", path: "/wallet/transaction" },
  { icon: <History className="w-5 h-5" />, label: "Bet History", path: "/wallet/bet-history" },
  { icon: <BarChart3 className="w-5 h-5" />, label: "Rollover Overview", path: "/wallet/rollover" },
  { icon: <Crown className="w-5 h-5" />, label: "VIP Club", path: "/" },
  { icon: <Lock className="w-5 h-5" />, label: "Vault Pro", path: "/wallet/vault-pro" },
  { icon: <Users className="w-5 h-5" />, label: "Referral", path: "/" },
  { icon: <User className="w-5 h-5" />, label: "My Profile", path: "/" },
  { icon: <Settings className="w-5 h-5" />, label: "Global Settings", path: "/" },
];
const actions = [
  { icon: buyIcon, label: "Buy", row: 1 },
  { icon: swapIcon, label: "Swap", row: 1 },
  { icon: buyIcon, label: "Vault Pro", row: 1 },
  { icon: staticIcon, label: "Statistics", row: 1 },

  { icon: transaction, label: "Transaction", row: 2 },
  { icon: rolover, label: "Rollover", row: 2 },
  { icon: betIcon, label: "Bet History", row: 2 },
];



const ProfileDropdown = ({ isOpen, onClose, onLogout }: ProfileDropdownProps) => {
  const [isDark, setIsDark] = useState(true);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const toggleTheme = () => setIsDark(!isDark);
   const navigate = useNavigate();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          {isMobile ? (
            <MobileProfile onClose={onClose} onLogout={onLogout} isOpen={false} isDark={isDark}
              onThemeToggle={toggleTheme} />
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
                    onClick={() => {
                      navigate(item.path);
                      onClose?.();
                    }}
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


export const MobileProfile = ({
  isOpen,
  onClose,
  onLogout,
  isDark,
  onThemeToggle,
}: MobileProfileProps) => {

  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);


  const topMenuItems = [
    {
      label: "Notification",
      icon: notifyIcon,
      right: (
        <>
          <span className="w-7 h-5 bg-[#91E873] rounded-2xl text-xs flex items-center justify-center">
            5
          </span>
        </>
      ),
    },
    {
      label: "Refer and Earn",
      icon: referIcon,
    },
    {
      label: "Affiliate",
      icon: affiliate,
    },
  ]
  const moileMenuItems = [
    {
      label: "Global Settings",
      icon: notifyIcon,
      right: <span className="w-2 h-2 bg-red-500 rounded-full" />,
    },
    {
      label: "Language",
      icon: referIcon,
      right: <span className="text-white/50 text-sm">English</span>,
    },
    {
      label: "Currency",
      icon: currency,
      right: <span className="text-white/50 text-sm">USD</span>,
    },
    {
      label: "Theme",
      icon: themeIcon,
      right: (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex w-20 h-8 bg-[#122634] rounded-lg p-1"
        >
          <button
            onClick={() => isDark && onThemeToggle()}
            className={`flex-1 flex items-center justify-center rounded-md transition-colors
          ${isDark ? "bg-[#1c3648]" : ""}
        `}
          >
            <img src={moonIcon} alt="Dark" className="w-4 h-4" />
          </button>

          <button
            onClick={() => !isDark && onThemeToggle()}
            className={`flex-1 flex items-center justify-center rounded-md transition-colors
          ${!isDark ? "bg-[#1c3648]" : ""}
        `}
          >
            <img src={sunIcon} alt="Light" className="w-4 h-4" />
          </button>
        </div>
      ),
    }


  ];
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-[#1A2C38] text-white overflow-y-auto"
    >
      {/* Banner + Header */}
      <div className="relative">
        {/* Banner */}
        <img
          src={profileBanner}
          alt="banner"
          className="w-full h-32 object-cover"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Header on banner */}
        <div className="absolute top-0 left-0 right-0 flex items-center gap-3 p-4 z-10">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          {/* <span className="text-lg font-semibold text-white">Profile</span> */}
        </div>

        {/* User Info */}
        <div className="absolute left-4 right-4 bottom-4 flex items-center gap-3 z-10">

          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-xl border-2 border-[#0f1c26]">
            🦁
          </div>

          <div>
            <div className="font-semibold flex items-center gap-1 text-[22px]">
              Prince Wahid
              <span className="text-green-400 text-xs">●</span>
            </div>
            <div className="text-xs text-white/70 flex items-center gap-1">
              ID: 1215411
              <Copy className="w-3 h-3 cursor-pointer hover:text-white" />
            </div>
          </div>
          <ChevronRight className="w-6 h-6 ml-auto text-white/70" />
        </div>

      </div>

      <div className='px-2'>
        {/* VIP Section */}
        <div className="px-4 py-3 bg-[#213744]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg text-white">VIP 0</span>
              <span className="px-2 py-0.5 hvr-btn text-sm rounded text-white/80">Bronze</span>
            </div>
            <div className="flex items-center gap-1 text-lg text-white bg-[#1A2C38] p-1">
              VIP Club
              <ChevronRight className="w-6 h-6" />
            </div>
          </div>
          <VipProgressBar currentXP={3500} requiredXP={5000} />
        </div>

        {/* Balance */}
        <div className="px-4 py-3 bg-[#213744] mt-2">
          <div className='flex flex-row justify-between'>
            <div className="text-lg text-white mb-1">Blance</div>
            <Eye className="w-7 h-6 text-white cursor-pointer" onClick={() => setShowBalance((prev) => !prev)} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold">{showBalance ? "₹ 00.00" : "******"}</span>

          </div>
          <div className="flex gap-3 mt-4">
            <button className="flex-1 bg-[#1A2C38] hover:bg-primary py-2.5 rounded-lg font-semibold transition-colors">
              Deposit
            </button>
            <button className="flex-1 bg-[#1A2C38] hover:bg-primary py-2.5 rounded-lg transition-colors">
              Withdraw
            </button>
          </div>
        </div>
        <div className=" py-3 bg-[#213744] mt-2">
          <div className="flex flex-wrap gap-y-4">
            {actions.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "flex justify-center",
                  index < 4 ? "basis-1/4" : "basis-1/4" // keep same width
                )}
              >
                <button className="flex flex-col items-center">
                  {/* Icon box */}
                  <div className="w-12 h-12 bg-[#122634] rounded-lg flex items-center justify-center hover:bg-[#1c3648] transition-colors">
                    <img src={item.icon} alt={item.label} className="w-6 h-6" />
                  </div>

                  {/* Label */}
                  <span className="mt-1 text-xs text-white/70">
                    {item.label}
                  </span>
                </button>
              </div>
            ))}

            {/* 👇 Invisible placeholder to balance last row */}
            <div className="basis-1/4 pointer-events-none opacity-0" />
          </div>
        </div>

        {/* Menu Items */}
        <div className="mt-2 bg-[#213744]">
          {topMenuItems.map((item, index) => (
            <button
              key={item.label}
              className="w-full flex justify-between items-center px-4 py-2 hover:bg-white/5 transition-colors"
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-6 h-6 "
                />
                <span>{item.label}</span>
              </div>

              {/* Right */}
              <div className="flex items-center gap-2">
                {item.right}
                <ChevronRight className="w-6 h-6 bg-[#1A2C38]" />
              </div>
            </button>
          ))}
        </div>
        <div className="mt-2 bg-[#213744]">
          {moileMenuItems.map((item, index) => (
            <button
              key={item.label}
              className="w-full flex justify-between items-center px-4 py-2 hover:bg-white/5 transition-colors"
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-6 h-6 "
                />
                <span>{item.label}</span>
              </div>

              {/* Right */}
              <div className="flex items-center gap-2">
                {item.right}
                <ChevronRight className="w-6 h-6 bg-[#1A2C38]" />
              </div>
            </button>
          ))}
        </div>


        {/* Premium Support */}
        <div className="bg-[#213744] p-4 flex items-center gap-3 mt-2">
          <div>
            <img src={support} alt="" className="w-8 h-8 text-[#3b82f6]" />
          </div>
          <div className="flex-1">
            <div className="font-medium">24/7 Premium Support</div>
            <div className="text-xs text-white/50">Contact us if you have still question</div>
          </div>
          <button className="bg-[#3b82f6] hover:bg-[#2563eb] px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
            GO
          </button>
        </div>

        {/* Leave Feedback */}
        <button className="w-full flex justify-between items-center px-4 py-4 bg-[#213744] mt-2 hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <img src={themeIcon} alt="logo" className="w-5 h-5 text-white/60" />
            <span>Leave Feedback</span>
          </div>
          <ChevronRight className="w-6 h-6 bg-[#222627]" />
        </button>

        {/* Join Community */}
        <div className="p-4 text-center bg-[#213744] mt-2">
          <div className="text-sm text-white/60 mb-3">Join Our community</div>
          <div className="flex justify-center gap-4">
            <button className="w-10 h-10 bg-[#222627] rounded-lg flex items-center justify-center hover:bg-[#1c3648] transition-colors">
              <img src={tweeter} alt="" className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-[#222627] rounded-lg flex items-center justify-center hover:bg-[#1c3648] transition-colors">
              <img src={facebook} alt="" className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-[#222627] rounded-lg flex items-center justify-center hover:bg-[#1c3648] transition-colors">
              <img src={whatsapp} alt="" className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-[#222627] rounded-lg flex items-center justify-center hover:bg-[#1c3648] transition-colors">
              <img src={instagram} alt="" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sign Out */}
        <div className="p-4 pb-4 ">
          <button
            onClick={onLogout}
            className="mx-auto w-1/2 flex items-center justify-center gap-2 py-3 bg-[#213744] rounded-lg hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

