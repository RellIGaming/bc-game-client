import { Menu, Search, Gamepad2, Trophy, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  onChatClick: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { id: "explore", label: "Explore", icon: Search },
  { id: "casino", label: "Casino", icon: Gamepad2 },
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "menu", label: "Menu", icon: Menu },
];

const MobileNav = ({
  onMenuClick,
  onSearchClick,
  onChatClick,
  activeTab,
  setActiveTab,
}: MobileNavProps) => {
  const handleClick = (id: string) => {
    setActiveTab(id);
    if (id === "menu") onMenuClick();
    if (id === "explore") onSearchClick();
    if (id === "chat") onChatClick();
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-gaming-dark border-t border-border flex items-center justify-around px-2 lg:hidden z-40">
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
