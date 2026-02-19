import {
  Globe, Home, Notebook, Search, Signal, Star, ChevronDown,
  Gamepad2, Trophy, Bike, Dribbble, Target, Swords, Volleyball,
  Table2, Boxes, Flame
} from "lucide-react";
import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

const sportsCategory = [
  { id: "home", icon: Home, label: "Home", sportKey: undefined },
  { id: "live", icon: Signal, label: "Live", isLive: true, sportKey: undefined },
  { id: "fav", icon: Star, label: "Favourites", sportKey: undefined },
  { id: "divider", icon: null, label: "", isDivider: true, sportKey: undefined },
  { id: "mybets", icon: Notebook, label: "My Bets", sportKey: undefined },
  { id: "soccer", icon: Globe, label: "Soccer", sportKey: "soccer" },
  { id: "originals", icon: Gamepad2, label: "Originals", hasNotification: true, sportKey: undefined },
  { id: "esoccer", icon: Dribbble, label: "eSoccer", sportKey: "esoccer" },
  { id: "tennis", icon: Target, label: "Tennis", sportKey: "tennis" },
  { id: "boxing", icon: Swords, label: "Boxing", sportKey: "boxing" },
  { id: "basketball", icon: Trophy, label: "Basketball", sportKey: "basketball" },
  { id: "counter-strike", icon: Gamepad2, label: "Counter-Strike", sportKey: "counter-strike" },
  { id: "volleyball", icon: Volleyball, label: "Volleyball", sportKey: "volleyball" },
  { id: "table-tennis", icon: Table2, label: "Table Tennis", sportKey: "table-tennis" },
  { id: "ice-hockey", icon: Boxes, label: "Ice Hockey", sportKey: "ice-hockey" },
  { id: "dota2", icon: Swords, label: "Dota 2", sportKey: "dota2" },
  { id: "mma", icon: Flame, label: "MMA", sportKey: "mma" },
  { id: "handball", icon: Volleyball, label: "Handball", sportKey: "handball" },
  { id: "racing", icon: Bike, label: "Racing", sportKey: "racing" },
];

const dropdownCategories = [
  { label: "Soccer", count: 719, icon: Globe, sportKey: "soccer" },
  { label: "GAME: Originals", count: 4, icon: Gamepad2, sportKey: undefined },
  { label: "eSoccer", count: 113, icon: Dribbble, sportKey: "esoccer" },
  { label: "Tennis", count: 245, icon: Target, sportKey: "tennis" },
  { label: "Basketball", count: 73, icon: Trophy, sportKey: "basketball" },
  { label: "Counter-Strike", count: 43, icon: Gamepad2, sportKey: "counter-strike" },
  { label: "Cricket", count: 36, icon: Volleyball, sportKey: "cricket" },
  { label: "Volleyball", count: 31, icon: Volleyball, sportKey: "volleyball" },
  { label: "Ice Hockey", count: 95, icon: Boxes, sportKey: "ice-hockey" },
  { label: "Dota 2", count: 19, icon: Swords, sportKey: "dota2" },
  { label: "Boxing", count: 40, icon: Swords, sportKey: "boxing" },
  { label: "American Football", count: 9, icon: Trophy, sportKey: "american-football" },
  { label: "Table Tennis", count: 6, icon: Table2, sportKey: "table-tennis" },
  { label: "MMA", count: 15, icon: Flame, sportKey: "mma" },
  { label: "Handball", count: 12, icon: Volleyball, sportKey: "handball" },
];

interface SportsCategoryTabsProps {
  showSearch: boolean;
  setShowSearch: (value: boolean | ((prev: boolean) => boolean)) => void;
  onCategorySelect?: (category: string) => void;
  activeCategory?: string;
}

const SportsCategoryTabs = ({ showSearch, setShowSearch, onCategorySelect, activeCategory }: SportsCategoryTabsProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeDropdownTab, setActiveDropdownTab] = useState<'sports' | 'esports' | 'racing'>('sports');
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleTabClick = (tab: typeof sportsCategory[0]) => {
    if (tab.sportKey) {
      onCategorySelect?.(tab.sportKey);
    } else if (tab.id === 'home') {
      navigate('/sports');
    }
  };

  const handleDropdownClick = (cat: typeof dropdownCategories[0]) => {
    if (cat.sportKey) {
      onCategorySelect?.(cat.sportKey);
      setShowDropdown(false);
    }
  };

  const visibleBeforeDivider = sportsCategory.slice(0, 3);
  const divider = sportsCategory.find(c => c.isDivider);
  const afterDivider = sportsCategory.filter(c => !c.isDivider && sportsCategory.indexOf(c) > 3);
  const visibleAfterDivider = isMobile ? afterDivider.slice(0, 2) : afterDivider.slice(0, 10);
  const hasMore = afterDivider.length > (isMobile ? 2 : 10);

  return (
    <div className="relative">
      <div className="flex items-center gap-1 p-2 bg-card rounded-lg overflow-x-auto scrollbar-hide">
        {visibleBeforeDivider.map((t) => {
          const Icon = t.icon;
          if (!Icon) return null;
          return (
            <Tooltip key={t.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleTabClick(t)}
                  className={cn(
                    "flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap relative",
                    (activeCategory === t.sportKey || (!activeCategory && t.id === 'home'))
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-primary/20 text-muted-foreground"
                  )}
                >
                  {t.isLive ? (
                    <span className="px-2 py-0.5 bg-betting-live text-white text-xs font-bold rounded">LIVE</span>
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>{t.label}</TooltipContent>
            </Tooltip>
          );
        })}

        {divider && <div className="w-px h-6 bg-border mx-1" />}

        {visibleAfterDivider.map((t) => {
          const Icon = t.icon;
          if (!Icon) return null;
          return (
            <Tooltip key={t.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleTabClick(t)}
                  className={cn(
                    "flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap relative",
                    activeCategory === t.sportKey
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-primary/20 text-muted-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {t.hasNotification && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-betting-live rounded-full" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>{t.label}</TooltipContent>
            </Tooltip>
          );
        })}

        {hasMore && (
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all",
              showDropdown ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-primary/20 text-muted-foreground"
            )}
          >
            <ChevronDown className={cn("w-4 h-4 transition-transform", showDropdown && "rotate-180")} />
          </button>
        )}

        <button
          onClick={() => setShowSearch((prev) => !prev)}
          className="ml-auto px-3 py-2 rounded-md bg-secondary hover:bg-primary/20 transition-all text-muted-foreground"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-fade-in">
          <div className="flex items-center justify-center gap-2 p-4 border-b border-border">
            {(['sports', 'esports', 'racing'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveDropdownTab(tab)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all capitalize",
                  activeDropdownTab === tab ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
            <button className="ml-4 p-2 rounded-full bg-betting-live/20 text-betting-live">
              <Signal className="w-4 h-4" />
            </button>
          </div>

          <div className={cn("p-4 max-h-80 overflow-y-auto", isMobile ? "grid grid-cols-1 gap-1" : "grid grid-cols-4 gap-x-8 gap-y-2")}>
            {dropdownCategories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleDropdownClick(cat)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors text-left w-full",
                    activeCategory === cat.sportKey && "bg-primary/20"
                  )}
                >
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-foreground flex-1">{cat.label}</span>
                  <span className="text-xs text-muted-foreground">{cat.count}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {showDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
      )}
    </div>
  );
};

export default SportsCategoryTabs;
