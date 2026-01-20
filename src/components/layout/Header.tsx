import { Menu, Search, Globe, MessageSquare, ChevronLeft, ChevronRight, ChevronDown, Gift, Monitor, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
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
  isDark,
  onThemeToggle,
  isSidebarCollapsed,
  onToggleCollapse,
  isLoggedIn = false,
  onLogout,
}: HeaderProps) => {
  const [depositOpen, setDepositOpen] = useState(false);
  const [bonusOpen, setBonusOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [bonusDashboardOpen, setBonusDashboardOpen] = useState(false);

  const handleBonusDashboard = () => {
    setBonusOpen(false);
    setBonusDashboardOpen(true);
  };
  return (
    <> 
    <header
      className="fixed top-0 left-0 right-0 z-50 h-14 bg-sidebar flex items-center px-3 lg:px-4"
      style={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)" }}
    >
      <div className="flex items-center gap-2 lg:gap-4 flex-1">
        {/* Menu Toggle */}
        <button
          onClick={onMenuClick}
          className="hvr-btn p-2 rounded-sm  transition-colors lg:hidden"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </button>

        {/* Collapse Toggle for Desktop */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex p-2 rounded-sm bg-secondary transition-colors hover:bg-secondary transition-colors"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-5 h-5 text-foreground" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-foreground" />
          )}
        </button>
        <div className="flex flex-row">
          <img src={logo} alt="logo" className="w-6 h-6 mr-2" />
          <span>Rellbet</span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1 lg:gap-2">
        {/* Search */}
        <button
          onClick={onSearchClick}
          className="hvr-btn btn-press p-2 rounded-sm bg-secondary transition-colors hover:bg-secondary transition-colors"
        >
          <Search className="w-5 h-5 text-muted-foreground" />
        </button>
 {isLoggedIn ? (
          <>
            {/* Balance Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDepositOpen(!depositOpen)}
                className="hidden sm:flex items-center gap-2 bg-secondary rounded-lg px-3 py-1 hover:bg-secondary/80 transition-colors"
              >
                <span className="text-primary text-lg">₿</span>
                <span className="text-foreground font-medium">₹0.00</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
              <DepositDropdown
                isOpen={depositOpen}
                onClose={() => setDepositOpen(false)}
                onDeposit={() => {}}
              />
            </div>

            {/* Deposit Button */}
            <Button
              className="hvr-btn text-primary-foreground hover:bg-primary/90 font-semibold px-4 lg:px-6 btn-press"
            >
              Deposit
            </Button>

            {/* Bonus/Gift Icon */}
            <div className="relative">
              <button
                onClick={() => setBonusOpen(!bonusOpen)}
                className="hidden lg:flex p-2 rounded-sm bg-secondary transition-all hvr-btn btn-press relative"
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

            {/* Chat/Monitor Icon */}
            {/* <button
              onClick={onChatClick}
              className="hidden lg:flex p-2 rounded-sm bg-secondary transition-all hvr-btn btn-press"
            >
              <Monitor className="w-5 h-5 text-muted-foreground" />
            </button> */}

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="hidden lg:flex p-2 rounded-sm bg-secondary transition-all hvr-btn btn-press relative"
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
                className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-primary transition-all"
              >
                <span className="text-xl">🦁</span>
              </button>
              <ProfileDropdown
                isOpen={profileOpen}
                onClose={() => setProfileOpen(false)}
                onLogout={onLogout || (() => {})}
              />
            </div>
          </>
        ) : (
          <>
        {/* Sign In */}
        <Button
          variant="ghost"
          onClick={onSignInClick}
          className="hvr-btn hidden sm:flex text-foreground bg-secondary transition-colors hover:bg-secondary btn-press"
        >
          Login
        </Button>

        {/* Sign Up */}
        <Button
          onClick={onSignUpClick}
          className="hvr-btn text-primary-foreground hover:bg-primary/90 font-semibold px-4 lg:px-6 btn-press"
        >
          Registration
        </Button>

        {/* Chat */}
        <button
          onClick={onChatClick}
          className="hidden lg:flex p-2 rounded-sm bg-secondary transition-all hvr-btn btn-press"
        >
          <MessageSquare className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Globe */}
        <button 
          onClick={onLanguageClick}
          className="hvr-btn btn-press hidden lg:flex p-2 rounded-sm bg-secondary transition-colors hover:bg-secondary transition-colors"
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
