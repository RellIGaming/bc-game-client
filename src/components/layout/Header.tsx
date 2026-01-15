import { Menu, Search, Moon, Sun, Globe, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";

interface HeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  onChatClick: () => void;
  onSignInClick: () => void;
  onSignUpClick: () => void;
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
  isDark,
  onThemeToggle,
  isSidebarCollapsed,
  onToggleCollapse,
}: HeaderProps) => {
  return (
    <header 
      className="sticky top-0 z-50 h-14 lg:h-16 bg-gaming-dark flex items-center px-3 lg:px-4"
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <div className="flex items-center gap-2 lg:gap-4 flex-1">
        {/* Menu Toggle */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-secondary transition-colors lg:hidden"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </button>

        {/* Collapse Toggle for Desktop */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-5 h-5 text-foreground" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-foreground" />
          )}
        </button>

        {/* Logo */}
        <Logo />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1 lg:gap-2">
        {/* Search */}
        <button
          onClick={onSearchClick}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <Search className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Sign In */}
        <Button
          variant="ghost"
          onClick={onSignInClick}
          className="hidden sm:flex text-foreground hover:bg-secondary"
        >
          Login
        </Button>

        {/* Sign Up */}
        <Button
          onClick={onSignUpClick}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-4 lg:px-6"
        >
          Registration
        </Button>

        {/* Chat */}
        <button
          onClick={onChatClick}
          className="hidden lg:flex p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <MessageSquare className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Globe */}
        <button className="hidden lg:flex p-2 rounded-lg hover:bg-secondary transition-colors">
          <Globe className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Theme Toggle - Hidden by default, shown on larger screens */}
        <button
          onClick={onThemeToggle}
          className="hidden xl:flex p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-muted-foreground" />
          ) : (
            <Moon className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
