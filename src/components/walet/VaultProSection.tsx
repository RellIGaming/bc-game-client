import { useEffect, useState } from "react";
import { ChevronRight, ChevronDown, Search, Info, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import {useWalletStore} from "@/store/walletStore";
import { useNavigate } from "react-router-dom";
const cryptoCurrencies = [
    { id: "bc", name: "BC", icon: "🟡", balance: 0 },
    { id: "usdt", name: "USDT", icon: "🟢", balance: 0 },
    { id: "eth", name: "ETH", icon: "🔵", balance: 0 },
    { id: "btc", name: "BTC", icon: "🟠", balance: 0 },
];
const fiatCurrencies = [
    { code: "INR", symbol: "₹" },
    { code: "BDT", symbol: "৳" },
    { code: "PKR", symbol: "₨" },
    { code: "USD", symbol: "$" },
];
const faqs = [
    {
        id: 1,
        question: "How is the deposit and withdrawal of funds in Vault Pro protected?",
        answer: "Your funds in Vault Pro are protected by industry-standard security measures including multi-signature wallets and cold storage."
    },
    {
        id: 2,
        question: "When is the daily interest calculated, and how is it determined?",
        answer: "Daily interest is calculated at 00:00 UTC based on your average balance throughout the day. The APR rate is dynamic and depends on market conditions."
    },
    {
        id: 3,
        question: "Can I trust that my funds in Vault Pro are safe?",
        answer: "Yes, we employ bank-level security protocols and regular third-party audits to ensure the safety of your funds."
    },
];
const VaultProSection = () => {
    const [activeTab, setActiveTab] = useState<"in" | "out">("in");
    const [amount, setAmount] = useState("");
    const [selectedCrypto, setSelectedCrypto] = useState(cryptoCurrencies[0]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    const [showInterestModal, setShowInterestModal] = useState(false);
    const [filter, setFilter] = useState("today");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const {
        balances,
        fetchSwapBalances,
        vaults,
        fetchVault,
        vaultDeposit,
        vaultWithdraw,
        interestHistory,
        fetchInterestHistory,
        loading
    } = useWalletStore();

    useEffect(() => {
        fetchSwapBalances();
        fetchVault();
    }, []);
    useEffect(() => {
    if (!showInterestModal) return;

    fetchInterestHistory(filter);

}, [filter, showInterestModal]);
    const filteredCrypto = cryptoCurrencies.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );
    const totalVaultValue = vaults.reduce((sum, v) => sum + v.balance, 0);
    const selectedVaultBalance =
        vaults.find(v => v.currency === selectedCrypto.name)?.balance || 0;


    return (
        <div className="space-y-6">
            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left - Stats */}
                <div className="bg-secondary rounded-lg p-4">
                    <div className="flex items-center justify-end gap-2 mb-6">
                        <button onClick={() => setShowInterestModal(true)} className="flex items-center gap-1 px-3 py-1 bg-card rounded-lg text-xs">
                            <Info className="w-4 h-4" />
                            Interests
                        </button>
                        <button onClick={() => navigate('/wallet/transaction')} className="flex items-center gap-1 px-3 py-1 bg-card rounded-lg text-xs">
                            <Clock className="w-4 h-4" />
                            History
                        </button>
                        <button className="p-1 bg-card rounded-lg">
                            <Info className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-muted-foreground text-sm mb-2">Total Value</h3>
                        <p className="text-lg font-bold">₹{totalVaultValue.toFixed(2)}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-muted-foreground text-sm mb-1">Last Day Return</h4>
                            <p className="text-xl font-semibold">₹0.00</p>
                        </div>
                        <div>
                            <h4 className="text-muted-foreground text-sm mb-1">Total Return</h4>
                            <p className="text-xl font-semibold">₹0.00</p>
                        </div>
                    </div>
                </div>
                {/* Right - Transfer */}
                <div className="bg-secondary rounded-lg p-4">
                    {/* Tabs */}
                    <div className="flex rounded-lg overflow-hidden mb-2 bg-card p-1">
                        <button
                            onClick={() => setActiveTab("in")}
                            className={cn(
                                "flex-1 py-2 text-xs font-medium transition-colors",
                                activeTab === "in"
                                    ? "bg-secondary text-foreground"
                                    : "bg-card text-muted-foreground"
                            )}
                        >
                            Transfer In
                        </button>
                        <button
                            onClick={() => setActiveTab("out")}
                            className={cn(
                                "flex-1 py-2 text-xs font-medium transition-colors",
                                activeTab === "out"
                                    ? "bg-secondary text-foreground"
                                    : "bg-card text-muted-foreground"
                            )}
                        >
                            Transfer Out
                        </button>
                    </div>
                    {/* Amount Input */}
                    <div className="mb-4">
                        <label className="text-sm text-muted-foreground mb-2 block">
                            Amount
                        </label>

                        {/* MAIN ROW */}
                        <div className="flex gap-2 w-full bg-card rounded-lg">

                            {/* INPUT */}
                            <input
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                className="flex-1 min-w-0 px-4 py-2 bg-card rounded-lg text-xs font-semibold outline-none"
                            />

                            {/* DROPDOWN WRAPPER */}
                            <div className="relative shrink-0">

                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg whitespace-nowrap"
                                >
                                    <span>{selectedCrypto.icon}</span>
                                    <span className="font-medium text-xs">{selectedCrypto.name}</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>

                                {/* DROPDOWN */}
                                {showDropdown && (
                                    <div className="absolute right-0 top-full mt-2 w-full min-w-[180px] bg-card border border-border rounded-xl shadow-xl z-20">

                                        {/* SEARCH */}
                                        <div className="p-2">
                                            <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
                                                <Search className="w-4 h-4 text-muted-foreground" />
                                                <input
                                                    type="text"
                                                    placeholder="Search"
                                                    value={search}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                    className="flex-1 bg-transparent outline-none text-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* LIST */}
                                        <div className="max-h-40 overflow-y-auto">
                                            {filteredCrypto.map((currency) => (
                                                <button
                                                    key={currency.id}
                                                    onClick={() => {
                                                        setSelectedCrypto(currency);
                                                        setShowDropdown(false);
                                                    }}
                                                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-secondary/50"
                                                >
                                                    <span>{currency.icon}</span>
                                                    <span>{currency.name}</span>
                                                </button>
                                            ))}
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                        Available: <span className="text-primary">{balances.find(b => b.currency.toUpperCase() === selectedCrypto.name)?.balance || 0}</span>
                    </p>
                    <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-muted-foreground text-xs">Daily real-time return</span>
                        <div>
                            <span>0BC</span>
                            <span className="text-primary ml-2">APR 10%</span>
                        </div>
                    </div>
                    <button onClick={async () => {
                        if (!amount) return;

                        if (activeTab === "in") {
                            await vaultDeposit({
                                currency: selectedCrypto.name,
                                amount: Number(amount)
                            });
                        } else {
                            await vaultWithdraw({
                                currency: selectedCrypto.name,
                                amount: Number(amount)
                            });
                        }

                        setAmount("");
                    }} className="w-full text-xs py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                        {activeTab === "in" ? "Transfer to Vault Pro" : "Withdraw to Vault"}
                    </button>
                </div>
            </div>
            {/* No Asset Section */}
            <div className="bg-secondary rounded-lg p-8 text-center">
                <Info className="w-8 mx-auto ">🪙</Info>
                <h3 className="text-lg font-semibold mb-2">No Asset yet</h3>
                <p className="text-muted-foreground">Start earning by transferring assets to Vault Pro</p>
            </div>
            {/* FAQ Section */}
            <div className="bg-secondary rounded-lg p-4">
                <h3 className="text-sm font-semibold mb-2">Frequently Asked Questions</h3>
                <div className="space-y-2">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="border-b border-border last:border-0">
                            <button
                                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                                className="w-full flex items-center justify-between py-2 text-left text-xs"
                            >
                                <span className="font-medium">{faq.question}</span>
                                <div className="p-2 bg-secondary rounded-full">
                                    <ChevronRight
                                        className={cn(
                                            "w-4 h-4 transition-transform",
                                            expandedFaq === faq.id && "rotate-90"
                                        )}
                                    />
                                </div>
                            </button>
                            {expandedFaq === faq.id && (
                                <div className="pb-2 text-muted-foreground text-xs">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {showInterestModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

                    <div className="bg-secondary w-full max-w-md rounded-xl p-4">

                        {/* HEADER */}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-semibold">Interest History</h2>
                            <button
                                onClick={() => setShowInterestModal(false)}
                                className="text-xs text-muted-foreground"
                            >
                                Close
                            </button>
                        </div>

                        {/* FILTERS */}
                        <div className="flex gap-2 mb-4">
                            {["today", "yesterday", "last7"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-3 py-1 rounded-lg text-xs ${filter === f
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-card text-muted-foreground"
                                        }`}
                                >
                                    {f === "today"
                                        ? "Today"
                                        : f === "yesterday"
                                            ? "Yesterday"
                                            : "Last 7 Days"}
                                </button>
                            ))}
                        </div>

                        {/* CONTENT */}
                        <div className="max-h-64 overflow-y-auto space-y-2">

                            {loading ? (
                                <p className="text-center text-xs text-muted-foreground">
                                    Loading...
                                </p>
                            ) : interestHistory.length === 0 ? (
                                <p className="text-center text-xs text-muted-foreground">
                                    No interest yet
                                </p>
                            ) : (
                                interestHistory.map((tx: any) => (
                                    <div
                                        key={tx.id}
                                        className="flex items-center justify-between bg-card px-3 py-2 rounded-lg"
                                    >
                                        <div>
                                            <p className="text-xs font-medium">
                                                {tx.currency}
                                            </p>
                                            <p className="text-[10px] text-muted-foreground">
                                                {new Date(tx.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-green-500">
                                                +{Number(tx.amount).toFixed(4)}
                                            </p>
                                            <p className="text-[10px] text-muted-foreground">
                                                Interest
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default VaultProSection;