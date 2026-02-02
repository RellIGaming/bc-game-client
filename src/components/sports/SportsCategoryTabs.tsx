import { 
  Globe, 
  Home, 
  Notebook, 
  PlayIcon, 
  Search, 
  Signal, 
  Star, 
  X,
  ChevronDown,
  Gamepad2,
  Trophy,
  Bike,
  Dribbble,
  Target,
  Swords,
  Volleyball,
  Table2,
  Boxes,
  Flame
} from "lucide-react";
import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const sportsCategory = [
  { id: "1", icon: Home, label: "Home" },
  { id: "2", icon: Signal, label: "Live", isLive: true },
  { id: "3", icon: Star, label: "Favourites" },
  { id: "divider", icon: null, label: "", isDivider: true },
  { id: "4", icon: Notebook, label: "My Bets" },
  { id: "5", icon: Globe, label: "Soccer" },
  { id: "6", icon: Gamepad2, label: "Originals", hasNotification: true },
  { id: "7", icon: Dribbble, label: "eSoccer" },
  { id: "8", icon: Target, label: "Tennis" },
  { id: "9", icon: Swords, label: "Boxing" },
  { id: "10", icon: Trophy, label: "Basketball" },
  { id: "11", icon: Volleyball, label: "Volleyball" },
  { id: "12", icon: Table2, label: "Table Tennis" },
  { id: "13", icon: Bike, label: "Racing" },
  { id: "14", icon: Boxes, label: "Chess" },
  { id: "15", icon: Flame, label: "MMA" },
];

const dropdownCategories = [
  { label: "Soccer", count: 719, icon: Globe },
  { label: "BC.GAME: Originals", count: 4, icon: Gamepad2 },
  { label: "eSoccer", count: 113, icon: Dribbble },
  { label: "Tennis", count: 245, icon: Target },
  { label: "Basketball", count: 73, icon: Trophy },
  { label: "Baseball", count: 3, icon: Swords },
  { label: "Cricket", count: 36, icon: Volleyball },
  { label: "Volleyball", count: 31, icon: Volleyball },
  { label: "Predictions", count: 4, icon: Flame },
  { label: "Ice Hockey", count: 95, icon: Boxes },
  { label: "Boxing", count: 40, icon: Swords },
  { label: "American Football", count: 9, icon: Trophy },
  { label: "Table Tennis", count: 6, icon: Table2 },
  { label: "eBasketball", count: 50, icon: Trophy },
  { label: "Chess", count: 4, icon: Boxes },
];

interface SportsCategoryTabsProps {
  showSearch: boolean;
  setShowSearch: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const SportsCategoryTabs = ({ showSearch, setShowSearch }: SportsCategoryTabsProps) => {
  const [activeTab, setActiveTab] = useState("1");
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeDropdownTab, setActiveDropdownTab] = useState<'sports' | 'esports' | 'racing'>('sports');
  const isMobile = useIsMobile();

  // Desktop: show first 3, divider, then next icons until "More"
  // Mobile: show first 3, divider, then 2 icons, then dropdown
  const visibleBeforeDivider = sportsCategory.slice(0, 3);
  const divider = sportsCategory.find(c => c.isDivider);
  const afterDivider = sportsCategory.filter(c => !c.isDivider && sportsCategory.indexOf(c) > 3);
  
  const visibleAfterDivider = isMobile ? afterDivider.slice(0, 2) : afterDivider.slice(0, 8);
  const hasMore = afterDivider.length > (isMobile ? 2 : 8);

  return (
    <div className="relative">
      {/* STICKY TABS SECTION */}
      <div className="flex items-center gap-1 p-2 bg-card rounded-lg overflow-x-auto scrollbar-hide">
        {/* First 3 icons */}
        {visibleBeforeDivider.map((t) => {
          const Icon = t.icon;
          if (!Icon) return null;

          return (
            <Tooltip key={t.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setActiveTab(t.id)}
                  className={cn(
                    "flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap relative",
                    activeTab === t.id
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
              <TooltipContent>
                {t.label}
              </TooltipContent>
            </Tooltip>
          );
        })}

        {/* Vertical Divider */}
        {divider && (
          <div className="w-px h-6 bg-border mx-1" />
        )}

        {/* Icons after divider */}
        {visibleAfterDivider.map((t) => {
          const Icon = t.icon;
          if (!Icon) return null;

          return (
            <Tooltip key={t.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setActiveTab(t.id)}
                  className={cn(
                    "flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap relative",
                    activeTab === t.id
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
              <TooltipContent>
                {t.label}
              </TooltipContent>
            </Tooltip>
          );
        })}

        {/* More dropdown button */}
        {hasMore && (
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all",
              showDropdown 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary hover:bg-primary/20 text-muted-foreground"
            )}
          >
            <ChevronDown className={cn("w-4 h-4 transition-transform", showDropdown && "rotate-180")} />
          </button>
        )}

        {/* Search Icon */}
        <button
          onClick={() => setShowSearch((prev) => !prev)}
          className="ml-auto px-3 py-2 rounded-md bg-secondary hover:bg-primary/20 transition-all text-muted-foreground"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-fade-in">
          {/* Tabs: Sports, Esports, Racing */}
          <div className="flex items-center justify-center gap-2 p-4 border-b border-border">
            {(['sports', 'esports', 'racing'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveDropdownTab(tab)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all capitalize",
                  activeDropdownTab === tab
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
            <button className="ml-4 p-2 rounded-full bg-betting-live/20 text-betting-live">
              <Signal className="w-4 h-4" />
            </button>
          </div>

          {/* Category Grid */}
          <div className={cn(
            "p-4 max-h-80 overflow-y-auto",
            isMobile ? "grid grid-cols-1 gap-1" : "grid grid-cols-4 gap-x-8 gap-y-2"
          )}>
            {dropdownCategories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <button
                  key={index}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors text-left w-full"
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

      {/* Search Modal */}
      {showSearch && (
        <div className="">
          <div className="mx-auto p-6">
            {/* Search Header with quick filters */}
            <div className="flex flex-wrap gap-4 overflow-x-auto pb-4 mb-4 border-b border-border">
              <button className="p-2 text-muted-foreground hover:text-foreground">
                <Home className="w-5 h-5" />
              </button>
              <button className="px-3 py-1 bg-betting-live text-white text-xs font-bold rounded">LIVE</button>
              <button className="p-2 text-muted-foreground hover:text-foreground">
                <Star className="w-5 h-5" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground">
                <Notebook className="w-5 h-5" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground">
                <Gamepad2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground">
                <Globe className="w-5 h-5" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground">
                <Trophy className="w-5 h-5" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground">
                <Target className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-secondary rounded-lg text-foreground outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                onClick={() => {
                  setShowSearch(false);
                  setQuery("");
                }}
                className="px-4 py-3 bg-secondary text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                Close
              </button>
            </div>

            {/* Popular Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['UEFA Europa League', 'UEFA Champions League', 'Penalty Shoot-out (10 shots)', 'Saloon Dice (10 rounds)', 'FA Cup (2x6 min)', 'Copa del Rey'].map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 bg-secondary text-foreground text-sm rounded-full hover:bg-muted transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Empty State */}
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 mb-6">
                <div className="relative">
                  <Search className="w-16 h-16 text-primary" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full" />
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2">Looking for something special?</h3>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)} 
        />
      )}
    </div>
  );
};

export default SportsCategoryTabs;
