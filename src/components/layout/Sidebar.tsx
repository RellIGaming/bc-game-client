import { useEffect, useState } from "react";
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
  DollarSign,
  ChevronRight,
  Info,
  Newspaper,
  Briefcase,
  Building,
  FileText,
  Headphones,
  ShieldCheck,
  Palette,
  Scale,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Mail,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import mobileSc from "../../assets/images/i-3.png";
import logo from "../../assets/images/logo.png";

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
  onLanguageClick: () => void;
  onCurrencyClick: () => void;
  onChatClick: () => void;
}

const menuItems = [
  {
    id: "casino",
    label: "Casino",
    icon: Gamepad2,
    hasSubmenu: true,
    color: "text-primary",
    submenu: [
      { id: "lobby", label: "Lobby", icon: Sparkles },
      { id: "hot-games", label: "Hot Games", icon: Flame },
      { id: "slots", label: "Slots", icon: LayoutGrid },
      { id: "game Shows", label: "Game Shows", icon: CircleDot },
      { id: "live-casino", label: "Live Casino", icon: CircleDot },
      { id: "bonus Buy", label: "Bonus Buy", icon: CircleDot },
      { id: "burst Games", label: "Burst Games", icon: CircleDot },
      { id: "new-releases", label: "New Releases", icon: Star },
      { id: "poker", label: "Poker", icon: Spade },
      { id: "bingo", label: "Bingo", icon: LayoutGrid },
      { id: "table-games", label: "Table Games", icon: Dice1 },
      { id: "providers", label: "Providers", icon: Spade },
      { id: "themes", label: "Themes", icon: CircleDot },

    ],
  },
  {
    id: "sports",
    label: "Sports",
    icon: Trophy,
    hasSubmenu: true,
    color: "text-primary",
    submenu: [
      //  { id: "lobby", label: "Lobby", icon: Sparkles },
      { id: "soccer", label: "Soccer", icon: Sparkles },
      { id: "tennis", label: "Tennis", icon: Sparkles },
      { id: "basketball", label: "Basketball", icon: Sparkles },
      { id: "cricket", label: "Cricket", icon: Sparkles },
      { id: "fIFA", label: "FIFA", icon: Sparkles },
      { id: "american Football", label: "American Football", icon: Sparkles },
      { id: "ice Hockey", label: "Ice Hockey", icon: Trophy },
      { id: "baseball", label: "Baseball", icon: Trophy },
      { id: "handball", label: "Handball", icon: Trophy },
      { id: "racing", label: "Racing", icon: Trophy },
    ],
  },
  // {
  //   id: "lottery",
  //   label: "Lottery",
  //   icon: Ticket,
  //   hasSubmenu: true,
  //   color: "text-primary",
  //   submenu: [
  //     { id: "lottery", label: "All Lottery", icon: Ticket },
  //   ],
  // },
  // {
  //   id: "crypto-futures",
  //   label: "Crypto Futures",
  //   icon: TrendingUp,
  //   hasSubmenu: true,
  //   color: "text-gold",
  //   submenu: [
  //     { id: "crypto-futures", label: "Crypto Futures", icon: TrendingUp },
  //   ],
  // },

];

const midItems = [
  {
    id: "promotions",
    label: "Promotions",
    icon: Gift,
    hasSubmenu: false,
    color: "text-gold",

  }, {
    id: "daily",
    label: "Daily Contest",
    icon: Gift,
    hasSubmenu: false,
    color: "text-gold",
  }, {
    id: "lucky",
    label: "Lucky Tickets",
    icon: Gift,
    hasSubmenu: false,
    color: "text-gold",
  },
]

const bottomItems = [
  { id: "vip-club", label: "VIP Club", icon: Crown, color: "text-vip" },
  { id: "bonus", label: "Bonus", icon: Coins, color: "text-foreground" },
  { id: "referral", label: "Referral", icon: Users, color: "text-foreground" },
  {
    id: "fair",
    label: "Provably Fair",
    icon: Shield,
    external: true,
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
    label: "Live Support 24/7",
    icon: HeadphoneOff,
  },
  {
    id: "currency",
    label: "Currency",
    icon: DollarSign,
  },
  {
    id: "language",
    label: "English",
    icon: Globe,
  }

]
const mobileExtraMenu = [
  {
    id: "about",
    label: "About Us",
    icon: Info,
    color: "text-primary",
    hasSubmenu: true,
    submenu: [
      { id: "achievement", label: "Achievement", icon: Trophy },
      { id: "news", label: "News", icon: Newspaper },
      { id: "work", label: "Work With Us", icon: Briefcase },
      { id: "business", label: "Business Contacts", icon: Building },
      { id: "licence", label: "Licence", icon: FileText },
      { id: "helpdesk", label: "Help Desk", icon: Headphones },
      { id: "verify", label: "Verify Representative", icon: ShieldCheck },
      { id: "design", label: "Design Resource", icon: Palette },
    ],
  },
  {
    id: "legal",
    label: "Legal",
    icon: Scale,
    color: "text-primary",
    hasSubmenu: true,
    submenu: [
      { id: "rellbet-licence", label: "Rellbet Licence", icon: FileText },
      { id: "gamble", label: "Gamble Aware", icon: AlertTriangle },
      { id: "fairness", label: "Fairness", icon: CheckCircle },
      { id: "privacy", label: "Privacy Policy", icon: Lock },
      { id: "terms", label: "Terms Of Service", icon: FileText },
      { id: "aml", label: "AML", icon: Shield },
    ],
  },
  {
    id: "live-mobile",
    label: "Live Support",
    icon: Headphones,
    hasSubmenu: true,
    submenu: [
      { id: "help-center", label: "Help Center", icon: HelpCircle },
      { id: "faq", label: "FAQ", icon: MessageCircle },
      { id: "ceo", label: "CEO Inbox", icon: Mail },
    ],
  },
];


const Sidebar = ({ isOpen, isCollapsed, onClose, isDark, onThemeToggle, onLanguageClick, onChatClick, onCurrencyClick }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);



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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // const sidebarWidth = isCollapsed ? 70 : 240;
  const sidebarWidth = isMobile
    ? "100vw"
    : isCollapsed
      ? 70
      : 240;
  const finalBottomMenu = isMobile
    ? [...mobileExtraMenu, ...extremBottom]
    : extremBottom;

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
        style={{ boxShadow: "4px 0 20px rgba(0, 0, 0, 0.3)", paddingLeft: "8px" }}
      >
        <div className={cn("h-full flex flex-col overflow-y-auto scrollbar-hide ", isCollapsed ? "w-14" : "w-58")}>


          {/* Token Price */}
          {!isCollapsed ? (
            <div className="mx-2 mt-3 p-3 rounded-sm bg-secondary/30 flex items-center gap-3">
              <div className="flex items-center justify-center">
                <img src={logo} alt="logo" className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Live Stats</span>
                  <span className="text-xs text-destructive">↓ 6.80%</span>
                </div>
                <div className="flex">
                  <p className="text-xs text-muted-foreground">$0.00777</p>
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 transition-transform ml-auto",
                      expandedItems.includes("0") && "rotate-180"
                    )}
                  />
                </div>

              </div>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="mx-2 mt-3 p-2 rounded-sm bg-sidebar-accent flex items-center justify-center cursor-pointer">
                  <div className="flex items-center justify-center ">
                    <img src={logo} alt="logo" className="w-5 h-5" />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-card border-border">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Live Stats</span>
                  <span className="text-xs text-destructive">↓ 6.80%</span>
                </div>
                <p className="text-xs text-muted-foreground">$0.00777</p>
              </TooltipContent>
            </Tooltip>
          )}

          {/* Main Menu */}
          <nav className={cn(" py-2 px-2  space-y-1", isCollapsed && "px-2")}>
            {menuItems.map((item) => (
              <div key={item.id}>
                {isCollapsed ? (
                  <div className={cn(
                    "w-full bg-sidebar-accent overflow-hidden transition-all",
                    expandedItems.includes(item.id) ? "rounded-t-sm" : "rounded-sm"
                  )}>
                    {/* Parent icon */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() =>
                            item.hasSubmenu
                              ? toggleExpand(item.id)
                              : handleNavigate(item.id)
                          }
                          className={cn(
                            "w-full flex items-center justify-center p-2 bg-sidebar-accent transition-colors",
                            "hover: hvr-btn",
                            expandedItems.includes(item.id)
                              ? "bg-sidebar-accent rounded-t-sm"
                              : "hover:hvr-btn"
                          )}
                        >
                          <item.icon className={cn("w-5 h-5", item.color)} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        {item.label}
                      </TooltipContent>
                    </Tooltip>

                    {/* ✅ SHOW SUB ICONS ONLY IF EXPANDED */}
                    <div className="rounded-b-sm bg-sidebar-accent transition-colors">
                      {item.hasSubmenu &&
                        expandedItems.includes(item.id) &&
                        item.submenu?.map((sub) => (
                          <Tooltip key={sub.id}>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => handleNavigate(sub.id)}
                                className="bg-sidebar-accent transition-colors w-full flex items-center justify-center p-2 rounded-sm hover: hvr-btn"
                              >
                                <sub.icon className="w-6 h-6" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                              {sub.label}
                            </TooltipContent>
                          </Tooltip>
                        ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => item.hasSubmenu && toggleExpand(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 bg-sidebar-accent hover:hvr-btn",
                        expandedItems.includes(item.id) ? "rounded-t-sm" : "rounded-sm"
                      )}>
                      <item.icon className={cn("w-5 h-5", item.color)} />
                      <span className="text-sm font-medium">{item.label}</span>

                      {item.hasSubmenu && (
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform ml-auto",
                            expandedItems.includes(item.id) && "rotate-180"
                          )}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {item.hasSubmenu && expandedItems.includes(item.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-sidebar-accent rounded-b-sm mt-[-4px] px-2"
                        >
                          {item.submenu?.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => handleNavigate(sub.id)}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm bg-sidebar-accent hover:hvr-btn"
                            >
                              <sub.icon className="w-5 h-5" />
                              <span className="text-sm font-medium">{sub.label}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>

                )}
              </div>
            ))}
            <div className="my-3 bg-sidebar-accent transition-colors rounded-sm">
              {midItems.map((item) => (
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
                  </button>
                )
              ))}

            </div>
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
            <div className="p-3 mx-2 rounded-sm bg-secondary/50 flex items-center mb-1">
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
          <div className={cn("flex-1 px-2 py-1 space-y-1", isCollapsed && "px-2")}>
            {finalBottomMenu.map((item) => (
              <div key={item.id}>
                {isCollapsed ? (
                  <div
                    className={cn(
                      "w-full bg-sidebar-accent overflow-hidden transition-all",
                      expandedItems.includes(item.id) ? "rounded-t-sm" : "rounded-sm"
                    )}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() =>
                            item.hasSubmenu
                              ? toggleExpand(item.id)
                              : handleNavigate(item.id)
                          }
                          className={cn(
                            "w-full flex items-center justify-center p-2 bg-sidebar-accent transition-colors hover:hvr-btn",
                            expandedItems.includes(item.id) ? "rounded-t-sm" : "rounded-sm"
                          )}
                        >
                          <item.icon className={cn("w-5 h-5", item.color)} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        {item.label}
                      </TooltipContent>
                    </Tooltip>

                    {/* submenu */}
                    <div className="bg-sidebar-accent rounded-b-sm overflow-hidden">
                      {item.hasSubmenu &&
                        expandedItems.includes(item.id) &&
                        item.submenu?.map((sub) => (
                          <Tooltip key={sub.id}>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => handleNavigate(sub.id)}
                                className="w-full flex items-center justify-center p-2 bg-sidebar-accent hover:hvr-btn transition-colors"
                              >
                                <sub.icon className="w-6 h-6" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                              {sub.label}
                            </TooltipContent>
                          </Tooltip>
                        ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => item.hasSubmenu && toggleExpand(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 bg-sidebar-accent hover:hvr-btn transition-colors",
                        expandedItems.includes(item.id) ? "rounded-t-sm" : "rounded-sm"
                      )}
                    >
                      <item.icon className={cn("w-5 h-5", item.color)} />
                      <span className="text-sm font-medium">{item.label}</span>

                      {item.hasSubmenu && (
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 ml-auto transition-transform",
                            expandedItems.includes(item.id) && "rotate-180"
                          )}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {item.hasSubmenu && expandedItems.includes(item.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-sidebar-accent rounded-b-sm overflow-hidden px-2"
                        >
                          {item.submenu?.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => handleNavigate(sub.id)}
                              className="w-full flex items-center gap-3 px-3 py-2.5 bg-sidebar-accent rounded-sm hover:hvr-btn transition-colors"
                            >
                              <sub.icon className="w-5 h-5" />
                              <span className="text-sm font-medium">{sub.label}</span>
                            </button>
                          ))}
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
