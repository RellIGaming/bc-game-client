import { Search, Globe, MessageSquare, ChevronLeft, ChevronRight, ChevronDown, Gift, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BonusDropdown from "@/components/header/BonusDropdown";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import ProfileDropdown from "@/components/header/ProfileDropdown";
import BonusDashboardModal from "@/components/header/BonusDashboardModal";
import DepositDropdown from "../header/DepositDropdown";

interface HeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  onChatClick: () => void;
  onSignInClick: () => void;
  onSignUpClick: () => void;
  onLanguageClick: () => void;
  onCurrencyClick: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
  isSidebarCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Header = ({
  onMenuClick,
  onSearchClick,
  onChatClick,
  onSignInClick,
  onSignUpClick,
  onLanguageClick,
  onCurrencyClick,
  isDark,
  onThemeToggle,
  isSidebarCollapsed,
  onToggleCollapse,
  isLoggedIn = false,
  onLogout,
}: HeaderProps) => {
  const navigate = useNavigate();
  const [depositOpen, setDepositOpen] = useState(false);
  const [bonusOpen, setBonusOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [bonusDashboardOpen, setBonusDashboardOpen] = useState(false);

  const handleBonusDashboard = () => {
    setBonusOpen(false);
    setBonusDashboardOpen(true);
  };

  const handleLogoClick = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-14 bg-sidebar flex items-center px-3 lg:px-4"
        style={{ boxShadow: "0 14px 15px rgba(0, 0, 0, 0.3)" }}
      >
        <div className="flex items-center gap-2 lg:gap-4 flex-1">
          {/* Collapse Toggle for Desktop only */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-2 b-radius bg-secondary transition-colors hover:bg-secondary transition-colors"
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-5 h-5 text-foreground" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-foreground" />
            )}
          </button>

          {/* Logo - Clickable to refresh and go home */}
          <button onClick={handleLogoClick} className="flex flex-row items-center cursor-pointer hover:opacity-80 transition-opacity">
            <img src={logo} alt="logo" className="w-6 h-6 mr-2" />
            <span className="hidden lg:inline text-foreground font-semibold">Rellbet</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 lg:gap-2">
          {/* Search - desktop only */}
          <button
            onClick={onSearchClick}
            className="hvr-btn btn-press hidden lg:flex p-2 b-radius bg-secondary transition-colors hover:bg-secondary"
          >
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>

          {isLoggedIn ? (
            <>
              {/* Balance Dropdown - desktop only */}
              <div className="relative ">
                <button
                  onClick={() => setDepositOpen(!depositOpen)}
                  className="
    flex items-center
    h-7 min-h-8
    lg:h-auto
    bg-secondary b-radius
    pl-2 pr-1
    lg:pl-3
    lg:pr-1
    py-0 lg:py-1
    hover:bg-secondary/80
    transition-colors
  "
                >
                  <span className="text-primary text-sm lg:text-lg leading-none mr-1">
                    ₿
                  </span>

                  <span className="text-foreground text-xs lg:text-sm font-medium leading-none mr-6">
                    ₹0.00
                  </span>

                  <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 text-muted-foreground " />
                  <Plus className="w-6 h-6 lg:hidden py-1 px-2 bg-primary ml-4" />
                <span className="hidden lg:inline bg-primary text-sm py-1 b-radius px-3">Deposit</span>
                </button>

                <DepositDropdown
                  isOpen={depositOpen}
                  onClose={() => setDepositOpen(false)}
                  onDeposit={() => { }}
                />
              </div>

              {/* Mobile Balance Field */}
              {/* <div className="flex lg:hidden items-center gap-1 bg-secondary b-radius px-2 py-1">
                <span className="text-primary text-sm">₿</span>
                <span className="text-foreground text-xs font-medium">₹0.00</span>
              </div> */}

              {/* Deposit Button - + icon on mobile, "Deposit" on desktop */}
              {/* <Button
                className="
    h-7 w-9 p-0 
    lg:h-auto lg:w-auto lg:px-6 lg:py-2
    hvr-btn btn-press font-semibold
    flex items-center justify-center
  "
              >
                <Plus className="w-5 h-5 lg:hidden" />
                <span className="hidden lg:inline">Deposit</span>
              </Button> */}


              {/* Bonus/Gift Icon - desktop only */}
              <div className="relative ">
                <button
                  onClick={() => setBonusOpen(!bonusOpen)}
                  className="flex py-1 px-1 lg:px-2 lg:py-2 b-radius bg-secondary transition-all hvr-btn btn-press relative"
                >
                  <Gift className="w-5 h-5 text-muted-foreground" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    1
                  </span>
                </button>
                <BonusDropdown
                  isOpen={bonusOpen}
                  onClose={() => setBonusOpen(false)}
                  onBonusDashboard={handleBonusDashboard}
                />
              </div>

              {/* Notification Bell - desktop only */}
              <div className="relative ">
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="flex py-1 px-1 lg:px-2 lg:py-2 b-radius bg-secondary transition-all hvr-btn btn-press relative"
                >
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    11
                  </span>
                </button>
                <NotificationDropdown
                  isOpen={notificationOpen}
                  onClose={() => setNotificationOpen(false)}
                />
              </div>

              {/* Profile Avatar */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-7 h-7 lg:w-9 lg:h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-primary transition-all"
                >
                  <span className="text-lg lg:text-xl">🦁</span>
                </button>
                <ProfileDropdown
                  isOpen={profileOpen}
                  onClose={() => setProfileOpen(false)}
                  onLogout={onLogout || (() => { })}
                />
              </div>
            </>
          ) : (
            <>
              {/* Sign In - Always visible */}
              <Button
                variant="ghost"
                onClick={onSignInClick}
                className="hvr-btn text-foreground bg-secondary transition-colors hover:bg-secondary btn-press text-xs lg:text-sm px-4 lg:px-4"
              >
                Login
              </Button>

              {/* Sign Up - Always visible */}
              <Button
                onClick={onSignUpClick}
                className="hvr-btn text-primary-foreground hover:bg-primary/90 font-semibold px-3 lg:px-6 btn-press text-xs lg:text-sm"
              >
                Registration
              </Button>

              {/* Chat - desktop only */}
              {/* <button
              onClick={onChatClick}
              className="hidden lg:flex p-2 b-radius bg-secondary transition-all hvr-btn btn-press"
            >
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
            </button> */}

              {/* Globe - desktop only */}
              <button
                onClick={onLanguageClick}
                className="hvr-btn btn-press hidden lg:flex p-2 b-radius bg-secondary transition-colors hover:bg-secondary"
              >
                <Globe className="w-5 h-5 text-muted-foreground" />
              </button>
            </>
          )}
        </div>
      </header>
      {/* Bonus Dashboard Modal */}
      <BonusDashboardModal
        isOpen={bonusDashboardOpen}
        onClose={() => setBonusDashboardOpen(false)}
      />
    </>
  );
};

export default Header;
