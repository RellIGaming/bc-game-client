
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
import { useTranslation } from 'react-i18next';
import { setAutoTranslateLanguage } from '@/i18n/autoTranslate';
import MyProfileModal from '../auth/MyProfileModal';
import useAuthStore from '@/store/authStore';
import { useWalletStore } from '@/store/walletStore';

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
  isDark?: boolean;
  onThemeToggle?: () => void;
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
  { icon: <Users className="w-5 h-5" />, label: "Referral", path: "/referal" },
  { icon: <User className="w-5 h-5" />, label: "My Profile", path: "/my-profile" },
  { icon: <Settings className="w-5 h-5" />, label: "Global Settings", path: "/globalSettings" },
];
const actions = [
  { icon: buyIcon, label: "Buy", row: 1, path: "/wallet/buy-crypto" },
  { icon: swapIcon, label: "Swap", row: 1, path: "/wallet/swap" },
  { icon: buyIcon, label: "Vault Pro", row: 1, path: "/wallet/vault-pro" },
  { icon: staticIcon, label: "Statistics", row: 1, path: "/wallet/buy-crypto" },

  { icon: transaction, label: "Transaction", row: 2, path: "/wallet/transaction" },
  { icon: rolover, label: "Rollover", row: 2, path: "/wallet/rollover" },
  { icon: betIcon, label: "Bet History", row: 2, path: "/wallet/bet-history" },
];



const ProfileDropdown = ({ isOpen, onClose, onLogout, isDark: isDarkProp, onThemeToggle: onThemeToggleProp }: ProfileDropdownProps) => {
  const [localDark, setLocalDark] = useState(true);
  const isDark = isDarkProp ?? localDark;
  const toggleTheme = onThemeToggleProp ?? (() => setLocalDark(!localDark));
  const [profileOpen, setProfileOpen] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
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
                      if (item.path === "my-profile") {
                        setProfileOpen(true);
                        onClose?.();
                      } else {
                        navigate(item.path);
                        onClose?.();
                      }
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
      <MyProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
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
  const { user } = useAuthStore();
  const { wallets } = useWalletStore();
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("bn") ? "bn" : "en";
  const changeLang = (lng: "en" | "bn") => {
    i18n.changeLanguage(lng);
    try { localStorage.setItem("app_lang", lng); } catch {}
    setAutoTranslateLanguage(lng);
  };

  const bdtWallet = wallets.find((w: any) => w.name === "BDT");
  const depositBalance = Number(bdtWallet?.balance || 0);

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
      right: <span className="w-2 h-2 bg-destructive rounded-full" />,
      path: "/globalSettings",
    },
    {
      label: "Language",
      icon: referIcon,
      right: (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 bg-secondary rounded-lg p-1"
        >
          <button
            onClick={() => changeLang("en")}
            className={cn(
              "px-2 py-0.5 text-xs font-semibold rounded-md transition-colors",
              currentLang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            )}
          >
            EN
          </button>
          <button
            onClick={() => changeLang("bn")}
            className={cn(
              "px-2 py-0.5 text-xs font-semibold rounded-md transition-colors",
              currentLang === "bn" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            )}
          >
            বাং
          </button>
        </div>
      ),
    },
    {
      label: "Currency",
      icon: currency,
      right: <span className="text-muted-foreground text-sm">BDT</span>,
    },
    {
      label: "Theme",
      icon: themeIcon,
      right: (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex w-20 h-8 bg-secondary rounded-lg p-1"
        >
          <button
            onClick={() => isDark && onThemeToggle()}
            className={`flex-1 flex items-center justify-center rounded-md transition-colors
          ${isDark ? "bg-accent" : ""}
        `}
          >
            <img src={moonIcon} alt="Dark" className="w-4 h-4" />
          </button>

          <button
            onClick={() => !isDark && onThemeToggle()}
            className={`flex-1 flex items-center justify-center rounded-md transition-colors
          ${!isDark ? "bg-accent" : ""}
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
      onClick={(e) => e.stopPropagation()}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-background text-foreground overflow-y-auto"
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
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        {/* Header on banner */}
        <div className="absolute top-0 left-0 right-0 flex items-center gap-3 p-4 z-10">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
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
              {user?.username || "User"}
              <span className="text-green-400 text-xs">●</span>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              ID: {user?.id}
              <Copy className="w-3 h-3 cursor-pointer hover:text-white" />
            </div>
          </div>
          <ChevronRight className="w-6 h-6 ml-auto text-muted-foreground" />
        </div>

      </div>

      <div className='px-2'>
        {/* VIP Section */}
        <div className="px-4 py-3 bg-card">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg text-foreground">VIP 0</span>
              <span className="px-2 py-0.5 hvr-btn text-sm rounded text-white/80">Bronze</span>
            </div>
            <div className="flex items-center gap-1 text-lg text-white bg-background p-1">
              VIP Club
              <ChevronRight className="w-6 h-6" />
            </div>
          </div>
          <VipProgressBar currentXP={3500} requiredXP={5000} />
        </div>

        {/* Balance */}
        <div className="px-4 py-3 bg-card mt-2">
          <div className='flex flex-row justify-between'>
            <div className="text-lg text-foreground mb-1">Blance</div>
            <Eye className="w-7 h-6 text-white cursor-pointer" onClick={() => setShowBalance((prev) => !prev)} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold">৳ {showBalance ? ` ${depositBalance ?? 0}` : "******"}</span>

          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={(e) => {
              e.stopPropagation();
              try {
                console.log("Deposit clicked");
                navigate("/wallet/deposit");
                onClose();
              } catch (err) {
                console.error(err);
              }
            }}
              className="flex-1 bg-background hover:bg-primary py-2.5 rounded-lg font-semibold transition-colors">
              Deposit
            </button>
            <button onClick={(e) => {
              e.stopPropagation();
              try {
                console.log("withdraw clicked");
                navigate("/wallet/withdraw");
                onClose();
              } catch (err) {
                console.error(err);
              }
            }}
              className="flex-1 bg-background hover:bg-primary py-2.5 rounded-lg transition-colors">
              Withdraw
            </button>
          </div>
        </div>
        <div className=" py-3 bg-card mt-2">
          <div className="flex flex-wrap gap-y-4">
            {actions.map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                className={cn(
                  "flex justify-center",
                  index < 4 ? "basis-1/4" : "basis-1/4" // keep same width
                )}
              >
                <button onClick={(e) => {
                  e.stopPropagation();
                  setActiveAction(item.label);
                  if (item.path) {
                    navigate(item.path);
                    onClose(); // optional: close the panel after click
                  }
                }} className="flex flex-col items-center">
                  {/* Icon box */}
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                    activeAction === item.label
                      ? "bg-blue-500"
                      : "bg-secondary hover:bg-accent"
                  )}>
                    <img src={item.icon} alt={item.label} className="w-6 h-6" />
                  </div>

                  {/* Label */}
                  <span className={cn(
                    "mt-1 text-xs",
                    activeAction === item.label
                      ? "text-blue-400"
                      : "text-muted-foreground"
                  )}>
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
        <div className="mt-2 bg-card">
          {topMenuItems.map((item, index) => (
            <button
              key={item.label}
              className="w-full flex justify-between items-center px-4 py-2 hover:bg-accent/40 transition-colors"
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
                <ChevronRight className="w-6 h-6 bg-background" />
              </div>
            </button>
          ))}
        </div>
        <div className="mt-2 bg-card">
          {moileMenuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => {
                if ((item as any).path) {
                  navigate((item as any).path);
                  onClose();
                }
              }}
              className="w-full flex justify-between items-center px-4 py-2 hover:bg-accent/40 transition-colors"
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                <img src={item.icon} alt={item.label} className="w-6 h-6" />
                <span>{item.label}</span>
              </div>
              {/* Right */}
              <div className="flex items-center gap-2">
                {item.right}
                <ChevronRight className="w-6 h-6 bg-background" />
              </div>
            </button>
          ))}
        </div>


        {/* Premium Support */}
        <div className="bg-card p-4 flex items-center gap-3 mt-2">
          <div>
            <img src={support} alt="" className="w-8 h-8 text-[#3b82f6]" />
          </div>
          <div className="flex-1">
            <div className="font-medium">24/7 Premium Support</div>
            <div className="text-xs text-muted-foreground">Contact us if you have still question</div>
          </div>
          <button className="bg-[#3b82f6] hover:bg-[#2563eb] px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
            GO
          </button>
        </div>

        {/* Leave Feedback */}
        <button className="w-full flex justify-between items-center px-4 py-4 bg-card mt-2 hover:bg-accent/40 transition-colors">
          <div className="flex items-center gap-3">
            <img src={themeIcon} alt="logo" className="w-5 h-5 text-muted-foreground" />
            <span>Leave Feedback</span>
          </div>
          <ChevronRight className="w-6 h-6 bg-secondary" />
        </button>

        {/* Join Community */}
        <div className="p-4 text-center bg-card mt-2">
          <div className="text-sm text-muted-foreground mb-3">Join Our community</div>
          <div className="flex justify-center gap-4">
            <button className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
              <img src={tweeter} alt="" className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
              <img src={facebook} alt="" className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
              <img src={whatsapp} alt="" className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
              <img src={instagram} alt="" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sign Out */}
        <div className="p-4 pb-4 ">
          <button
            onClick={onLogout}
            className="mx-auto w-1/2 flex items-center justify-center gap-2 py-3 bg-card rounded-lg hover:bg-accent/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

