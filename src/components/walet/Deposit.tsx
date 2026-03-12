import React, { useMemo, useState } from 'react';
import {
    Copy,
    AlertTriangle,
    Info,
    Gift,
    ChevronDown,
    ChevronRight,
    Wallet,
    Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import qrCode from "../../assets/images/qr-code.png";
import CWalletModal from "./CWalletModal";
import { allBalances } from './Withdraw';
// Crypto currencies
const cryptoCurrencies = [
    { id: "eth", name: "ETH", icon: "🔵", network: "Ethereum" },
    { id: "btc", name: "BTC", icon: "🟠", network: "Bitcoin" },
    { id: "usdt", name: "USDT", icon: "🟢", network: "Tether" },
    { id: "usdc", name: "USDC", icon: "🔵", network: "USD Coin" },
    { id: "doge", name: "DOGE", icon: "🟡", network: "Dogecoin" },
    { id: "sol", name: "SOL", icon: "🟣", network: "Solana" },
    { id: "trx", name: "TRX", icon: "🔴", network: "Tron" },
    { id: "bnb", name: "BNB", icon: "🟡", network: "BNB Chain" },
    { id: "xrp", name: "XRP", icon: "⚪", network: "Ripple" },
];
// Networks for deposit
const networks = [
    { id: "solana", name: "Solana" },
    { id: "ethereum", name: "Ethereum" },
    { id: "bsc", name: "BSC" },
    { id: "polygon", name: "Polygon" },
    { id: "tron", name: "Tron" },
];
// Fiat deposit methods
const fiatMethods = [
    { id: "upi1", name: "UPI", range: "100 ~ 10,000", badge: "Fastest" },
    { id: "upi2", name: "UPI", range: "100 ~ 50,000", badge: null },
    { id: "upi3", name: "UPI", range: "300 ~ 50,000", badge: null },
    { id: "upi4", name: "UPI", range: "200 ~ 10,000", badge: null },
];
const localCurrency = [
    { id: "bdt", name: "BDT", icon: "🔵", },
    { id: "inr", name: "INR", icon: "🟢" },
    { id: "pkr", name: "PKR", icon: "🟡", }
]
type DepositProps = {
    variant?: "page" | "modal" | "drawer";
};

const Deposit = ({ variant = "page" }: DepositProps) => {

    const { section } = useParams();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(section || "deposit");
    const [depositTab, setDepositTab] = useState<"crypto" | "fiat">("crypto");
    const [open, setOpen] = useState(false);
    const [selectedCrypto, setSelectedCrypto] = useState("bc");
    const [selectedNetwork, setSelectedNetwork] = useState("solana");
    const [cwalletOpen, setCwalletOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(allBalances[2]);
    const handleCopyAddress = () => {
        navigator.clipboard.writeText("GkNqpF2P9xi5yYWtF3snCSnNrJnSvZ9qvGSpMhG764c");
        toast.success("Address copied to clipboard!");
    };
    const filtered = useMemo(() => {
        return allBalances.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);
    const cashList = filtered.filter((i) => i.type === "cash");
    const cryptoList = filtered.filter((i) => i.type === "crypto");


    return (
        <div
            className={cn(
                "w-full",
                variant === "modal"
                    ? "px-4 py-3 "
                    : "px-0"
            )}
        >
            {/* Crypto/Fiat Tabs */}
            {variant === "page" && (
                <div className="hidden lg:block sticky top-0 z-10">
                    <div className="flex rounded-lg bg-secondary border border-border overflow-hidden p-1 mb-3">
                        <button
                            onClick={() => setDepositTab("crypto")}
                            className={cn(
                                "flex-1 py-2 text-sm font-medium transition-colors rounded-lg",
                                depositTab === "crypto" ? "bg-primary text-foreground" : "bg-card text-muted-foreground"
                            )}
                        >
                            Crypto
                        </button>
                        <button
                            onClick={() => setDepositTab("fiat")}
                            className={cn(
                                "flex-1 py-2 text-sm font-medium transition-colors rounded-lg",
                                depositTab === "fiat" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"
                            )}
                        >
                            Fiat
                        </button>
                    </div>
                </div>)}
            {variant !== "page" && (
                <div className=" sticky top-0 z-10 bg-card">
                    <div className="flex border-b border-border">

                        <button
                            onClick={() => setDepositTab("crypto")}
                            className={cn(
                                "flex-1 py-3 text-sm font-semibold transition-all relative",
                                depositTab === "crypto"
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Crypto

                            {depositTab === "crypto" && (
                                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-500 rounded-full" />
                            )}
                        </button>

                        <button
                            onClick={() => setDepositTab("fiat")}
                            className={cn(
                                "flex-1 py-3 text-sm font-semibold transition-all relative",
                                depositTab === "fiat"
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Fiat

                            {depositTab === "fiat" && (
                                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-500 rounded-full" />
                            )}
                        </button>

                    </div>
                </div>
            )}

            <div className='bg-card rounded-lg flex-1 overflow-y-auto space-y-6 p-4'>
                {/* CWallet Connect Banner */}
                <button
                    onClick={() => setCwalletOpen(true)}
                    className="w-full flex items-center justify-between bg-secondary rounded-xl p-3 hover:bg-secondary/80 transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium text-foreground">Cwallet</span>
                        <span className="text-sm text-muted-foreground">Connect Cwallet to earn bonus</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>

                {depositTab === "crypto" ? (
                    <div className="space-y-6">
                        {/* Crypto Selection */}
                        <div className="flex flex-wrap gap-2">
                            {cryptoCurrencies.slice(0, 7).map((crypto) => (
                                <button
                                    key={crypto.id}
                                    onClick={() => setSelectedCrypto(crypto.id)}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                                        selectedCrypto === crypto.id
                                            ? "bg-secondary text-foreground"
                                            : "bg-card text-muted-foreground hover:bg-secondary/50"
                                    )}
                                >
                                    {crypto.icon}
                                    {crypto.name}
                                </button>
                            ))}
                            <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-muted-foreground">
                                More <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-primary text-sm">
                            Didn't see your currency? Add here
                        </p>
                        {/* Currency and Network Selection */}
                        <div
                            className={cn(
                                "grid gap-4",
                                variant === "modal" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
                            )}
                        >

                            <div className="relative">
                                <label className="text-sm text-muted-foreground mb-2 block">Deposit Currency</label>
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="w-full flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg border border-[#3a3f3f]"
                                >
                                    <span className="text-lg">{selected.icon}</span>
                                    <span className="font-medium text-white">{selected.name}</span>
                                    <ChevronDown className={`w-4 h-4 ml-auto text-gray-400 transition ${open ? "rotate-180" : ""}`} />
                                </button>

                                {/* Dropdown */}
                                {open && (
                                    <div className="absolute left-0 top-full mt-2 w-full bg-secondary border border-[#3a3f3f] rounded-lg shadow-lg z-50">

                                        {/* Search */}
                                        <div className="p-3">
                                            <div className="flex items-center gap-2 px-3 py-2 bg-[#2a2f2f] rounded-lg">
                                                <Search className="w-4 h-4 text-gray-400" />
                                                <input
                                                    value={search}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                    placeholder="Search"
                                                    className="w-full bg-transparent outline-none text-sm text-white"
                                                />
                                            </div>
                                        </div>

                                        <div className="max-h-64 overflow-y-auto px-2 pb-2">

                                            {/* Cash */}
                                            {cashList.length > 0 && (
                                                <>
                                                    <p className="text-xs text-gray-400 px-2 mb-1">Cash</p>
                                                    {cashList.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            onClick={() => {
                                                                setSelected(item);
                                                                setOpen(false);
                                                            }}
                                                            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#2f3434] cursor-pointer"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <span>{item.icon}</span>
                                                                <span className="text-white font-medium">{item.name}</span>
                                                            </div>
                                                            <span className="text-gray-300 text-sm">{item.balance}</span>
                                                        </div>
                                                    ))}
                                                </>
                                            )}

                                            {/* Crypto */}
                                            {cryptoList.length > 0 && (
                                                <>
                                                    <p className="text-xs text-gray-400 px-2 mt-3 mb-1">
                                                        Crypto currency
                                                    </p>
                                                    {cryptoList.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            onClick={() => {
                                                                setSelected(item);
                                                                setOpen(false);
                                                            }}
                                                            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#2f3434] cursor-pointer"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <span>{item.icon}</span>
                                                                <span className="text-white font-medium">{item.name}</span>
                                                            </div>
                                                            <span className="text-gray-300 text-sm">{item.balance}</span>
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="text-sm text-muted-foreground mb-2 block">Choose CoinNetwork</label>
                                <select
                                    value={selectedNetwork}
                                    onChange={(e) => setSelectedNetwork(e.target.value)}
                                    className="w-full px-4 py-3 bg-secondary rounded-lg border-none text-foreground"
                                >
                                    {networks.map((network) => (
                                        <option key={network.id} value={network.id}>{network.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button className="text-primary text-sm hover:underline">
                            📘 How to deposit crypto?
                        </button>
                        {/* Bonus Banner */}
                        <div className="flex items-center gap-3 bg-[#514634] rounded-xl p-3 border border-primary/20">
                            <Gift className="w-6 h-6 text-primary" />
                            <p className="text-sm">
                                Get extra 180% bonus on minimum of{" "}
                                <span className="text-primary font-semibold">694.57718 BC</span> deposit
                            </p>
                        </div>
                        {/* Deposit Address */}
                        <div className="">
                            <div
                                className="flex items-start gap-4 flex-nowrap"
                            >

                                <div className="w-28 h-28 bg-white rounded-lg shrink-0 flex items-center justify-center">
                                    <img
                                        src={qrCode}
                                        alt="QR code"
                                        className="w-full h-full object-contain p-1"
                                    />
                                </div>
                                <div className="flex flex-col my-auto">
                                    <h4 className="text-sm text-muted-foreground mb-2">Deposit address</h4>
                                    <div className="flex items-center gap-2 mb-4 bg-[#292d2e] rounded-lg pr-2">
                                        <code className="flex-1 sm:text-sm md:text-base px-3 sm:py-2 py-3 break-all">
                                            GkNqpF2P9xi5yYWtF3snCSnNrJnSvZ9qvGSpMhG764c
                                        </code>
                                        <button onClick={handleCopyAddress}>
                                            <Copy className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2 p-3 mt-2 rounded-lg bg-[#474035]">
                                <Info className="w-4 h-4 mt-0.5 shrink-0" />
                                Please note that SOL addresses are case sensitive.
                            </div>
                            <div className="flex items-start gap-2 text-sm text-muted-foreground bg-[#314940] rounded-lg p-3 mt-2">
                                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-yellow-500" />
                                Send only Rellbet to this deposit address. Transfers below 100 Rellbet will not be credited.
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* 7-Day Guarantee Badge */}
                        <div className="flex justify-center">
                            <span className="px-4 py-2 bg-secondary rounded-full text-sm">
                                🎁 7-Day Deposit Guarantee ℹ️
                            </span>
                        </div>
                        {/* Currency Selection */}
                        <div className="relative">
                                <label className="text-sm text-muted-foreground mb-2 block">Deposit Currency</label>
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="w-full flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg border border-[#3a3f3f]"
                                >
                                    <span className="text-lg">{selected.icon}</span>
                                    <span className="font-medium text-white">{selected.name}</span>
                                    <ChevronDown className={`w-4 h-4 ml-auto text-gray-400 transition ${open ? "rotate-180" : ""}`} />
                                </button>

                                {/* Dropdown */}
                                {open && (
                                    <div className="absolute left-0 top-full mt-2 w-full bg-secondary border border-[#3a3f3f] rounded-lg shadow-lg z-50">

                                        {/* Search */}
                                        <div className="p-3">
                                            <div className="flex items-center gap-2 px-3 py-2 bg-[#2a2f2f] rounded-lg">
                                                <Search className="w-4 h-4 text-gray-400" />
                                                <input
                                                    value={search}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                    placeholder="Search"
                                                    className="w-full bg-transparent outline-none text-sm text-white"
                                                />
                                            </div>
                                        </div>

                                        <div className="max-h-64 overflow-y-auto px-2 pb-2">

                                            {/* Cash */}
                                            {cashList.length > 0 && (
                                                <>
                                                    <p className="text-xs text-gray-400 px-2 mb-1">Cash</p>
                                                    {cashList.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            onClick={() => {
                                                                setSelected(item);
                                                                setOpen(false);
                                                            }}
                                                            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#2f3434] cursor-pointer"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <span>{item.icon}</span>
                                                                <span className="text-white font-medium">{item.name}</span>
                                                            </div>
                                                            <span className="text-gray-300 text-sm">{item.balance}</span>
                                                        </div>
                                                    ))}
                                                </>
                                            )}

                                            {/* Crypto */}
                                            {cryptoList.length > 0 && (
                                                <>
                                                    <p className="text-xs text-gray-400 px-2 mt-3 mb-1">
                                                        Crypto currency
                                                    </p>
                                                    {cryptoList.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            onClick={() => {
                                                                setSelected(item);
                                                                setOpen(false);
                                                            }}
                                                            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#2f3434] cursor-pointer"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <span>{item.icon}</span>
                                                                <span className="text-white font-medium">{item.name}</span>
                                                            </div>
                                                            <span className="text-gray-300 text-sm">{item.balance}</span>
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        {/* Bonus Banner */}
                        <div className="flex items-center gap-3 bg-card rounded-xl p-4 border border-primary/20">
                            <Gift className="w-6 h-6 text-primary" />
                            <p className="text-sm">
                                Get extra 180% bonus on minimum of{" "}
                                <span className="text-primary font-semibold">₹150.00</span> deposit
                            </p>
                        </div>
                        {/* Deposit Methods */}
                        <div className="bg-card rounded-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-medium">Deposit Method</h4>
                                <span className="text-sm text-primary">
                                    Recommend ℹ️
                                </span>
                            </div>
                            {fiatMethods.map((method) => (
                                <div
                                    key={method.id}
                                    className="flex items-center justify-between p-4 bg-secondary rounded-lg mb-2 cursor-pointer hover:bg-secondary/80"
                                >
                                    <div className="flex items-center gap-3">
                                        {method.badge && (
                                            <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded">
                                                {method.badge}
                                            </span>
                                        )}
                                        <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center">
                                            💳
                                        </div>
                                        <span>{method.name}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">{method.range} ⓘ</span>
                                </div>
                            ))}
                            <button className="w-full text-center text-primary text-sm mt-4">
                                View less
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <CWalletModal open={cwalletOpen} onClose={() => setCwalletOpen(false)} />
        </div>
    );
};

export default Deposit;