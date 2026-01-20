import { useState } from "react";
import { Edit, Trash2, Eye, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Bet {
  id: string;
  betname: string;
  username: string;
  betAmount: string;
  gain: string;
  sportGame: string;
  transparent: string;
  softpriced: string;
  deposits: string;
  time: string;
}

const LiveBetsTable = () => {
  const [bets, setBets] = useState<Bet[]>([
    {
      id: "986202",
      betname: "jheal2",
      username: "CS1257",
      betAmount: "49993.28%",
      gain: "",
      sportGame: "Roulette",
      transparent: "P - 2.15",
      softpriced: "ISCO",
      deposits: "5 catrolls",
      time: "1 lesis ago",
    },
    {
      id: "986202",
      betname: "mepker",
      username: "16.5,USDT",
      betAmount: "$113 -",
      gain: "",
      sportGame: "U65A Cromplica Leetler",
      transparent: "@932,718",
      softpriced: "USD",
      deposits: "3 catrolls",
      time: "1 lesis ago",
    },
    {
      id: "986201",
      betname: "jackk69",
      username: "48.2,USDT",
      betAmount: "$385 -",
      gain: "",
      sportGame: "Sinical lmager",
      transparent: "@33,3898",
      softpriced: "USD",
      deposits: "5 catrolls",
      time: "6 lesis ago",
    },
    {
      id: "986209",
      betname: "swicy22",
      username: "16.5,USDT",
      betAmount: "0428 +4%",
      gain: "",
      sportGame: "LSDB8",
      transparent: "@92,3989",
      softpriced: "USD",
      deposits: "9 catrolls",
      time: "6 lesis ago",
    },
    {
      id: "986165",
      betname: "arman 24",
      username: "$100",
      betAmount: "$866 +1833",
      gain: "",
      sportGame: "WxA",
      transparent: "26 cyple ago",
      softpriced: "MGA",
      deposits: "23 stsmols",
      time: "6 lesis ago",
    },
  ]);

  const handleDelete = (id: string) => {
    setBets((prev) => prev.filter((bet) => bet.id !== id));
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground">Live Bets</h3>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-1" /> Add Bet
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">ID</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">Betname</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">Username</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">Bet Amulty</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">Sport / Game</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">Transparent</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">Softpriced.com</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">Deposits</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">Time</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bets.map((bet, index) => (
              <tr
                key={`${bet.id}-${index}`}
                className={`border-b border-border hover:bg-secondary/30 transition-colors ${
                  index % 2 === 0 ? "bg-secondary/10" : ""
                }`}
              >
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{bet.id}</span>
                  </div>
                </td>
                <td className="p-3 text-sm text-foreground">{bet.betname}</td>
                <td className="p-3 text-sm text-primary">{bet.username}</td>
                <td className="p-3 text-sm text-foreground">{bet.betAmount}</td>
                <td className="p-3 text-sm text-foreground">{bet.sportGame}</td>
                <td className="p-3 text-sm text-foreground">{bet.transparent}</td>
                <td className="p-3 text-sm text-foreground">{bet.softpriced}</td>
                <td className="p-3 text-sm text-foreground">{bet.deposits}</td>
                <td className="p-3 text-xs text-muted-foreground">{bet.time}</td>
                <td className="p-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-secondary/50 rounded">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDelete(bet.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-border">
        <Button variant="outline" className="w-full sm:w-auto">
          All Live Bets
        </Button>
      </div>
    </div>
  );
};

export default LiveBetsTable;
