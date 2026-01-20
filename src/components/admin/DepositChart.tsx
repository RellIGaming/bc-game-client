import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const DepositChart = () => {
  const data = [
    { date: "11.", value: 12 },
    { date: "1", value: 25 },
    { date: "5", value: 40 },
    { date: "10", value: 35 },
    { date: "15", value: 58 },
    { date: "20", value: 45 },
    { date: "23", value: 72 },
    { date: "24", value: 85 },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm text-muted-foreground">Total Deposits</h3>
        <div className="flex items-center gap-2">
          <span className="text-xl lg:text-2xl font-bold text-primary">$1.2M</span>
          <span className="text-xs text-muted-foreground">2022-08-37</span>
        </div>
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="depositGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#depositGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span>Deposits</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-primary">▼ S04</span>
        </div>
        <div className="flex items-center gap-2">
          <span>E18</span>
        </div>
      </div>
    </div>
  );
};

export default DepositChart;
