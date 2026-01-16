import { Menu, Search, Globe, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "../../assets/images/logo.png";

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
}: HeaderProps) => {
  
  return (
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
      </div>
    </header>
  );
};

export default Header;
