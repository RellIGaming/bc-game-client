import { Globe, Home, Notebook, PlayIcon, Search, Signal, Star, X } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Tooltip, TooltipContent , TooltipTrigger} from "../ui/tooltip";
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

const SportsCategoryTabs = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [showSearch, setShowSearch] = useState(false);
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
        <div className="px-3 py-2 b-radius border-border flex items-center gap-2 mt-4 mx-2">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sports..."
            className="flex-1 px-3 py-3 bg-secondary b-radius border-b border border-border text-sm outline-none focus:ring-1 focus:ring-primary"
          />

          {/* ❌ Close Button */}
          <button
            onClick={() => {
              setShowSearch(false);
              setQuery("");
            }}
            className="px-2 py-2 b-radius bg-secondary hover:bg-destructive/20 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
export default SportsCategoryTabs;
