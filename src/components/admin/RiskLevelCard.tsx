import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RiskLevel {
  level: string;
  color: string;
  value: string;
}

const RiskLevelCard = () => {
  const riskLevels: RiskLevel[] = [
    { level: "Low", color: "bg-primary", value: "20,38k" },
    { level: "Medium", color: "bg-yellow-500", value: "6,79k" },
    { level: "High", color: "bg-destructive", value: "590" },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
      {/* Risk Leases Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary">📊</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Risk Leases</p>
            <p className="text-xs text-muted-foreground">Level 1</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl lg:text-3xl font-bold text-primary">$921,506</p>
        </div>
      </div>

      {/* View Balance Button */}
      <Button className="w-full bg-primary hover:bg-primary/90 mb-6">
        View Balance Reports
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>

      {/* Risk Level Section */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-4">Risk Level</h4>
        <div className="space-y-4">
          {riskLevels.map((risk) => (
            <div key={risk.level} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${risk.color}`} />
                <span className="text-sm text-muted-foreground">{risk.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-foreground">{risk.value}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskLevelCard;
