import { useState } from "react";
import { ChevronDown, Search, ArrowDownUp, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Currency {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
  subBalance?: string;
  category: "cash" | "crypto";
}

const currencies: Currency[] = [
  { symbol: "₹", name: "INR", icon: "🟠", balance: "₹0.00", category: "cash" },
  { symbol: "BC", name: "BC", icon: "🟢", balance: "₹0.00", subBalance: "0", category: "crypto" },
  { symbol: "USDT", name: "USDT", icon: "🟢", balance: "₹0.00", subBalance: "0", category: "crypto" },
  { symbol: "ETH", name: "ETH", icon: "🔵", balance: "₹0.00", subBalance: "0", category: "crypto" },
  { symbol: "BTC", name: "BTC", icon: "🟠", balance: "₹0.00", subBalance: "0", category: "crypto" },
  { symbol: "TRX", name: "TRX", icon: "🔴", balance: "₹0.00", subBalance: "0", category: "crypto" },
];

interface DepositDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: () => void;
}

const DepositDropdown = ({ isOpen, onClose, onDeposit }: DepositDropdownProps) => {
  const [search, setSearch] = useState("");
  const [viewInCurrency, setViewInCurrency] = useState(false);
  const [hideSmall, setHideSmall] = useState(false);

  const filteredCurrencies = currencies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const cashCurrencies = filteredCurrencies.filter(c => c.category === "cash");
  const cryptoCurrencies = filteredCurrencies.filter(c => c.category === "crypto");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Search */}
            <div className="p-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
                  />
                </div>
                <button className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                  <ArrowDownUp className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Currency List */}
            <div className="max-h-80 overflow-y-auto scrollbar-hide">
              {/* Cash Section */}
              {cashCurrencies.length > 0 && (
                <div className="px-3 py-2">
                  <span className="text-xs text-muted-foreground font-medium">Cash</span>
                  {cashCurrencies.map((currency) => (
                    <div
                      key={currency.name}
                      className="flex items-center justify-between py-3 hover:bg-secondary/50 rounded-lg px-2 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{currency.icon}</span>
                        <span className="text-foreground font-medium">{currency.name}</span>
                      </div>
                      <span className="text-foreground">{currency.balance}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Cryptocurrency Section */}
              {cryptoCurrencies.length > 0 && (
                <div className="px-3 py-2">
                  <span className="text-xs text-muted-foreground font-medium">Cryptocurrency</span>
                  {cryptoCurrencies.map((currency) => (
                    <div
                      key={currency.name}
                      className={`flex items-center justify-between py-3 hover:bg-secondary/50 rounded-lg px-2 cursor-pointer transition-colors ${
                        currency.name === "BC" ? "bg-secondary/80" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{currency.icon}</span>
                        <span className="text-foreground font-medium">{currency.name}</span>
                        {currency.name === "BC" && (
                          <Info className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-foreground">{currency.balance}</div>
                        {currency.subBalance && (
                          <div className="text-xs text-muted-foreground">{currency.subBalance}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Options */}
            <div className="p-3 border-t border-border flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={viewInCurrency}
                  onChange={(e) => setViewInCurrency(e.target.checked)}
                  className="rounded border-border"
                />
                <span className="text-sm text-muted-foreground">View in currency</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm text-muted-foreground">Hide Small</span>
                <div
                  className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${
                    hideSmall ? "bg-primary" : "bg-secondary"
                  }`}
                  onClick={() => setHideSmall(!hideSmall)}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform ${
                      hideSmall ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </div>
              </label>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DepositDropdown;
