import { Globe, Home, Notebook, PlayIcon, Search, Signal, Star, X } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";

const sportsCategory = [
  { id: "1", icon: Home, label: "Home" },
  { id: "2", icon: Signal, label: "Live" },
  { id: "3", icon: Star, label: "Favourites" },
  { id: "4", icon: Notebook, label: "My Bets" },
  { id: "5", icon: Globe, label: "Soccer" },
  { id: "6", icon: Home, label: "Original" },
  { id: "7", icon: Home, label: "eSoccer" },
  { id: "8", icon: PlayIcon, label: "Videos" },
  { id: "9", icon: Notebook, label: "My Bets" },
  { id: "10", icon: Notebook, label: "My Bets" },
  { id: "11", icon: Notebook, label: "My Bets" },
  { id: "12", icon: Notebook, label: "My Bets" },
];

const SportsCategoryTabs = ({ showSearch, setShowSearch }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [query, setQuery] = useState("");

  const filteredCategories = useMemo(() => {
    return sportsCategory.filter((c) =>
      c.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="w-full">

      {/* 🔥 STICKY TABS SECTION */}
      <div className="flex items-center gap-2 p-3 border-b border-border bg-card sticky top-0 z-40 overflow-x-auto custom-scrollbar">
        {filteredCategories.map((t) => {
          const Icon = t.icon;

          return (
            <Tooltip key={t.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setActiveTab(t.id)}
                  className={cn(
                    "flex items-center justify-center px-3 py-2 b-radius text-sm font-medium transition-all whitespace-nowrap",
                    activeTab === t.id
                      ? "bg-primary text-white"
                      : "bg-secondary hover:bg-primary/20"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </button>
              </TooltipTrigger>

              <TooltipContent side="bottom" align="center">
                {t.label}
              </TooltipContent>
            </Tooltip>
          );
        })}

        {/* 🔍 Search Icon (inside sticky bar) */}
        <button
          onClick={() => setShowSearch((prev) => !prev)}
          className="ml-auto px-3 py-2 rounded-md bg-secondary hover:bg-primary/20 transition-all"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* ✅ SEARCH BAR OUTSIDE STICKY */}
      {showSearch && (
       
        <div className="animate-fade-in">
          <div className="w-full mx-auto p-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search"
                  autoFocus
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

    </div>
  );
};
export default SportsCategoryTabs;
