import { Menu, Search, Gamepad2, Trophy, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  onChatClick: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

// Order: Home, Casino, Sports, Explore, Menu
const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "explore", label: "Explore", icon: Search },
  { id: "casino", label: "Casino", icon: Gamepad2 },
  { id: "menu", label: "Menu", icon: Menu },
];

const MobileNav = ({
  onMenuClick,
  onSearchClick,
  activeTab,
  setActiveTab,
}: MobileNavProps) => {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    setActiveTab(id);
    if (id === "home") {
      navigate("/");
    } else if (id === "menu") {
      onMenuClick();
    } else if (id === "explore") {
      onSearchClick();
    } else if (id === "casino") {
      navigate("/category/casino");
    } else if (id === "sports") {
      navigate("/category/sports");
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-sidebar border-t border-border flex items-center justify-around px-2 lg:hidden z-40">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleClick(tab.id)}
          className={cn(
            "flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg transition-colors",
            activeTab === tab.id
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <tab.icon className="w-5 h-5" />
          <span className="text-[10px] font-medium">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default MobileNav;
