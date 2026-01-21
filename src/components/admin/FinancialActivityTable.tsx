import { useState } from "react";
import { Plus, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FinancialRow {
  id: string;
  ref: string;
  crypto: string;
  udd: string;
  tmd: string;
  csb: string;
  rlb: string;
  flat: string;
}

const FinancialActivityTable = () => {
  const [data, setData] = useState<FinancialRow[]>([
    { id: "1", ref: "", crypto: "grO", udd: "$0.00", tmd: "$0.00", csb: "$0.00", rlb: "$0.00", flat: "$0.00" },
    { id: "2", ref: "", crypto: "Cryp", udd: "$0.00", tmd: "$0.00", csb: "$0.00", rlb: "$0.00", flat: "$0.00" },
    { id: "3", ref: "", crypto: "EUR", udd: "$0.00", tmd: "$0.00", csb: "$0.00", rlb: "$0.00", flat: "$0.00" },
  ]);

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground">Financial Activity</h3>
          <span className="text-muted-foreground text-xs">ⓘ</span>
        </div>
        <Button size="sm" variant="ghost" className="text-primary">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">Ref</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">Crypto</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">UDD</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">TMD</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">CSB</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">RlB</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">Flat</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b border-border hover:bg-secondary/30 transition-colors ${
                  index % 2 === 0 ? "bg-secondary/20" : "bg-card"
                }`}
              >
                <td className="p-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20" />
                </td>
                <td className="p-3 text-sm text-primary">{row.crypto}</td>
                <td className="p-3 text-sm text-foreground">{row.udd}</td>
                <td className="p-3 text-sm text-foreground">{row.tmd}</td>
                <td className="p-3 text-sm text-foreground">{row.csb}</td>
                <td className="p-3 text-sm text-foreground">{row.rlb}</td>
                <td className="p-3 text-sm text-foreground">{row.flat}</td>
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
              <td className="p-3 text-sm font-medium text-foreground" colSpan={2}>
                TOtal Creecls
              </td>
              <td className="p-3 text-sm font-medium text-foreground">$0.00</td>
              <td className="p-3 text-sm font-medium text-primary">$921,506</td>
              <td className="p-3" colSpan={4}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialActivityTable;
