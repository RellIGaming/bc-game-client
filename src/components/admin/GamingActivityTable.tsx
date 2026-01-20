import { useState } from "react";
import { Plus, Edit, Trash2, MoreHorizontal, BarChart3, Eye, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface GamingRow {
  id: string;
  icon: React.ReactNode;
  label: string;
  udd: string;
  uod: string;
  rlb: string;
  lofG: string;
}

const GamingActivityTable = () => {
  const [data, setData] = useState<GamingRow[]>([
    { id: "1", icon: <BarChart3 className="w-4 h-4" />, label: "Total Bets", udd: "$0.00", uod: "$0.00", rlb: "$0.00", lofG: "$0.000" },
    { id: "2", icon: <Eye className="w-4 h-4" />, label: "", udd: "$0.00", uod: "$0.00", rlb: "$6.000", lofG: "$0.000" },
    { id: "3", icon: <Shuffle className="w-4 h-4" />, label: "", udd: "$0.00", uod: "$0.00", rlb: "$6.000", lofG: "$0.000" },
  ]);

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground">Gaming Activity</h3>
          <span className="text-muted-foreground text-xs">ⓘ</span>
        </div>
        <Button size="sm" variant="ghost" className="text-primary">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3 text-xs font-medium text-muted-foreground"></th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">UDD</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">UOD</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">RlB</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">LofG</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b border-border hover:bg-secondary/30 transition-colors ${
                  index % 2 === 0 ? "bg-secondary/10" : ""
                }`}
              >
                <td className="p-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {row.icon}
                    <span className="text-sm">{row.label}</span>
                  </div>
                </td>
                <td className="p-3 text-sm text-foreground">{row.udd}</td>
                <td className="p-3 text-sm text-foreground">{row.uod}</td>
                <td className="p-3 text-sm text-foreground">{row.rlb}</td>
                <td className="p-3 text-sm text-foreground">{row.lofG}</td>
                <td className="p-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-secondary/50 rounded">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDelete(row.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
            <tr className="bg-secondary/20">
              <td className="p-3 text-sm font-medium text-foreground">Total</td>
              <td className="p-3 text-sm font-medium text-foreground">$0.000</td>
              <td className="p-3 text-sm font-medium text-foreground">$0.00</td>
              <td className="p-3 text-sm font-medium text-foreground">$6.000</td>
              <td className="p-3 text-sm font-medium text-primary">$0.006</td>
              <td className="p-3"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GamingActivityTable;
