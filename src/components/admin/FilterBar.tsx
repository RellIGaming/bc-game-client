import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FilterBar = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Daily");
  const [dateRange, setDateRange] = useState("2024-04-24 - 23:59:32");

  const periods = ["Daily", "Weekly", "Monthly", "Custom"];

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Agent Search */}
        <div className="flex-1">
          <label className="text-xs text-muted-foreground mb-2 block">Agent</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search Agent"
              className="pl-10 bg-secondary/50 border-border"
            />
          </div>
        </div>

        {/* Stitce Triage Dropdown */}
        <div className="flex-1">
          <label className="text-xs text-muted-foreground mb-2 block">Stitce Triage</label>
          <select className="w-full h-10 px-3 bg-secondary/50 border border-border rounded-lg text-foreground text-sm">
            <option>SellGop</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </div>

        {/* Period Selector */}
        <div className="flex-1">
          <label className="text-xs text-muted-foreground mb-2 block">Period</label>
          <div className="flex gap-1 flex-wrap">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                  selectedPeriod === period
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className="flex-1">
          <label className="text-xs text-muted-foreground mb-2 block">Date Range</label>
          <Input
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-secondary/50 border-border"
          />
        </div>

        {/* Filter Button */}
        <div className="flex-shrink-0">
          <label className="text-xs text-muted-foreground mb-2 block invisible">Action</label>
          <Button className="bg-primary hover:bg-primary/90">
            <Filter className="w-4 h-4 mr-2" />
            Filter Analytics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
