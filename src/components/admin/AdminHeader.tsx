import { useState } from "react";
import { Search, Settings, Bell, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.png";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    navigate("/");
  };

  const handleLogoClick = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <header 
      className="h-14 bg-sidebar flex items-center justify-between px-3 lg:px-4"
      style={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)" }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Collapse Toggle for Desktop */}
        <button
          className="hidden lg:flex p-2 b-radius bg-secondary transition-colors hover:bg-secondary/80"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        
        {/* Logo - Clickable to refresh and go home */}
        <button onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <img src={logo} alt="Rellbet" className="w-6 h-6" />
          <span className="text-foreground font-semibold hidden sm:inline">Rellbet Admin</span>
        </button>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-border"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1 lg:gap-2">
        <button className="p-2 b-radius bg-secondary hvr-btn btn-press text-muted-foreground hover:text-foreground transition-colors">
          <Search className="w-5 h-5 lg:hidden" />
          <Settings className="w-5 h-5 hidden lg:block" />
        </button>
        <button className="hidden lg:flex p-2 b-radius bg-secondary hvr-btn btn-press text-muted-foreground hover:text-foreground transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 b-radius bg-secondary hvr-btn btn-press text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden sm:inline text-sm">Log Out</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
