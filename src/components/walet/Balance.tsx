import React, { useState } from 'react';
import {
    Wallet,
    ArrowDownToLine,
    ArrowUpFromLine,
    CreditCard,
    ArrowLeftRight,
    Vault,
    Receipt,
    RotateCcw,
    Clock,
    Search,
    Copy,
    AlertTriangle,
    Info,
    Gift,
    ChevronDown,
    Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
// All balances for Balance page
const allBalances = [
    { id: "inr", name: "INR", icon: "🇮🇳", balance: 0, type: "cash" },
    { id: "bcd", name: "BCD", icon: "🟣", balance: 0, type: "crypto", isLocked: true },
    { id: "bc", name: "BC", icon: "🟡", balance: 0, type: "crypto", isLocked: true },
    { id: "usdt", name: "USDT", icon: "🟢", balance: 0, type: "crypto" },
    { id: "eth", name: "ETH", icon: "🔵", balance: 0, type: "crypto" },
    { id: "btc", name: "BTC", icon: "🟠", balance: 0, type: "crypto" },
    { id: "trx", name: "TRX", icon: "🔴", balance: 0, type: "crypto" },
    { id: "bnb", name: "BNB", icon: "🟡", balance: 0, type: "crypto" },
    { id: "ltc", name: "LTC", icon: "⚪", balance: 0, type: "crypto" },
    { id: "xrp", name: "XRP", icon: "⚪", balance: 0, type: "crypto" },
    { id: "usdc", name: "USDC", icon: "🔵", balance: 0, type: "crypto" },
    { id: "doge", name: "DOGE", icon: "🟡", balance: 0, type: "crypto" },
    { id: "sol", name: "SOL", icon: "🟣", balance: 0, type: "crypto" },
];
const Balance = () => {
    const [hideZeroBalance, setHideZeroBalance] = useState(false);
    const [balanceSearch, setBalanceSearch] = useState("");
    const filteredBalances = allBalances.filter(b => {
        if (hideZeroBalance && b.balance === 0) return false;
        if (balanceSearch && !b.name.toLowerCase().includes(balanceSearch.toLowerCase())) return false;
        return true;
    });
    return (
        <div className="space-y-6 bg-card ">
            {/* Balance Summary */}
            <div className="flex flex-row gap-4 bg-secondary rounded-lg">

                {/* Total Balance */}
                <div className="relative p-4">
                    <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
                    <p className="text-xl font-bold text-primary">₹0.00</p>

                    {/* 50% right border */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1/2 w-px bg-white/10" />
                </div>

                {/* Deposit Balance */}
                <div className="relative p-4">
                    <p className="text-sm text-muted-foreground mb-1">Deposit Balance</p>
                    <p className="text-xl font-bold text-primary">₹0.00</p>

                    {/* 50% right border */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1/2 w-px bg-white/10" />
                </div>

                {/* Bonus Balance */}
                <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Bonus Balance</p>
                    <p className="text-xl font-bold text-primary">₹0.00</p>
                </div>

            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <button
                        onClick={() => setHideZeroBalance(!hideZeroBalance)}
                        className={cn(
                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                            hideZeroBalance ? "bg-primary" : "bg-muted"
                        )}
                    >
                        <span
                            className={cn(
                                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                hideZeroBalance ? "translate-x-6" : "translate-x-1"
                            )}
                        />
                    </button>
                    <span className="text-sm">Hide 0 balance</span>
                </label>
                <div className="relative rounded-lg">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search"
                        value={balanceSearch}
                        onChange={(e) => setBalanceSearch(e.target.value)}
                        className="pl-10 bg-secondary border-border w-full sm:w-60"
                    />
                </div>
            </div>
            {/* Cash Section */}
            <div>
                <h3 className="text-lg font-semibold mb-3">Cash</h3>
                {filteredBalances.filter(b => b.type === "cash").map((balance) => (
                    <div key={balance.id} className="bg-secondary rounded-lg p-4 mb-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{balance.icon}</span>
                                <span className="font-medium">{balance.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-semibold">₹{balance.balance.toFixed(2)}</span>
                                <Button size="sm" variant="outline">Deposit</Button>
                                <Button size="sm" variant="outline">Withdraw</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Crypto Section */}
            <div>
                <h3 className="text-lg font-semibold mb-3">Crypto currency</h3>
                <div className="">
                    {filteredBalances.filter(b => b.type === "crypto").map((balance) => (
                        <div key={balance.id} className="bg-secondary rounded-lg p-4 border-b border-white/10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{balance.icon}</span>
                                    <span className="font-medium">{balance.name}</span>
                                    {balance.isLocked && <span>🔒</span>}
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold">₹{balance.balance.toFixed(2)}</span>
                                    <Button size="sm" variant="outline">Deposit</Button>
                                    <Button size="sm" variant="outline">Withdraw</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Balance;