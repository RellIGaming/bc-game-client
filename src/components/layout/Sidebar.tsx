import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2,
  Trophy,
  Ticket,
  TrendingUp,
  Gift,
  Crown,
  Coins,
  Users,
  MessageCircle,
  Shield,
  HeartHandshake,
  ChevronDown,
  ExternalLink,
  Moon,
  Sun,
  Sparkles,
  Flame,
  Star,
  Dice1,
  Spade,
  CircleDot,
  LayoutGrid,
  HeadphoneOff,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import mobileSc from "../../assets/images/i-3.png";

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
  onLanguageClick: () => void;
}

const menuItems = [
  {
    id: "casino",
    label: "Casino",
    icon: Gamepad2,
    hasSubmenu: true,
    color: "text-primary",
    submenu: [
      { id: "originals", label: "BC Originals", icon: Sparkles },
      { id: "hot-games", label: "Hot Games", icon: Flame },
      { id: "slots", label: "Slots", icon: LayoutGrid },
      { id: "live-casino", label: "Live Casino", icon: CircleDot },
      { id: "new-releases", label: "New Releases", icon: Star },
      { id: "blackjack", label: "Blackjack", icon: Spade },
      { id: "roulette", label: "Roulette", icon: CircleDot },
      { id: "baccarat", label: "Baccarat", icon: Dice1 },
      { id: "poker", label: "Poker", icon: Spade },
      { id: "bingo", label: "Bingo", icon: LayoutGrid },
      { id: "table-games", label: "Table Games", icon: Dice1 },
    ],
  },
  {
    id: "sports",
    label: "Sports",
    icon: Trophy,
    hasSubmenu: true,
    color: "text-primary",
    submenu: [
      { id: "sports", label: "All Sports", icon: Trophy },
    ],
  },
  {
    id: "lottery",
    label: "Lottery",
    icon: Ticket,
    hasSubmenu: true,
    color: "text-primary",
    submenu: [
      { id: "lottery", label: "All Lottery", icon: Ticket },
    ],
  },
  {
    id: "crypto-futures",
    label: "Crypto Futures",
    icon: TrendingUp,
    hasSubmenu: true,
    color: "text-gold",
    submenu: [
      { id: "crypto-futures", label: "Crypto Futures", icon: TrendingUp },
    ],
  },
  {
    id: "promotions",
    label: "Promotions",
    icon: Gift,
    hasSubmenu: false,
    color: "text-gold",
    
  },{
    id: "daily",
    label: "Daily Contest",
    icon: Gift,
     hasSubmenu: false,
    color: "text-gold",
  },{
    id: "raffel",
    label: "Weekly Ruffle",
    icon: Gift,
    hasSubmenu: false,
    color: "text-gold",
  },
];

const bottomItems = [
  { id: "vip-club", label: "VIP Club", icon: Crown, color: "text-vip" },
  { id: "bonus", label: "Bonus", icon: Coins, color: "text-foreground" },
  { id: "referral", label: "Referral", icon: Users, color: "text-foreground" },
  {
    id: "forum",
    label: "Forum",
    icon: MessageCircle,
    external: true,
    color: "text-foreground",
  },
  {
    id: "provably-fair",
    label: "Provably Fair",
    icon: Shield,
    color: "text-foreground",
  },
  {
    id: "responsible-gambling",
    label: "Responsible Gambling",
    icon: HeartHandshake,
    color: "text-foreground",
  },
];
const extremBottom = [
  {
    id: "sponsorships",
    label: "Sponsorships",
    icon: Trophy,
    hasSubmenu: true,
    color: "text-primary",
    submenu: [
      { id: "json", label: "Json Derulo", icon: Trophy },
      { id: "lilpump", label: "Lil Pump", icon: Trophy },
      { id: "miami", label: "Miami Club", icon: Trophy },
      { id: "sponship", label: "Sponsorship Journey", icon: Trophy },
      { id: "colby covinton", label: "Colby Covinton", icon: Trophy },
      { id: "jean", label: "Jean Silva", icon: Trophy },
    ],
  }, {
    id: "live",
    label: "Live Support",
    icon: HeadphoneOff,
  },
  {
    id: "language",
    label: "English",
    icon: Globe,
  }

]

const Sidebar = ({ isOpen, isCollapsed, onClose, isDark, onThemeToggle, onLanguageClick }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNavigate = (path: string) => {
    navigate(`/category/${path}`);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const sidebarWidth = isCollapsed ? 70 : 240;

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && !isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? sidebarWidth : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed top-14 left-0 h-[calc(100vh-3.5rem)] bg-sidebar z-40 overflow-hidden",
          "flex-shrink-0"
        )}
        style={{ boxShadow: "4px 0 20px rgba(0, 0, 0, 0.3)", paddingLeft:"8px" }}
      >
        <div className={cn("h-full flex flex-col overflow-y-auto scrollbar-hide ", isCollapsed ? "w-14" : "w-58")}>


          {/* Token Price */}
          {/* {!isCollapsed ? (
            <div className="mx-3 mt-3 p-3 rounded-sm bg-secondary/30 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">G</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">G Token</span>
                  <span className="text-xs text-destructive">↓ 6.80%</span>
                </div>
                <p className="text-xs text-muted-foreground">$0.00777</p>
              </div>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="mx-2 mt-3 p-2 rounded-sm bg-secondary/30 flex items-center justify-center cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">G</span>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-card border-border">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">G Token</span>
                  <span className="text-xs text-destructive">↓ 6.80%</span>
                </div>
                <p className="text-xs text-muted-foreground">$0.00777</p>
              </TooltipContent>
            </Tooltip>
          )} */}

          {/* Main Menu */}
          <nav className={cn("flex-1 p-3 space-y-1", isCollapsed && "px-2")}>
            {menuItems.map((item) => (
              <div key={item.id}>
                {isCollapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => item.submenu && handleNavigate(item.submenu[0].id)}
                        className={cn(
                          "w-full flex items-center justify-center p-2 rounded-sm bg-sidebar-accent transition-colors",
                          "hover: hvr-btn",
                          expandedItems.includes(item.id) && "bg-sidebar-accent"
                        )}
                      >
                        <item.icon className={cn("w-5 h-5", item.color)} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-card border-border">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <>
                    <button
                      onClick={() => item.hasSubmenu && toggleExpand(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-sm bg-sidebar-accent transition-colors",
                        "hover: hvr-btn",
                        "text-left group"
                      )}
                    >
                      <item.icon className={cn("w-5 h-5", item.color)} />
                      <span className="flex-1 text-sm text-sidebar-foreground font-medium">
                        {item.label}
                      </span>
                      {item.hasSubmenu && (
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 text-muted-foreground transition-transform",
                            expandedItems.includes(item.id) && "rotate-180"
                          )}
                        />
                      )}
                    </button>
                    <AnimatePresence>
                      {item.hasSubmenu && item.submenu && expandedItems.includes(item.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-6 py-1 space-y-1">
                            {item.submenu.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() => handleNavigate(sub.id)}
                                className="w-full flex items-center gap-2 text-left text-sm text-muted-foreground hover:text-foreground py-1.5 px-3 rounded-sm hover:bg-sidebar-accent/50 transition-colors"
                              >
                                <sub.icon className="w-4 h-4" />
                                {sub.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            ))}

            <div className="my-3 bg-sidebar-accent transition-colors rounded-sm">
              {bottomItems.map((item) => (
                isCollapsed ? (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleNavigate(item.id)}
                        className={cn(
                          "w-full flex items-center justify-center p-2.5 rounded-sm",
                          "hover: hvr-btn"
                        )}
                      >
                        <item.icon className={cn("w-5 h-5", item.color)} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-card border-border">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-sm ",
                      "hover: hvr-btn"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5", item.color)} />
                    <span className="flex-1 text-sm text-sidebar-foreground font-medium text-left">
                      {item.label}
                    </span>
                    {item.external && (
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                )
              ))}
            </div>
          </nav>
          {/* App Promo - Hidden when collapsed */}
          {!isCollapsed && (
            <div className="p-3 mx-3 rounded-sm bg-secondary/50 flex gap-3 items-center">
              <div className="flex items-center gap-3 w-full">
                <div className="min-w-0">
                  <p className="text-sm text-foreground truncate font-bold">
                    Application
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Unlock Fun with <br /> Exclusive Features
                  </p>
                </div>

                <img
                  src={mobileSc}
                  alt="m-screen"
                  className="w-12 h-auto shrink-0"
                />
              </div>
            </div>

          )}
          <div className={cn("flex-1 p-3 space-y-1", isCollapsed && "px-2")}>
            {extremBottom.map((item) => (
              <div key={item.id}>
                {isCollapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          if (item.id === "language") {
                            onLanguageClick();
                          } else if (item.submenu) {
                            handleNavigate(item.submenu[0].id);
                          }
                        }}
                        className={cn(
                          "w-full flex items-center justify-center p-2.5 rounded-sm bg-sidebar-accent transition-colors",
                          "hover: hvr-btn",
                          expandedItems.includes(item.id) && "bg-sidebar-accent"
                        )}
                      >
                        <item.icon className={cn("w-5 h-5", item.color)} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-card border-border">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        if (item.id === "language") {
                          onLanguageClick();
                        } else if (item.hasSubmenu) {
                          toggleExpand(item.id);
                        }
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-sm bg-sidebar-accent transition-colors",
                        "hover: hvr-btn",
                        "text-left group"
                      )}
                    >
                      <item.icon className={cn("w-5 h-5", item.color)} />
                      <span className="flex-1 text-sm text-sidebar-foreground font-medium">
                        {item.label}
                      </span>
                      {item.hasSubmenu && (
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 text-muted-foreground transition-transform",
                            expandedItems.includes(item.id) && "rotate-180"
                          )}
                        />
                      )}
                    </button>
                    <AnimatePresence>
                      {item.hasSubmenu && item.submenu && expandedItems.includes(item.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-6 py-1 space-y-1">
                            {item.submenu.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() => handleNavigate(sub.id)}
                                className="w-full flex items-center gap-2 text-left text-sm text-muted-foreground hover:text-foreground py-1.5 px-3 rounded-sm hover:bg-sidebar-accent/50 transition-colors"
                              >
                                <sub.icon className="w-4 h-4" />
                                {sub.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            ))}
          </div>
          {/* Theme Toggle */}
          {!isCollapsed ? (
            <div className="p-3">
              <div className="flex rounded-sm bg-secondary/50 p-1">
                <button
                  onClick={() => isDark && onThemeToggle()}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors",
                    !isDark
                      ? "bg-background text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Sun className="w-4 h-4" />
                  Light
                </button>
                <button
                  onClick={() => !isDark && onThemeToggle()}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors",
                    isDark
                      ? "bg-background text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Moon className="w-4 h-4" />
                  Dark
                </button>
              </div>
            </div>
          ) : (
            <div className="p-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={onThemeToggle}
                    className="w-full flex items-center justify-center p-2.5 rounded-sm bg-sidebar-accent transition-colors hvr-btn"
                  >
                    {isDark ? (
                      <Moon className="w-5 h-5 text-foreground" />
                    ) : (
                      <Sun className="w-5 h-5 text-foreground" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-card border-border">
                  {isDark ? "Dark Mode" : "Light Mode"}
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
