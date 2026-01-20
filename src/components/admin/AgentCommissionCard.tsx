import { useState } from "react";
import { MoreHorizontal, X } from "lucide-react";

const AgentCommissionCard = () => {
  const [showCustom, setShowCustom] = useState(false);

  return (
    <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm text-muted-foreground">Agent Commission</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">5 Crypto</span>
          <span className="text-xl lg:text-2xl font-bold text-primary">$125,980</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Totn</span>
          <span>S:S18687 - 44938 $118, 9845 on Managed Use</span>
        </div>
        <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full" style={{ width: "75%" }} />
        </div>
      </div>

      {/* Commission Stats */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">ComInlayers</span>
        </div>
        <div className="flex items-center gap-2">
          <X className="w-4 h-4 text-destructive" />
          <span className="text-sm text-foreground">Top@ @betmaster.com</span>
          <label className="relative inline-flex items-center cursor-pointer ml-auto">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-9 h-5 bg-secondary/50 rounded-full peer peer-checked:bg-primary transition-colors" />
          </label>
        </div>
      </div>

      {/* Agent Settings */}
      <div className="bg-secondary/30 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Agent Ss rapasentr:</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input type="radio" name="commission" className="accent-primary" defaultChecked />
            Custom Commission:
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <button className="p-2 bg-secondary/50 hover:bg-secondary rounded-lg">
          <MoreHorizontal className="w-4 h-4" />
        </button>
        {[3, 4, 5].map((num) => (
          <button key={num} className="p-2 bg-secondary/50 hover:bg-secondary rounded-lg text-xs">
            {num}
          </button>
        ))}
        <span className="text-xs text-muted-foreground mx-2">90188</span>
        <span className="text-xs text-primary">$410</span>
        <span className="text-xs text-muted-foreground">6562809</span>
      </div>

      {/* Toggle Options */}
      <div className="flex items-center gap-4 mt-4 flex-wrap">
        <span className="text-xs text-muted-foreground">Or Barns</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-9 h-5 bg-secondary/50 rounded-full peer peer-checked:bg-primary transition-colors" />
        </label>
      </div>
    </div>
  );
};

export default AgentCommissionCard;
