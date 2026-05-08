import { useEffect, useState } from "react";
import { ChevronDown, Search, ArrowDownUp, Info, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useWalletStore } from "@/store/walletStore";

interface Currency {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
  subBalance?: string;
  category: "cash" | "crypto";
}
const currencyIcons: Record<string, string> = {
  INR: "🟠",
  BDT: "🟢",
  USD: "💵",
  PKR: "🟢",
  BTC: "🟠",
  ETH: "🔵",
  USDT: "🟢",
  TRX: "🔴",
  BC: "🟢",
};

const cryptoCurrenciesList = [
  "BTC",
  "ETH",
  "USDT",
  "TRX",
  "BC",
];
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
  const {
    wallets,
    fetchBalance
  } = useWalletStore();

  const [search, setSearch] = useState("");
  const [viewInCurrency, setViewInCurrency] = useState(false);
  const [hideSmall, setHideSmall] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const formattedCurrencies = (wallets || []).map((wallet: any) => ({
    symbol: wallet.currency || "",
    name: wallet.currency || "",
    icon: currencyIcons[wallet.currency] || "💰",

    depositBalance: Number(wallet.balance || 0),
    bonusBalance: Number(wallet.bonus || 0),

    balance: `₹${Number(wallet.balance || 0).toFixed(2)}`,
    bonus: `₹${Number(wallet.bonus || 0).toFixed(2)}`,

    category: cryptoCurrenciesList.includes(wallet.currency)
      ? "crypto"
      : "cash",
  }));

  const filteredCurrencies = formattedCurrencies.filter((c: any) =>
    (c.name || "").toLowerCase().includes(search.toLowerCase())
  );
  const [depositTab, setDepositTab] = useState<"deposit" | "bonus">("deposit");
  const activeCurrencies =
    depositTab === "deposit"
      ? filteredCurrencies.filter((c: any) => c.depositBalance > 0)
      : filteredCurrencies.filter((c: any) => c.bonusBalance > 0);

  const cashCurrencies = activeCurrencies.filter(
    (c: any) => c.category === "cash"
  );

  const cryptoCurrencies = activeCurrencies.filter(
    (c: any) => c.category === "crypto"
  );

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="
    fixed inset-x-0 bottom-0 z-50
    h-[70vh]
    bg-card border-t border-border
    rounded-t-lg
    shadow-2xl
    overflow-hidden

    lg:absolute lg:top-full lg:right-0 lg:bottom-auto
    lg:h-auto lg:w-80
    lg:mt-2
    lg:rounded-lg
    lg:border
  "
          >
            <div
              onClick={onClose}
              className="lg:hidden flex justify-center pt-2 pb-1 cursor-pointer"
            >
              <div className="w-10 h-1.5 rounded-full bg-muted-foreground/40" />
            </div>
            <div className="flex rounded-lg bg-secondary border border-border overflow-hidden p-1">
              <button
                onClick={() => setDepositTab("deposit")}
                className={cn(
                  "flex-1 py-1 text-sm font-medium transition-colors rounded-lg",
                  depositTab === "deposit" ? "bg-primary text-foreground" : "bg-card text-muted-foreground"
                )}
              >
                Deposit Balance
              </button>
              <button
                onClick={() => setDepositTab("bonus")}
                className={cn(
                  "flex-1 py-1 text-sm font-medium transition-colors rounded-lg",
                  depositTab === "bonus" ? "bg-primary text-foreground" : "bg-card text-muted-foreground"
                )}
              >
                Bonus Balance
              </button>
            </div>
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
                  <Plus className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
            {depositTab === "deposit" ? (
              <div className="max-h-80 overflow-y-auto scrollbar-hide">
                {cashCurrencies.length > 0 && (
                  <div className="px-3 py-2">
                    <span className="text-xs text-muted-foreground font-medium">
                      Cash
                    </span>

                    {cashCurrencies.map((currency) => (
                      <div
                        key={currency.name}
                        className="flex items-center justify-between py-3 hover:bg-secondary/50 rounded-lg px-2 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{currency.icon}</span>

                          <span className="text-foreground font-medium">
                            {currency.name}
                          </span>
                        </div>

                        <span className="text-foreground">
                          {currency.balance}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {cryptoCurrencies.length > 0 && (
                  <div className="px-3 py-2">
                    <span className="text-xs text-muted-foreground font-medium">
                      Cryptocurrency
                    </span>

                    {cryptoCurrencies.map((currency) => (
                      <div
                        key={currency.name}
                        className={`flex items-center justify-between py-3 hover:bg-secondary/50 rounded-lg px-2 cursor-pointer transition-colors ${currency.name === "BC" ? "bg-secondary/80" : ""
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{currency.icon}</span>

                          <span className="text-foreground font-medium">
                            {currency.name}
                          </span>

                          {currency.name === "BC" && (
                            <Info className="w-4 h-4 text-primary" />
                          )}
                        </div>

                        <div className="text-right">
                          <div className="text-foreground">
                            ₹{Number(currency.bonusBalance || 0).toFixed(2)}
                          </div>

                          <div className="text-xs text-primary">
                            Bonus Available
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {cashCurrencies.length === 0 &&
                  cryptoCurrencies.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <div className="text-4xl mb-2">💰</div>

                      <p className="text-sm font-medium text-foreground">
                        No Deposit Balance
                      </p>

                      <p className="text-xs text-muted-foreground mt-1">
                        Your wallets are empty.
                      </p>
                    </div>
                  )}
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto scrollbar-hide">
                {/* CASH BONUS */}
                {cashCurrencies.some(
                  (c) => Number(c.bonusBalance || 0) > 0
                ) && (
                    <div className="px-3 py-2">
                      <span className="text-xs text-muted-foreground font-medium">
                        Cash
                      </span>

                      {cashCurrencies
                        .filter((c) => Number(c.bonusBalance || 0) > 0)
                        .map((currency) => (
                          <div
                            key={currency.name}
                            className="flex items-center justify-between py-3 hover:bg-secondary/50 rounded-lg px-2 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{currency.icon}</span>

                              <span className="text-foreground font-medium">
                                {currency.name}
                              </span>
                            </div>

                            <div className="text-right">
                              <div className="text-foreground">
                                ₹{Number(currency.bonusBalance).toFixed(2)}
                              </div>

                              <div className="text-xs text-primary">
                                Bonus Available
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                {/* CRYPTO BONUS */}
                {cryptoCurrencies.some(
                  (c) => Number(c.bonusBalance || 0) > 0
                ) && (
                    <div className="px-3 py-2">
                      <span className="text-xs text-muted-foreground font-medium">
                        Cryptocurrency
                      </span>

                      {cryptoCurrencies
                        .filter((c) => Number(c.bonusBalance || 0) > 0)
                        .map((currency) => (
                          <div
                            key={currency.name}
                            className={`flex items-center justify-between py-3 hover:bg-secondary/50 rounded-lg px-2 cursor-pointer transition-colors ${currency.name === "BC" ? "bg-secondary/80" : ""
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{currency.icon}</span>

                              <span className="text-foreground font-medium">
                                {currency.name}
                              </span>

                              {currency.name === "BC" && (
                                <Info className="w-4 h-4 text-primary" />
                              )}
                            </div>

                            <div className="text-right">
                              <div className="text-foreground">
                                ₹{Number(currency.bonusBalance).toFixed(2)}
                              </div>

                              <div className="text-xs text-primary">
                                Bonus Available
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                {/* EMPTY BONUS */}
                {!cashCurrencies.some(
                  (c) => Number(c.bonusBalance || 0) > 0
                ) &&
                  !cryptoCurrencies.some(
                    (c) => Number(c.bonusBalance || 0) > 0
                  ) && (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <div className="text-4xl mb-2">🎁</div>

                      <p className="text-sm font-medium text-foreground">
                        No Bonus Balance
                      </p>

                      <p className="text-xs text-muted-foreground mt-1">
                        You don't have any active bonus yet.
                      </p>
                    </div>
                  )}
              </div>
            )}
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
                  className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${hideSmall ? "bg-primary" : "bg-secondary"
                    }`}
                  onClick={() => setHideSmall(!hideSmall)}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform ${hideSmall ? "translate-x-5" : "translate-x-0.5"
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
