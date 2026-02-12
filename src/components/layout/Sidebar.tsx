import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ExternalLink,
  Moon,
  Sun,
  Spade,
  ChevronRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import mobileSc from "../../assets/images/i-3.png";
import logo from "../../assets/images/logo.png";
import casino from "../../assets/images/casino-green-icon.png";
import sports from "../../assets/images/sports-icon.png";
import hotGame from "../../assets/images/hot-game-icon.png";
import newR from "../../assets/images/new-release-icon.png";
import slot from "../../assets/images/slot-icon.png";
import bonus from "../../assets/images/bonus-icon.png";
import liveCasino from "../../assets/images/live-casino-icon.png";
import tableGame from "../../assets/images/table-game-icon.png";
import gameShow from "../../assets/images/game-show-icon.png";
import bingo from "../../assets/images/bingo-icon.png";
import theme from "../../assets/images/theme-icon.png";
import provide from "../../assets/images/provide-icon.png";
import soccer from "../../assets/images/soccer-icon.png";
import tennis from "../../assets/images/tennis-icon.png";
import basket from "../../assets/images/basket-icon.png";
import cricket from "../../assets/images/cricket-icon.png";
import fifa from "../../assets/images/fifa-icon.png";
import aFootball from "../../assets/images/american-football-icon.png";
import iceHockey from "../../assets/images/ice-hockey-icon.png";
import handball from "../../assets/images/handball-icon.png";
import racing from "../../assets/images/racing-icon.png";
import promotion from "../../assets/images/promotion-icon.png";
import daily from "../../assets/images/daily-contest-icon.png";
import lucky from "../../assets/images/luckey-ticket-icon.png";
import vip from "../../assets/images/vip-club-icon.png";
import vBonus from "../../assets/images/bonus-icon.png";
import referal from "../../assets/images/referal-icon.png";
import fair from "../../assets/images/fair-icon.png";
import gabling from "../../assets/images/gabling-icon.png";
import sponsorship from "../../assets/images/sponsorship-icon.png";
import joni from "../../assets/images/joni-icon.png";
import rell from "../../assets/images/rell-icon.png";
import frost from "../../assets/images/forst-icon.png";
import bharat from "../../assets/images/bharat-icon.png";
import legend from "../../assets/images/legend-icon.png";
import nova from "../../assets/images/nova-icon.png";
import language from "../../assets/images/language-icon.png";
import currency from "../../assets/images/currency-icon.png";
import support from "../../assets/images/support-icon.png";
import about from "../../assets/images/about-icon.png";
import liveStats from "../../assets/images/live-stats-icon.png";
import achivement from "../../assets/images/achivement-icon.png";
import help from "../../assets/images/help-desk.png";
import legal from "../../assets/images/legal-icon.png";
import rellbetL from "../../assets/images/rellbet-licence.png";
import aware from "../../assets/images/aware-icon.png";
import fairness from "../../assets/images/fairness-icon.png";
import privacy from "../../assets/images/privacy-icon.png";
import terms from "../../assets/images/terms-icon.png";
import aml from "../../assets/images/aml-icon.png";
import news from "../../assets/images/news-icon.png";
import work from "../../assets/images/work-icon.png";
import business from "../../assets/images/business-icon.png";
import licence from "../../assets/images/licence.png";
import verify from "../../assets/images/verify-icon.png";
import design from "../../assets/images/desihn-icon.png";
import faq from "../../assets/images/faq.png";
import ceo from "../../assets/images/ceo-inbox.png";
import helpC from "../../assets/images/help-center-icon.png";





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
    iconImg: casino,
    hasSubmenu: true,
    // color: "text-primary",
    path: "/casino",
    submenu: [
      { id: "hot-games", label: "Hot Games", iconImg: hotGame, path: "/casino", },
      { id: "slots", label: "Slots", iconImg: slot, path: "/casino", },
      { id: "game Shows", label: "Game Shows", iconImg: gameShow, path: "/casino", },
      { id: "live-casino", label: "Live Casino", iconImg: liveCasino, path: "/casino", },
      { id: "bonus Buy", label: "Bonus Buy", iconImg: bonus, path: "/casino", },
      { id: "burst Games", label: "Burst Games", iconImg: frost, path: "/casino", },
      { id: "new-releases", label: "New Releases", iconImg: newR, path: "/casino", },
      { id: "poker", label: "Poker", iconImg: casino, path: "/casino", },
      { id: "bingo", label: "Bingo", iconImg: bingo, path: "/casino", },
      { id: "table-games", label: "Table Games", iconImg: tableGame, path: "/casino", },
      { id: "providers", label: "Providers", iconImg: provide, path: "/casino", },
      { id: "themes", label: "Themes", iconImg: theme, path: "/casino", },

    ],
  },
  {
    id: "sports",
    label: "Sports",
    iconImg: sports,
    hasSubmenu: true,
    path: "/sports",
    submenu: [
      //  { id: "lobby", label: "Lobby", iconImg: Sparkles },
      { id: "soccer", label: "Soccer", iconImg: soccer, path: "/sports", },
      { id: "tennis", label: "Tennis", iconImg: tennis, path: "/sports", },
      { id: "basketball", label: "Basketball", iconImg: basket, path: "/sports", },
      { id: "cricket", label: "Cricket", iconImg: cricket, path: "/sports", },
      { id: "fIFA", label: "FIFA", iconImg: fifa, path: "/sports", },
      { id: "american Football", label: "American Football", iconImg: aFootball, path: "/sports", },
      { id: "ice Hockey", label: "Ice Hockey", iconImg: fifa, path: "/sports", },
      { id: "baseball", label: "Baseball", iconImg: basket, path: "/sports", },
      { id: "handball", label: "Handball", iconImg: handball, path: "/sports", },
      { id: "racing", label: "Racing", iconImg: racing, path: "/sports", },
    ],
  },
  // {
  //   id: "lottery",
  //   label: "Lottery",
  //   iconImg: Ticket,
  //   hasSubmenu: true,
  //   path:"/",
  //   submenu: [
  //     { id: "lottery", label: "All Lottery", iconImg: Ticket },
  //   ],
  // },
  // {
  //   id: "crypto-futures",
  //   label: "Crypto Futures",
  //   iconImg: TrendingUp,
  //   hasSubmenu: true,
  //   color: "text-gold",
  //   submenu: [
  //     { id: "crypto-futures", label: "Crypto Futures", iconImg: TrendingUp },
  //   ],
  // },

];

const midItems = [
  {
    id: "promotions",
    label: "Promotions",
    iconImg: promotion,
    hasSubmenu: false,
    path: "/promotions",

  }, {
    id: "daily",
    label: "Daily Contest",
    iconImg: daily,
    hasSubmenu: false,
    path: "/daily",

  }, {
    id: "lucky",
    label: "Lucky Tickets",
    iconImg: lucky,
    hasSubmenu: false,
    path: "/lucky",
  },
]

const bottomItems = [
  { id: "vip-club", label: "VIP Club", iconImg: vip, path: "/vip-club", },
  { id: "bonus", label: "Bonus", iconImg: vBonus, color: "text-foreground", path: "/bonus", },
  { id: "referal", label: "Referral", iconImg: referal, color: "text-foreground", path: "/referal", },
  {
    id: "fair",
    label: "Provably Fair",
    iconImg: fair,
    external: true,
    path: "/fair",

  },

  {
    id: "gambling",
    label: "Responsible Gambling",
    iconImg: gabling,
    path: "/gambling",
  },
];
const extremBottom = [
  {
    id: "sponsorships",
    label: "Sponsorships",
    iconImg: sponsorship,
    hasSubmenu: true,
    path: "/sponsorships",
    submenu: [
      { id: "json", label: "Json Derulo", iconImg: joni, path: "/sponsorships", },
      { id: "lilpump", label: "Lil Pump", iconImg: rell, path: "/sponsorships", },
      { id: "miami", label: "Miami Club", iconImg: frost, path: "/sponsorships", },
      { id: "sponship", label: "Sponsorship Journey", iconImg: bharat, path: "/sponsorships", },
      { id: "colby covinton", label: "Colby Covinton", iconImg: legend, path: "/sponsorships", },
      { id: "jean", label: "Jean Silva", iconImg: joni, path: "/sponsorships", },
    ],
  }, {
    id: "live",
    label: "24/7 Live Support ",
    iconImg: support,
    path: "/support",
  },
  {
    id: "language",
    label: "English",
    iconImg: language,
    //  path: "/language",
  },
  {
    id: "currency",
    label: "Currency",
    iconImg: currency,
    // path: "/currency",
  },


]
const mobileExtraMenu = [
  {
    id: "about",
    label: "About Us",
    iconImg: about,
    path: "/about",
    hasSubmenu: true,
    submenu: [
      { id: "achievement", label: "Achievement", iconImg: achivement, path: "/about", },
      { id: "news", label: "News", iconImg: news, path: "/about", },
      { id: "work", label: "Work With Us", iconImg: work, path: "/about", },
      { id: "business", label: "Business Contacts", iconImg: business, path: "/about", },
      { id: "licence", label: "Licence", iconImg: licence, path: "/about", },
      { id: "helpdesk", label: "Help Desk", iconImg: help, path: "/about", },
      { id: "verify", label: "Verify Representative", iconImg: verify, path: "/about", },
      { id: "design", label: "Design Resource", iconImg: design, path: "/about", },
    ],
  },
  {
    id: "legal",
    label: "Legal",
    iconImg: legal,
    hasSubmenu: true,
    path: "/legal",
    submenu: [
      { id: "rellbet-licence", label: "Rellbet Licence", iconImg: rellbetL, path: "/legal", },
      { id: "gamble", label: "Gamble Aware", iconImg: aware, path: "/legal", },
      { id: "fairness", label: "Fairness", iconImg: fairness, path: "/legal", },
      { id: "privacy", label: "Privacy Policy", iconImg: privacy, path: "/legal", },
      { id: "terms", label: "Terms Of Service", iconImg: terms, path: "/legal", },
      { id: "aml", label: "AML", iconImg: aml, path: "/legal", },
    ],
  },
  {
    id: "live-mobile",
    label: "Live Support",
    iconImg: support,
    hasSubmenu: true,
    path: "/support",
    submenu: [
      { id: "help-center", label: "Help Center", iconImg: helpC, path: "/help", },
      { id: "faq", label: "FAQ", iconImg: faq, path: "/faq", },
      { id: "ceo", label: "CEO Inbox", iconImg: ceo, path: "/ceo", },
    ],
  },
];


const Sidebar = ({ isOpen, isCollapsed, onClose, isDark, onThemeToggle, onLanguageClick, onChatClick, onCurrencyClick }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const location = useLocation();
  const sidebarRef = useRef(null);

  const goLiveStats = () => {
    navigate("/live-stats");
  };
  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const handleNavigate = (path: string, isDirectPath: boolean = false) => {
    if (isDirectPath) {
      navigate(path);
    } else if (path === "casino" || path === "lobby") {
      navigate("/casino");
    } else {
      navigate(`/category/${path}`);
    }
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleMenuItemClick = (id: string, hasSubmenu: boolean) => {
    if (hasSubmenu) {
      toggleExpand(id);
    }
    if (id === "casino") {
      navigate("/casino");
    } else if (id === "sports") {
      navigate("/sports");
    }
    else if (!hasSubmenu) {
      handleNavigate(id);
    }
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

  useEffect(() => {
    if (!isMobile || !isOpen) return;

    const handleScroll = () => {
      onClose();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile, isOpen]);
  useEffect(() => {
    if (!isMobile || !isOpen) return;

    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobile, isOpen]);

  useEffect(() => {
    if (isMobile && isOpen) {
      onClose();
    }
  }, [location.pathname]);

  const toggleSubmenu = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const openParentRoute = (item: any) => {
    if (item.id === "casino") navigate("/casino");
    else if (item.id === "sports") navigate("/sports");
    else if (item.id === "promotions") {
      navigate("/promotions");
    } else if (item.id === "daily") {
      navigate("/daily");
    } else if (item.id === "lucky") {
      navigate("/lucky");
    } 
     else if (item.id === "sponsorships") {
      navigate("/category/sponsorships");
    } 
    else if (item.path) handleNavigate(item.path);
  };

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
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        ref={sidebarRef}
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
            <div onClick={goLiveStats} className="mx-2 mt-4 p-3 b-radius bg-sidebar-accent flex items-center gap-3 cursor-pointer">
              <div className="flex items-center justify-center">
                <img src={logo} alt="logo" className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Live Stats</span>
                  <span className="text-xs text-destructive">↓ 6.80%</span>
                </div>
                <div className="flex">
                  {/* <img
                            src={liveStats}
                            alt=""
                            className="w-5 h-5 object-contain"
                          /> */}
                  <p className="text-xs text-muted-foreground">$0.00777</p>
                   <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className={cn(
                      "ml-auto flex items-center justify-center -mt-2",
                      "w-5 h-5 rounded-lg bg-[#1A2C38] hover:bg-[#223a4a] transition",
                      expandedItems.includes("0") && "rotate-180"
                    )}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

              </div>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <div onClick={goLiveStats} className="mx-2 mt-3 p-2 b-radius bg-sidebar-accent flex items-center justify-center cursor-pointer">
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
          <nav className={cn(" py-1 px-2  space-y-1", isCollapsed && "px-2")}>
            {menuItems.map((item) => (
              <div key={item.id}>
                {isCollapsed ? (
                  <div className={cn(
                    "w-full bg-sidebar-accent overflow-hidden transition-all",
                    expandedItems.includes(item.id) ? "rounded-t-sm" : "b-radius"
                  )}>
                    {/* Parent iconImg */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          // onClick={() => handleMenuItemClick(item.id, item.hasSubmenu)}
                          onClick={() => openParentRoute(item)}
                          className={cn(
                            "w-full flex items-center justify-center p-2 bg-sidebar-accent transition-colors",
                            "hover: hvr-btn",
                            expandedItems.includes(item.id)
                              ? "bg-sidebar-accent rounded-t-sm"
                              : "hover:hvr-btn"
                          )}
                        >
                          <img
                            src={item.iconImg}
                            alt={item.label}
                            className="w-5 h-5 object-contain"
                          />
                          {/* <img
                            src={item.iconImg}
                            alt={item.label}
                            className={cn(
                              "w-5 h-5",
                              isCollapsed && "mx-auto"
                            )}
                          /> */}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        {item.label}
                      </TooltipContent>
                    </Tooltip>

                    {/* ✅ SHOW SUB iconImgS ONLY IF EXPANDED */}
                    <div className="rounded-b-sm bg-sidebar-accent transition-colors">
                      {item.hasSubmenu &&
                        expandedItems.includes(item.id) &&
                        item.submenu?.map((sub) => (
                          <Tooltip key={sub.id}>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => handleNavigate(sub.id)}
                                className="bg-sidebar-accent transition-colors w-full flex items-center justify-center p-2 b-radius hover: hvr-btn"
                              >
                                <img
                                  src={sub.iconImg}
                                  alt={sub.label} className="w-5 h-5" />
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
                      // onClick={() => handleMenuItemClick(item.id, item.hasSubmenu)}
                      onClick={() => openParentRoute(item)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 bg-sidebar-accent hover:hvr-btn",
                        expandedItems.includes(item.id) ? "rounded-t-sm" : "b-radius"
                      )}>
                      <img
                        src={item.iconImg}
                        alt={item.label}
                        className="w-5 h-5 object-contain"
                      />
                      <span className="text-sm font-medium">{item.label}</span>

                      {item.hasSubmenu && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(item.id);
                          }}
                          className={cn(
                            "ml-auto flex items-center justify-center",
                            "w-5 h-5 rounded-lg bg-[#1A2C38] hover:bg-[#223a4a] transition",
                            expandedItems.includes(item.id) && "rotate-180"
                          )}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </button>
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
                              className="w-full flex items-center gap-3 px-3 py-2.5 b-radius bg-sidebar-accent hover:hvr-btn"
                            >
                              <img
                                src={sub.iconImg}
                                alt={sub.label}
                                className="w-5 h-5 object-contain"
                              />
                              <span className="text-xs font-medium">{sub.label}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>

                )}
              </div>
            ))}
            <div className="my-1 bg-sidebar-accent transition-colors b-radius">
              {midItems.map((item) => (
                isCollapsed ? (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleNavigate(item.id)}
                        className={cn(
                          "w-full flex items-center justify-center p-2.5 b-radius",
                          "hover: hvr-btn"
                        )}
                      >
                        <img
                          src={item.iconImg}
                          alt={item.label}
                          className="w-6 h-6 object-contain"
                        />
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
                      "w-full flex items-center gap-3 px-3 py-2.5 b-radius ",
                      "hover: hvr-btn"
                    )}
                  >
                    <img
                      src={item.iconImg}
                      alt={item.label}
                      className="w-5 h-5 object-contain"
                    />
                    <span className="flex-1 text-sm text-sidebar-foreground font-medium text-left">
                      {item.label}
                    </span>
                  </button>
                )
              ))}

            </div>
            <div className="bg-sidebar-accent transition-colors b-radius">
              {bottomItems.map((item) => (
                isCollapsed ? (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleNavigate(item.id)}
                        className={cn(
                          "w-full flex items-center justify-center p-2.5 b-radius",
                          "hover: hvr-btn"
                        )}
                      >
                        <img
                          src={item.iconImg}
                          alt={item.label}
                          className="w-5 h-5 object-contain"
                        />
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
                      "w-full flex items-center gap-3 px-3 py-2.5 b-radius ",
                      "hover: hvr-btn"
                    )}
                  >
                    <img
                      src={item.iconImg}
                      alt={item.label}
                      className="w-5 h-5 object-contain"
                    />
                    <span className="flex-1 text-sm text-sidebar-foreground font-medium text-left">
                      {item.label}
                    </span>
                    {/* {item.external && (
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    )} */}
                  </button>
                )
              ))}
            </div>
          </nav>

          <div className={cn("flex-1 px-2 space-y-1", isCollapsed && "px-2")}>
            {finalBottomMenu.map((item) => (
              <div key={item.id}>
                {isCollapsed ? (
                  <div
                    className={cn(
                      "w-full bg-sidebar-accent overflow-hidden transition-all",
                      expandedItems.includes(item.id) ? "rounded-t-sm" : "b-radius"
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
                            expandedItems.includes(item.id) ? "rounded-t-sm" : "b-radius"
                          )}
                        >
                          <img
                            src={item.iconImg}
                            alt={item.label}
                            className="w-5 h-5 object-contain"
                          />
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
                                <img
                                  src={sub.iconImg}
                                  alt={sub.label} className="w-6 h-6" />
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
                      // onClick={() => item.hasSubmenu && toggleExpand(item.id)}
                      onClick={() => openParentRoute(item)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 bg-sidebar-accent hover:hvr-btn transition-colors",
                        expandedItems.includes(item.id) ? "rounded-t-sm" : "b-radius"
                      )}
                    >
                      <img
                        src={item.iconImg}
                        alt={item.label}
                        className="w-5 h-5 object-contain"
                      />
                      <span className="text-sm font-medium">{item.label}</span>

                      {item.hasSubmenu && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(item.id);
                          }}
                          className={cn(
                            "ml-auto flex items-center justify-center",
                            "w-5 h-5 rounded-lg bg-[#1A2C38] hover:bg-[#223a4a] transition",
                            expandedItems.includes(item.id) && "rotate-180"
                          )}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </button>

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
                              className="w-full flex items-center gap-3 px-3 py-2.5 bg-sidebar-accent b-radius hover:hvr-btn transition-colors"
                            >
                              <img
                                src={sub.iconImg}
                                alt={sub.label} className="w-5 h-5" />
                              <span className="text-xs font-medium">{sub.label}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
                {/* ✅ INSERT APPLICATION CARD AFTER LIVE SUPPORT App Promo - Hidden when collapsed */}
                {!isCollapsed && item.id === "live" && (
                  <div className="p-3 mt-1 b-radius bg-sidebar-accent flex items-center mb-1">
                    <div className="flex items-center gap-1 w-full">
                      <div className="min-w-0">
                        <p className="text-sm text-foreground truncate font-bold">
                          Application
                        </p>
                        <p className="text-xs text-muted-foreground leading-tight">
                          <span className="block">Unlock Fun with Exclusive</span>
                          <span className="block opacity-80">Features</span>
                        </p>
                      </div>
                      <img
                        src={mobileSc}
                        alt="m-screen"
                        className="w-10 h-full "
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}

          </div>
          {/* Theme Toggle */}
          {!isCollapsed ? (
            <div className="p-2">
              <div className="flex b-radius bg-secondary/50 p-1">
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
                    className="w-full flex items-center justify-center p-2.5 b-radius bg-sidebar-accent transition-colors hvr-btn"
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
