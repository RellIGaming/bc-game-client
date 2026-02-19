import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface VaultTransferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const currencies = [
  { id: "inr", name: "INR", icon: "🇮🇳", balance: 0 },
  { id: "bcd", name: "BCD", icon: "🟣", balance: 0 },
  { id: "bc", name: "BC", icon: "🟡", balance: 0 },
  { id: "usdt", name: "USDT", icon: "🟢", balance: 0 },
  { id: "eth", name: "ETH", icon: "🔵", balance: 0 },
  { id: "btc", name: "BTC", icon: "🟠", balance: 0 },
];

export function VaultTransferModal({ open, onOpenChange }: VaultTransferModalProps) {
  const isMobile = useIsMobile();
  const [amount, setAmount] = useState("0");
  const [selected, setSelected] = useState(currencies[1]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = currencies.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const content = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <button onClick={() => onOpenChange(false)}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-bold text-lg flex-1 text-center pr-5">Transfer In</h2>
      </div>

      <div className="p-6 space-y-5">
        {/* Amount */}
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Amount</label>
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center bg-secondary rounded-lg">
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border-0 bg-transparent text-lg font-bold flex-1"
                type="number"
              />
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium"
              >
                <span>{selected.icon}</span>
                <span>{selected.name}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {showDropdown && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-card border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                <div className="p-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search"
                      className="pl-9 h-9 text-sm"
                    />
                  </div>
                </div>
                {filtered.map(c => (
                  <button
                    key={c.id}
                    onClick={() => { setSelected(c); setShowDropdown(false); }}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span>{c.icon}</span>
                      <span className="font-medium">{c.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{c.balance.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">{c.balance.toFixed(2)}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Available */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Available</span>
          <span className="font-medium">0</span>
        </div>

        {/* Daily Return */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Daily real-time return:</span>
          <span className="font-medium">0</span>
        </div>

        <Button className="w-full bg-primary text-primary-foreground">
          Transfer to Vault Pro
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="p-0 w-full sm:max-w-md [&>button]:hidden">
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 [&>button]:hidden">
        {content}
      </DialogContent>
    </Dialog>
  );
}
