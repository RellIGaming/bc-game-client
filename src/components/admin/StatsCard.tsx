import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down";
  icon?: ReactNode;
  chart?: ReactNode;
  className?: string;
}

const StatsCard = ({
  title,
  value,
  change,
  changeType = "up",
  icon,
  chart,
  className = "",
}: StatsCardProps) => {
  return (
    <div className={`bg-card border border-border rounded-xl p-4 lg:p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm text-muted-foreground mb-1">{title}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-xl lg:text-2xl font-bold text-foreground">{value}</span>
            {change && (
              <span
                className={`flex items-center text-xs ${
                  changeType === "up" ? "text-primary" : "text-destructive"
                }`}
              >
                {changeType === "up" ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {change}
              </span>
            )}
          </div>
        </div>
        {icon && (
          <div className="p-2 bg-primary/20 rounded-lg">{icon}</div>
        )}
      </div>
      {chart && <div className="mt-4">{chart}</div>}
    </div>
  );
};

export default StatsCard;
