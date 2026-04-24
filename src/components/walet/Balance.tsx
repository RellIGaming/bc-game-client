import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useWalletStore } from "@/store/walletStore";

/* ---------------- ALL CURRENCIES ---------------- */
const iconMap: Record<string, string> = {
  INR: "🟢",
  BDT: "🟣",
  USD: "🔵",
  PKR: "🟡",
  ETH: "🔵",
  TRX: "🔴",
  BNB: "🟡",
  LTC: "⚪",
  XRP: "⚪",
  USDC: "🔵",
  DOGE: "🟡",
  SOL: "🟣",
  BC: "🟡"
};

const Balance = () => {
  const { wallets, fetchBalance } = useWalletStore();
  const navigate = useNavigate();

  const [hideZeroBalance, setHideZeroBalance] = useState(false);
  const [balanceSearch, setBalanceSearch] = useState("");
  console.log("wallets", wallets);
  useEffect(() => {
    fetchBalance(); // 🔥 IMPORTANT

    const interval = setInterval(() => {
      fetchBalance();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* ---------------- MERGE API + STATIC ---------------- */
  const mergedBalances = wallets.map((w: any) => ({
    id: w.id,
    name: w.name,
    icon: iconMap[w.name] || w.icon,
    type: w.type,
    balance: Number(w.balance || 0),
    bonus: Number(w.bonus || 0),
    isLocked: w.isLocked
  }));

  /* ---------------- FILTER ---------------- */
  const filteredBalances = useMemo(() => {
    return mergedBalances.filter((b) => {
      if (hideZeroBalance && b.balance === 0) return false;
      if (
        balanceSearch &&
        !b.name.toLowerCase().includes(balanceSearch.toLowerCase())
      )
        return false;
      return true;
    });
  }, [mergedBalances, hideZeroBalance, balanceSearch]);

  /* ---------------- SUMMARY ---------------- */
  const totalBalance = useMemo(
    () => mergedBalances.reduce((sum, w) => sum + w.balance, 0),
    [mergedBalances]
  );

  const bonusBalance = useMemo(
    () => mergedBalances.reduce((sum, w) => sum + w.bonus, 0),
    [mergedBalances]
  );

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-6 bg-card rounded-lg p-4">

      {/* ===== SUMMARY ===== */}
      <div className="flex gap-4 bg-secondary rounded-lg">
        <div className="p-4 flex-1">
          <p className="text-sm text-muted-foreground">Total Balance</p>
          <p className="text-xl font-bold text-primary">
            ৳ {totalBalance.toFixed(2)}
          </p>
        </div>

        <div className="p-4 flex-1">
          <p className="text-sm text-muted-foreground">Deposit Balance</p>
          <p className="text-xl font-bold text-primary">
            ৳ {totalBalance.toFixed(2)}
          </p>
        </div>

        <div className="p-4 flex-1">
          <p className="text-sm text-muted-foreground">Bonus Balance</p>
          <p className="text-xl font-bold text-primary">
            ৳ {bonusBalance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* ===== FILTER ===== */}
      <div className="flex flex-wrap justify-between gap-4">
        <button
          onClick={() => setHideZeroBalance(!hideZeroBalance)}
          className={cn(
            "px-3 py-1 rounded",
            hideZeroBalance ? "bg-primary text-white" : "bg-muted"
          )}
        >
          Hide 0 balance
        </button>

        <div className="relative">
          <Search className="absolute left-2 top-2 w-4 h-4" />
          <Input
            className="pl-8"
            placeholder="Search"
            value={balanceSearch}
            onChange={(e) => setBalanceSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ===== CASH ===== */}
      <div>
        <h3 className="font-semibold mb-2">Cash</h3>

        {filteredBalances
          .filter((b) => b.type === "cash")
          .map((b) => (
            <div key={b.id} className="bg-secondary p-4 rounded mb-2">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <span>{b.icon}</span>
                  <span>{b.name}</span>
                </div>

                <div className="flex gap-2 items-center">
                  <span>₹{b.balance.toFixed(2)}</span>

                  <Button
                    size="sm"
                    onClick={() => navigate("/wallet/deposit")}
                  >
                    Deposit
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => navigate("/wallet/withdraw")}
                  >
                    Withdraw
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* ===== CRYPTO ===== */}
      <div>
        <h3 className="font-semibold mb-2">Crypto</h3>

        {filteredBalances
          .filter((b) => b.type === "crypto")
          .map((b) => (
            <div key={b.id} className="bg-secondary p-4 rounded mb-2">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <span>{b.icon}</span>
                  <span>{b.name}</span>
                  {b.isLocked && <span>🔒</span>}
                </div>

                <div className="flex gap-2 items-center">
                  <span>₹{b.balance.toFixed(2)}</span>

                  <Button
                    size="sm"
                    onClick={() => navigate("/wallet/deposit")}
                  >
                    Deposit
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => navigate("/wallet/withdraw")}
                  >
                    Withdraw
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Balance;