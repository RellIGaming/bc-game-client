import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const ActivePlayersChart = () => {
  const data = [
    { date: "2", value: 18 },
    { date: "4", value: 28 },
    { date: "6", value: 22 },
    { date: "8", value: 32 },
    { date: "10", value: 25 },
    { date: "12", value: 35 },
    { date: "14", value: 30 },
    { date: "16", value: 28 },
    { date: "18", value: 38 },
    { date: "20", value: 42 },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm text-muted-foreground">Total Active Players</h3>
        <span className="text-xl lg:text-2xl font-bold text-primary">2:7.5k</span>
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
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
            <Bar
              dataKey="value"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              opacity={0.8}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span>Repossit</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 b-radius bg-primary/50" />
          <span>All Players</span>
        </div>
      </div>
    </div>
  );
};

export default ActivePlayersChart;
