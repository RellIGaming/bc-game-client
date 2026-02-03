import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import { cn } from "@/lib/utils";
const billTypes = ["Bill", "Deposit", "Withdraw", "Swap", "Transfer"];
const assetTypes = ["All Assets", "BTC", "ETH", "USDT", "BC", "SOL"];
const timeFilters = ["Past 24 hours", "Past 7 days", "Past 30 days", "Past 90 days"];
const typeFilters = ["All Type", "Credit", "Debit", "Pending"];

const Rollover = () => {
    const [billType, setBillType] = useState("Bill");
    const [assetType, setAssetType] = useState("All Assets");
    const [timeFilter, setTimeFilter] = useState("Past 24 hours");
    const [transactionType, setTransactionType] = useState("All Type");
    const [showBillDropdown, setShowBillDropdown] = useState(false);
    const [showAssetDropdown, setShowAssetDropdown] = useState(false);
    const [showTimeDropdown, setShowTimeDropdown] = useState(false);
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const closeAllDropdowns = () => {
        setShowBillDropdown(false);
        setShowAssetDropdown(false);
        setShowTimeDropdown(false);
        setShowTypeDropdown(false);
    };

    return (
        <div className="space-y-4">
            {/* Filters Row */}
            <div className="flex flex-wrap gap-3">
                {/* Bill Type Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => {
                            closeAllDropdowns();
                            setShowBillDropdown(!showBillDropdown);
                        }}
                        className="flex items-center justify-between gap-8 px-4 py-3 bg-secondary rounded-lg min-w-[140px]"
                    >
                        <span>{billType}</span>
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    {showBillDropdown && (
                        <div className="absolute left-0 top-full mt-2 w-full bg-card border border-border rounded-lg shadow-xl z-20">
                            {billTypes.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        setBillType(item);
                                        setShowBillDropdown(false);
                                    }}
                                    className={cn(
                                        "w-full px-4 py-2 text-left hover:bg-secondary/50",
                                        billType === item && "bg-secondary"
                                    )}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                {/* Asset Type Dropdown */}
                <div className="relative flex-1 min-w-[200px]">
                    <button
                        onClick={() => {
                            closeAllDropdowns();
                            setShowAssetDropdown(!showAssetDropdown);
                        }}
                        className="flex items-center justify-between w-full px-4 py-3 bg-secondary rounded-lg"
                    >
                        <span>{assetType}</span>
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    {showAssetDropdown && (
                        <div className="absolute left-0 top-full mt-2 w-full bg-card border border-border rounded-lg shadow-xl z-20">
                            {assetTypes.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        setAssetType(item);
                                        setShowAssetDropdown(false);
                                    }}
                                    className={cn(
                                        "w-full px-4 py-2 text-left hover:bg-secondary/50",
                                        assetType === item && "bg-secondary"
                                    )}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                {/* Time Filter Dropdown */}
                <div className="relative min-w-[160px]">
                    <button
                        onClick={() => {
                            closeAllDropdowns();
                            setShowTimeDropdown(!showTimeDropdown);
                        }}
                        className="flex items-center justify-between w-full px-4 py-3 bg-secondary rounded-lg"
                    >
                        <span>{timeFilter}</span>
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    {showTimeDropdown && (
                        <div className="absolute left-0 top-full mt-2 w-full bg-card border border-border rounded-lg shadow-xl z-20">
                            {timeFilters.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        setTimeFilter(item);
                                        setShowTimeDropdown(false);
                                    }}
                                    className={cn(
                                        "w-full px-4 py-2 text-left hover:bg-secondary/50 whitespace-nowrap",
                                        timeFilter === item && "bg-secondary"
                                    )}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* Second Row - Type Filter */}
            <div className="flex items-center gap-3">
                <div className="relative min-w-[140px]">
                    <button
                        onClick={() => {
                            closeAllDropdowns();
                            setShowTypeDropdown(!showTypeDropdown);
                        }}
                        className="flex items-center justify-between w-full px-4 py-3 bg-secondary rounded-lg"
                    >
                        <span>{transactionType}</span>
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    {showTypeDropdown && (
                        <div className="absolute left-0 top-full mt-2 w-full bg-card border border-border rounded-lg shadow-xl z-20">
                            {typeFilters.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        setTransactionType(item);
                                        setShowTypeDropdown(false);
                                    }}
                                    className={cn(
                                        "w-full px-4 py-2 text-left hover:bg-secondary/50",
                                        transactionType === item && "bg-secondary"
                                    )}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <button className="flex items-center gap-2 text-primary text-sm hover:underline">
                    <Info className="w-4 h-4" />
                    Fiat deposit issues or disputes
                </button>
            </div>
            {/* Table Header */}
            <div className="bg-secondary rounded-lg">
                <div className="grid grid-cols-4 gap-4 px-4 py-3 text-sm font-medium text-muted-foreground">
                    <span>Type</span>
                    <span>Time</span>
                    <span className="text-right">Amount</span>
                    <span className="text-right">Balance</span>
                </div>
            </div>
            {/* Empty State */}
            <div className="bg-card rounded-xl p-12 text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                    <svg
                        viewBox="0 0 100 100"
                        className="w-24 h-24 text-muted-foreground"
                    >
                        <circle cx="50" cy="35" r="20" fill="currentColor" opacity="0.3" />
                        <ellipse cx="50" cy="70" rx="30" ry="15" fill="currentColor" opacity="0.2" />
                        <circle cx="45" cy="30" r="3" fill="currentColor" />
                        <circle cx="55" cy="30" r="3" fill="currentColor" />
                    </svg>
                </div>
                <p className="text-muted-foreground text-lg">Stay tuned—something's coming!</p>
            </div>
        </div>
    );
};

export default Rollover;