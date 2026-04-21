import React, { useEffect, useMemo, useState } from 'react';
import {
    Copy, AlertTriangle, Info, Gift, ChevronDown, ChevronRight, Wallet, Search, CreditCard, ArrowDownToLine,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { X, ArrowLeft, Mail } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import qrCode from "../../assets/images/qr-code.png";
import CWalletModal from "./CWalletModal";
import DepositGuaranteeModal from "./DepositGuaranteeModal";
import HowToDepositModal from "./HowToDepositModal";
import AddCurrencyModal from "./AddCurrencyModal";
import upiLogo from "../../assets/images/upi-logo.png";
import upiAllLogo from "../../assets/images/upi-all-logo.png";
import bkash from "../../assets/images/bkash-logo.png";
import rocket from "../../assets/images/roket.png";
import nagad from "../../assets/images/nagad.png";
import nayapay from "../../assets/images/nayapay-logo.png";
import jazzcash from "../../assets/images/jazzcash-logo.png";
import jazzcashHalf from "../../assets/images/jazzcash-half.png";
import easypaisa from "../../assets/images/easypaisa-logo.png";
import { useWalletStore } from '@/store/walletStore';

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

const networks = [
    { id: "solana", name: "Solana" },
    { id: "ethereum", name: "Ethereum (ERC20)" },
    { id: "bsc", name: "BSC (BEP20)" },
    { id: "polygon", name: "Polygon" },
    { id: "tron", name: "Tron (TRC20)" },
];

// Fiat currencies
const fiatCurrencies = [
    { id: "bdt", name: "BDT", fullName: "Bangladeshi Taka", icon: "🟢" },
    { id: "inr", name: "INR", fullName: "Indian Rupee", icon: "🟠" },
    { id: "pkr", name: "PKR", fullName: "Pakistani Rupee", icon: "🟢" },
    { id: "usd", name: "USD", fullName: "US Dollar", icon: "💲" },
];

// Per-currency deposit methods
const depositMethodsByFiat: Record<string, { id: string; name: string; range: string; badge?: string; eta?: string; category?: string, icon?: string }[]> = {
    inr: [
        { id: "upi1", name: "UPI", icon: upiLogo, range: "100 ~ 50,000", badge: "Recommend", eta: "1 min", category: "Recommend" },
        { id: "upi3", name: "UPI (Paytm/GPay/PhonePe)", icon: upiAllLogo, badge: "Fastest", range: "300 ~ 50,000", eta: "2 min", category: "Recommend" },
        { id: "upi2", name: "UPI", icon: upiLogo, range: "100 ~ 50,000", eta: "1 min", category: "Recommend" },
        { id: "gpay", name: "Google Pay", icon: upiLogo, range: "100 ~ 10,000", eta: "1 min", category: "E-wallet" },
        { id: "phonepe", name: "PhonePe", icon: upiLogo, range: "100 ~ 10,000", eta: "1 min", category: "E-wallet" },
        { id: "paytm", name: "Paytm", icon: upiLogo, range: "100 ~ 50,000", eta: "2 min", category: "E-wallet" },
    ],
    bdt: [
        { id: "bkash", name: "BKASH", icon: bkash, range: "100 ~ 50,000", badge: "Recommend", eta: "1 min", category: "Mobile Banking" },
        { id: "nagad", name: "NAGAD", icon: nagad, range: "100 ~ 50,000", eta: "1 min", category: "Mobile Banking" },
        { id: "rocket", name: "ROCKET", icon: rocket, range: "100 ~ 50,000", eta: "2 min", category: "Mobile Banking" },
    ],
    pkr: [
        { id: "jazz1", name: "Jazzcash", icon: jazzcash, range: "100 ~ 50,000", badge: "Recommend", eta: "1 min", category: "Recommend" },
        { id: "jazz2", name: "Jazzcash", icon: jazzcashHalf, range: "100 ~ 1,000,000", badge: "Recommend", eta: "1 min", category: "Recommend" },
        { id: "jazz3", name: "Jazzcash", icon: jazzcash, range: "100 ~ 50,000", badge: "Popular", eta: "2 min", category: "Recommend" },
        { id: "jazz4", name: "Jazzcash", icon: nayapay, range: "100 ~ 50,000", badge: "Fastest", eta: "1 min", category: "Recommend" },
        { id: "easypaisa1", name: "Easypaisa", icon: easypaisa, range: "100 ~ 150,000", eta: "2 min", category: "E-wallet" },
        { id: "nayapay", name: "NAYAPAY", icon: jazzcash, range: "100 ~ 150,000", eta: "2 min", category: "E-wallet" },
        { id: "jazz5", name: "Jazzcash", icon: jazzcash, range: "100 ~ 50,000", eta: "1 min", category: "E-wallet" },
        { id: "jazz6", name: "Jazzcash", icon: jazzcash, range: "100 ~ 500,000", eta: "1 min", category: "E-wallet" },
        { id: "easypaisa2", name: "Easypaisa", icon: easypaisa, range: "1,000 ~ 50,000", eta: "1 min", category: "E-wallet" },
    ],
    usd: [],
};
const currencyConfig = {
    bdt: {
        symbol: "BDT",
        min: 150,
        range: "100 - 50,000",
        quick: [150, 500, 5000, 50000],
    },
    inr: {
        symbol: "₹",
        min: 150,
        range: "100 - 50,000",
        quick: [150, 500, 5000, 50000],
    },
    pkr: {
        symbol: "PKR",
        min: 600,
        range: "100 - 50,000",
        quick: [600, 2000, 10000, 50000],
    }
};
type DepositProps = { variant?: "page" | "modal" | "drawer" };

const Withdraw = ({ variant = "page" }: DepositProps) => {
    const navigate = useNavigate();
    const { requestWithdraw, wallets, transactions, fetchTransactions, otpVerified } = useWalletStore();
    const { section } = useParams();
    const [depositTab, setDepositTab] = useState<"fiat" | "crypto">("fiat");
    const [open, setOpen] = useState(false);
    const [verified, setVerified] = useState(false);
    const [selectedCrypto, setSelectedCrypto] = useState("eth");
    const [selectedNetwork, setSelectedNetwork] = useState("ethereum");
    const [cwalletOpen, setCwalletOpen] = useState(false);
    const [guaranteeOpen, setGuaranteeOpen] = useState(false);
    const [howToOpen, setHowToOpen] = useState(false);
    const [addCurrencyOpen, setAddCurrencyOpen] = useState(false);
    const [selectedFiat, setSelectedFiat] = useState("bdt");
    const [search, setSearch] = useState("");
    const [selectedWallet, setSelectedWallet] = useState<any>(null);
    const [account, setAccount] = useState("");
    const [otpVerifyOpen, setOtpVerifyOpen] = useState(false);
    const [otpCode, setOtpCode] = useState("");
    const [name, setName] = useState("");
    // Fiat state
    const [fiatCurrencyOpen, setFiatCurrencyOpen] = useState(false);
    const [selectedFiatCurrency, setSelectedFiatCurrency] = useState(fiatCurrencies[0]);
    const [fiatSearch, setFiatSearch] = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [openCategories, setOpenCategories] = useState({});
    const isINR = selectedFiat === "inr";
    const cfg = currencyConfig[selectedFiat];
    const filtered = useMemo(() => {
        return wallets.filter((w: any) =>
            w.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [wallets, search]);
    const cashList = filtered.filter((i) => i.type === "cash");
    const cryptoList = filtered.filter((i) => i.type === "crypto");

    const filteredFiatCurrencies = fiatCurrencies.filter((c) =>
        c.name.toLowerCase().includes(fiatSearch.toLowerCase()) ||
        c.fullName.toLowerCase().includes(fiatSearch.toLowerCase())
    );

    const handleCopyAddress = () => {
        navigator.clipboard.writeText("0x2440265f2CCE3e961a003870090C3d2eBf0");
        toast.success("Address copied to clipboard!");
    };
    // const realWallet = wallets.find(
    //     (w: any) => w.id.toLowerCase() === selected.id.toLowerCase()
    // );
    const realWallet = wallets.find(
        (w: any) => w.id === selectedWallet?.id
    );

    const balance = Number(realWallet?.balance || 0);
    useEffect(() => {
        fetchTransactions();
        if (wallets.length && !selectedWallet) {
            setSelectedWallet(wallets[0]); // default first wallet
        }
    }, [wallets]);
    const recentWithdraws = useMemo(() => {
        return (transactions || [])
            .filter((t: any) => t.type === "WITHDRAW") // only withdraw
            .sort((a: any, b: any) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            ) // latest first
            .slice(0, 2); // only 2
    }, [transactions]);
    const currentMethods = depositMethodsByFiat[selectedFiatCurrency.id] || [];
    const categories = [...new Set(currentMethods.map(m => m.category))];
    const isUSD = selectedFiatCurrency.id === "usd";

    const quickAmounts: Record<string, number[]> = {
        inr: [150, 500, 5000, 50000],
        bdt: [150, 500, 5000, 50000],
        pkr: [600, 1000, 5000, 50000],
        usd: [],
    };

    const minAmounts: Record<string, string> = {
        inr: "₹150.00",
        bdt: "BDT 150.00",
        pkr: "PKR 600.00",
        usd: "$0",
    };
    const statusColor = {
        COMPLETED: "text-green-500",
        PENDING: "text-yellow-500",
        FAILED: "text-red-500",
    };
    const InrMethodCard = ({ method }) => (
        <button
            onClick={() => setSelectedMethod(method.id)}
            className={cn(
                "w-full sm:w-[180px] flex flex-col items-center justify-center gap-2 rounded-xl p-3 sm:p-4 border border-gray-500 transition hover:opacity-90",
                selectedMethod === method.id
                    ? "border-primary bg-primary/10"
                    : " bg-layer4_alt"
            )}
        >
            {/* badge */}
            {method.badge && (
                <span className="absolute -top-2 -left-2 bg-orange-500 text-white text-[10px] px-2 py-[2px] rounded">
                    {method.badge}
                </span>
            )}

            {/* left */}
            <div className="flex flex-row items-center gap-3">
                <img src={method.icon} className="h-8 w-auto object-contain bg-[#3a4142] rounded-lg" />
                <p className="text-sm font-medium">{method.name}</p>
            </div>

            {/* right */}
            <p className="text-xs text-muted-foreground">{method.range}</p>
        </button>
    );

    const PKRMethodCard = ({ method }) => (
        <button
            onClick={() => setSelectedMethod(method.id)}
            className={cn(
                "w-full sm:w-[180px] flex flex-col items-center justify-center gap-2 rounded-xl p-3 sm:p-4 border border-gray-500 transition hover:opacity-90",
                selectedMethod === method.id
                    ? "border-primary bg-primary/10"
                    : " bg-layer4_alt"
            )}
        >

            {/* Badge */}
            {method.badge && (
                <div className="absolute left-0 top-0 rounded-br-xl rounded-tl-xl bg-gradient-to-tr from-[#E15A0F] to-[#F7931A] px-2 py-0.5 text-xs text-white">
                    {method.badge}
                </div>
            )}

            {/* Icon */}
            <div className="rounded-lg bg-layer3_alt p-2 flex flex-col items-center justify-center w-full">
                <img
                    src={method.icon}
                    alt={method.name}
                    className="h-8 object-contain"
                />
            </div>

            {/* Name */}
            <p className="text-sm font-medium text-center truncate w-full">
                {method.name}
            </p>

            {/* Range */}
            <p className="text-xs text-muted-foreground text-center">
                {method.range}
            </p>

            {/* ETA */}
            {method.eta && (
                <p className="text-xs text-muted-foreground text-center">
                    ETA: {method.eta}
                </p>
            )}

        </button>
    );

    const BDTMethodCard = ({ method }) => (
        <button
            onClick={() => setSelectedMethod(method.id)}
            className={cn(
                "w-full sm:w-[180px] flex flex-col items-center justify-center gap-2 rounded-xl p-3 sm:p-4 border border-gray-500 transition hover:opacity-90",
                selectedMethod === method.id
                    ? "border-primary bg-primary/10"
                    : " bg-layer4_alt"
            )}
        >
            {/* Icon */}
            <div className='flex flex-col items-center gap-2 sm:gap-3'>
                <img
                    src={method.icon}
                    alt={method.name}
                    className="h-8 sm:h-10 w-auto object-contain"
                />

                {/* Text */}
                <p className="text-xs sm:text-sm font-medium text-center">
                    {method.name}
                </p>
            </div>
        </button>
    );
    const toggleCategory = (cat: any) => {
        setOpenCategories((prev) => ({
            ...prev,
            [cat]: !prev[cat],
        }));
    };
    return (
        <div className={cn("w-full", variant === "modal" ? "px-4 py-3" : "px-0")}>
            <label className="text-sm text-muted-foreground mb-2 block">Withdraw Currency</label>
            {/* Tabs */}
            {variant === "page" && (
                <div className="hidden lg:block sticky top-0 z-10">
                    <div className="flex rounded-lg bg-secondary border border-border overflow-hidden p-1 mb-3">
                        <button onClick={() => setDepositTab("crypto")} className={cn("flex-1 py-2 text-sm font-medium transition-colors rounded-lg", depositTab === "crypto" ? "bg-primary text-foreground" : "bg-card text-muted-foreground")}>Crypto</button>
                        <button onClick={() => setDepositTab("fiat")} className={cn("flex-1 py-2 text-sm font-medium transition-colors rounded-lg", depositTab === "fiat" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground")}>Fiat</button>
                    </div>
                </div>
            )}
            {variant !== "page" && (
                <div className="sticky top-0 z-10 bg-card">
                    <div className="flex border-b border-border">
                        <button onClick={() => setDepositTab("crypto")} className={cn("flex-1 py-3 text-sm font-semibold transition-all relative", depositTab === "crypto" ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
                            Crypto
                            {depositTab === "crypto" && <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary rounded-full" />}
                        </button>
                        <button onClick={() => setDepositTab("fiat")} className={cn("flex-1 py-3 text-sm font-semibold transition-all relative", depositTab === "fiat" ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
                            Fiat
                            {depositTab === "fiat" && <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary rounded-full" />}
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-card rounded-lg flex-1 overflow-y-auto space-y-6 p-4">
                {/* CWallet Banner */}
                {/* <button onClick={() => setCwalletOpen(true)} className="w-full flex items-center justify-between bg-secondary rounded-xl p-3 hover:bg-secondary/80 transition-colors">
                    <div className="flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium text-foreground">Cwallet</span>
                        <span className="text-sm text-muted-foreground">Connect Cwallet to earn bonus</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button> */}

                {depositTab === "crypto" ? (
                    <div className="space-y-6">
                        {/* or divider */}
                        <div className='text-center'>Coming Soon</div>
                        {/* <div> 
                        <div className="text-center text-xs text-muted-foreground">or</div>
                        <div className="flex flex-wrap gap-2">
                            {cryptoCurrencies.slice(0, 7).map((crypto) => (
                                <button key={crypto.id} onClick={() => setSelectedCrypto(crypto.id)} className={cn("flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-colors border", selectedCrypto === crypto.id ? "bg-primary/20 border-primary text-foreground" : "bg-secondary border-transparent text-muted-foreground hover:bg-secondary/80")}>
                                    {crypto.icon} {crypto.name}
                                </button>
                            ))}
                            <button className="flex items-center gap-1 px-3 py-2 rounded-full text-sm text-muted-foreground bg-secondary">
                                More <ChevronDown className="w-3 h-3" />
                            </button>
                        </div>
                        <p className="text-sm">
                            Didn't see your currency?
                            <button onClick={() => setAddCurrencyOpen(true)} className="text-primary font-semibold ml-1 hover:underline">Add here</button>
                        </p>
                        <div className={cn("grid gap-4", variant === "modal" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2")}>
                            <div className="relative">
                                <label className="text-sm text-muted-foreground mb-2 block">Withdraw Currency</label>
                                <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg border border-border">
                                    <span className="text-lg">{selectedWallet?.icon}</span>
                                    <span className="font-medium text-foreground">{selectedWallet?.name}</span>
                                    <ChevronDown className={cn("w-4 h-4 ml-auto text-muted-foreground transition", open && "rotate-180")} />
                                </button>
                                {open && (
                                    <div className="absolute left-0 top-full mt-2 w-full bg-secondary border border-border rounded-lg shadow-lg z-50">
                                        <div className="p-3">
                                            <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-lg">
                                                <Search className="w-4 h-4 text-muted-foreground" />
                                                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="w-full bg-transparent outline-none text-sm text-foreground" />
                                            </div>
                                        </div>
                                        <div className="max-h-64 overflow-y-auto px-2 pb-2">
                                            {cashList.length > 0 && (
                                                <>
                                                    <p className="text-xs text-muted-foreground px-2 mb-1">Cash</p>
                                                    {cashList.map((item) => (
                                                        <div key={item.id} onClick={() => { setSelectedWallet(item); setOpen(false); }} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-card cursor-pointer">
                                                            <div className="flex items-center gap-2">
                                                                <span>{item.icon}</span>
                                                                <span className="text-foreground font-medium">{item.name}</span>
                                                            </div>
                                                            <span className="text-muted-foreground text-sm">{item.balance}</span>
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                            {cryptoList.length > 0 && (
                                                <>
                                                    <p className="text-xs text-muted-foreground px-2 mt-3 mb-1">Crypto currency</p>
                                                    {cryptoList.map((item) => (
                                                        <div key={item.id} onClick={() => { setSelectedWallet(item); setOpen(false); }} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-card cursor-pointer">
                                                            <div className="flex items-center gap-2">
                                                                <span>{item.icon}</span>
                                                                <span className="text-foreground font-medium">{item.name}</span>
                                                            </div>
                                                            <span className="text-muted-foreground text-sm">{item.balance}</span>
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
                                <select value={selectedNetwork} onChange={(e) => setSelectedNetwork(e.target.value)} className="w-full px-4 py-3 bg-secondary rounded-lg border-none text-foreground">
                                    {networks.map((network) => (
                                        <option key={network.id} value={network.id}>{network.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button onClick={() => setHowToOpen(true)} className="text-primary text-sm hover:underline">
                            📘 How to withdraw crypto?
                        </button>
                        <div className="flex items-center gap-3 bg-[hsl(var(--primary)/0.15)] rounded-xl p-3 border border-primary/20">
                            <Gift className="w-6 h-6 text-primary" />
                            <p className="text-sm">
                                Get extra <span className="text-primary font-semibold">180%</span> Rakeback on minimum of{" "}
                                <span className="text-primary font-semibold">0.0024691 ETH</span> deposit
                            </p>
                        </div>
                        <div>
                            <div className="flex items-start gap-4 flex-nowrap">
                                <div className="w-28 h-28 bg-white rounded-lg shrink-0 flex items-center justify-center">
                                    <img src={qrCode} alt="QR code" className="w-full h-full object-contain p-1" />
                                </div>
                                <div className="flex flex-col my-auto">
                                    <h4 className="text-sm text-muted-foreground mb-2">Withdraw Address</h4>
                                    <div className="flex items-center gap-2 mb-4 bg-secondary rounded-lg pr-2">
                                        <code className="flex-1 sm:text-sm md:text-base px-3 sm:py-2 py-3 break-all text-foreground">
                                            <span className="text-primary">0x24</span>40265f2CCE3e96<span className="text-primary">1a003870090C3d2eBf0</span>
                                        </code>
                                        <button onClick={handleCopyAddress}><Copy className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-muted-foreground p-3 mt-2 rounded-lg bg-primary/10">
                                <Info className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                                Send only ETH to this withdraw address. Transfers below 0.0002 ETH will not be credited.
                            </div>
                            <div className="mt-3 bg-primary/10 rounded-lg p-3 border border-primary/20">
                                <p className="text-sm font-medium text-foreground">
                                    <span className="text-primary">Cwallet</span> Scan to Pay · Instant Credit · 0 fee
                                </p>
                                <p className="text-sm text-primary">
                                    Tap Here → Auto Open Cwallet → Auto Fill address → Confirm → Instant credit
                                </p>
                            </div>
                            <div className="mt-4">
                                <p className="text-center text-xs text-muted-foreground mb-3">Or Support Withdraw With</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-secondary rounded-lg hover:bg-secondary/80 text-sm font-medium">
                                        🦊 MetaMask
                                    </button>
                                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-secondary rounded-lg hover:bg-secondary/80 text-sm font-medium">
                                        🔗 WalletConnect
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-foreground">Recent Withdraws</h4>
                                    <button onClick={() => navigate('/wallet/transaction')} className="text-primary text-sm hover:underline">More &gt;</button>
                                </div>
                                <div className="space-y-2">
                                    {recentWithdraws.map((tx: any) => (
                                    <div key={tx.id} className="flex items-center justify-between py-2 text-sm">
                                        <span className="text-primary"> -{tx.currency} {Number(tx.amount).toLocaleString()}🟠</span>
                                        <span className="text-muted-foreground">{new Date(tx.createdAt).toLocaleString()}</span>
                                        <span className={cn("flex items-center gap-1", statusColor[tx.status])}> ● {tx.status}</span>
                                    </div>
                                    ))}
                                    {recentWithdraws.length === 0 && (
                                        <p className="text-center text-xs text-muted-foreground">
                                            No recent withdraws
                                        </p>
                                    )}
                                </div>
                                <p className="text-center text-xs text-muted-foreground mt-3">Only showing recent 30 days</p>
                            </div>
                        </div>
                        </div> */}
                    </div>
                ) : (
                    /* ═══════════════ FIAT TAB ═══════════════ */
                    <div className="space-y-6">
                        {/* 7-Day Guarantee + Currency selector row */}
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <label className="text-sm text-muted-foreground">Withdraw Currency</label>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setGuaranteeOpen(true)} className="px-3 py-1.5 bg-primary/20 rounded-full text-xs text-primary font-semibold flex items-center gap-1 hover:bg-primary/30 transition-colors">
                                    🎁 7-Day withdraw Guarantee <Info className="w-3 h-3" />
                                </button>
                                {/* Fiat currency dropdown */}
                                <div className="relative">
                                    <button onClick={() => setFiatCurrencyOpen(!fiatCurrencyOpen)} className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg border border-border">
                                        <span>{selectedFiatCurrency.icon}</span>
                                        <span className="font-medium text-foreground">{selectedFiatCurrency.name}</span>
                                        <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition", fiatCurrencyOpen && "rotate-180")} />
                                    </button>
                                    {fiatCurrencyOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-64 bg-secondary border border-border rounded-lg shadow-lg z-50">
                                            <div className="p-3">
                                                <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-lg">
                                                    <Search className="w-4 h-4 text-muted-foreground" />
                                                    <input value={fiatSearch} onChange={(e) => setFiatSearch(e.target.value)} placeholder="Search" className="w-full bg-transparent outline-none text-sm text-foreground" />
                                                </div>
                                            </div>
                                            <div className="max-h-48 overflow-y-auto px-2 pb-2">
                                                {filteredFiatCurrencies.map((c) => (
                                                    <button key={c.id} onClick={() => { setSelectedFiatCurrency(c); setFiatCurrencyOpen(false); setSelectedMethod(null); setFiatSearch(""); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-card text-left transition-colors">
                                                        <span>{c.icon}</span>
                                                        <span className="text-sm font-medium text-foreground">{c.name} - {c.fullName}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* USD: Not supported */}
                        {isUSD ? (
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 bg-primary/10 rounded-lg p-4">
                                    <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                                    <p className="text-sm text-muted-foreground">
                                        Sorry, it is not currently supported to directly deposit this currency. Don't worry! You can still buy crypto by using your credit/debit card or deposit your existing crypto assets.
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <CreditCard className="w-5 h-5 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium text-foreground">Buy Crypto</p>
                                                <p className="text-xs text-muted-foreground">Buy Crypto Instantly - Credit/Debit Card Accepted</p>
                                            </div>
                                        </div>
                                        <button onClick={() => navigate('/wallet/buy-crypto')} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90">Buy</button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <ArrowDownToLine className="w-5 h-5 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium text-foreground">Deposit Crypto</p>
                                                <p className="text-xs text-muted-foreground">Deposit Crypto - Transfer from External Wallet</p>
                                            </div>
                                        </div>
                                        <button onClick={() => { setDepositTab("crypto"); }} className="px-4 py-2 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary/10">Deposit</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Rakeback Banner */}
                                {/* <div className="flex items-center gap-3 bg-[hsl(var(--primary)/0.15)] rounded-xl p-3 border border-primary/20">
                                    <Gift className="w-6 h-6 text-primary" />
                                    <p className="text-sm">
                                        Get extra <span className="text-primary font-semibold">180%</span> Rakeback on minimum of{" "}
                                        <span className="text-primary font-semibold">{minAmounts[selectedFiatCurrency.id]}</span> deposit
                                    </p>
                                </div> */}
                                {/* <div className="flex items-center gap-3 bg-[hsl(var(--primary)/0.15)] rounded-xl p-3 border border-primary/20">
                                    <Gift className="w-6 h-6 text-primary" />
                                    <p className="text-sm">
                                        Get extra <span className="text-primary font-semibold">180%</span> Rakeback on minimum of{" "}
                                        <span className="text-primary font-semibold">
                                            {cfg.symbol} {cfg.min}
                                        </span>{" "}
                                        deposit
                                    </p>
                                </div> */}

                                {/* Withdraw Methods */}
                                <div>
                                    <h4 className="font-medium text-foreground mb-4">Withdraw Method</h4>
                                    {categories.map((cat) => {

                                        const methods = currentMethods.filter(m => m.category === cat);
                                        const isOpen = openCategories[cat] ?? true;

                                        return (
                                            <div key={cat} className="mb-5">

                                                {/* Header */}
                                                <button
                                                    onClick={() => toggleCategory(cat)}
                                                    className="flex items-center justify-between w-full mb-3"
                                                >
                                                    <p className="text-sm font-medium text-muted-foreground">{cat}</p>

                                                    <ChevronDown
                                                        className={cn(
                                                            "w-4 h-4 transition-transform",
                                                            isOpen && "rotate-180"
                                                        )}
                                                    />
                                                </button>

                                                {/* Content */}
                                                {isOpen && (
                                                    <div
                                                        className={
                                                            selectedFiat === "inr"
                                                                ? "flex flex-col gap-3"
                                                                : selectedFiat === "bdt" || selectedFiat === "pkr"
                                                                    ? "grid grid-cols-4 gap-3"
                                                                    : "grid grid-cols-4 gap-3"
                                                        }
                                                    >
                                                        {methods.map((method) => {

                                                            if (selectedFiat === "inr")
                                                                return <InrMethodCard key={method.id} method={method} />

                                                            if (selectedFiat === "bdt")
                                                                return <BDTMethodCard key={method.id} method={method} />

                                                            if (selectedFiat === "pkr")
                                                                return <PKRMethodCard key={method.id} method={method} />

                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div>
                                    <label className="text-sm text-muted-foreground mb-2 block">
                                        Account Holder Name
                                    </label>
                                    <input
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-3 bg-secondary rounded-lg text-foreground outline-none"
                                    />
                                </div>
                                {/* Withdraw Amount */}
                                <div>
                                    <label className="text-sm text-muted-foreground mb-2 block">
                                        Withdraw Address
                                    </label>
                                    <input
                                        placeholder="Enter wallet "
                                        value={account}
                                        onChange={(e) => setAccount(e.target.value)}
                                        className="w-full px-4 py-3 bg-secondary rounded-lg text-foreground outline-none"
                                    />
                                </div>
                                {selectedMethod && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm text-muted-foreground mb-2 block">
                                                Withdraw Amount ({cfg.range} {cfg.symbol})
                                                {/* ({currentMethods.find(m => m.id === selectedMethod)?.range} {selectedFiatCurrency.name}) */}
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    value={withdrawAmount}
                                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                                    placeholder="150"
                                                    className="flex-1 px-4 py-3 bg-secondary rounded-lg text-foreground outline-none"
                                                />
                                                {withdrawAmount && (
                                                    <span className="text-sm text-primary font-semibold whitespace-nowrap">
                                                        Min:{selectedFiatCurrency.name} {(parseFloat(withdrawAmount || "0") * .25).toFixed(2)}
                                                    </span>
                                                )}

                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                            {/* {(quickAmounts[selectedFiatCurrency.id] || []).map((amt) => (
                                                <button
                                                    key={amt}
                                                    onClick={() => setWithdrawAmount(String(amt))}
                                                    className={cn("py-2.5 rounded-lg text-sm font-medium border transition-colors relative", depositAmount === String(amt) ? "border-primary bg-primary/10 text-foreground" : "border-border bg-secondary text-foreground hover:bg-secondary/80")}
                                                >
                                                    {selectedFiatCurrency.name} {amt.toLocaleString()}
                                                    <span className="absolute -top-2 -right-1 text-[10px] bg-red-500 text-white px-1 rounded">+180%</span>
                                                </button>
                                            ))} */}
                                            {/* {cfg.quick.map((amt: any) => (
                                                <button
                                                    key={amt}
                                                    onClick={() => setWithdrawAmount(String(amt))}
                                                    className="relative py-2.5 rounded-lg border bg-secondary"
                                                >
                                                    {cfg.symbol} {amt.toLocaleString()}

                                                    <span className="absolute -top-2 -right-1 text-[10px] bg-red-500 text-white px-1 rounded">
                                                        +180%
                                                    </span> 
                                                </button>
                                            ))} */}
                                        </div>
                                        <div>
                                            {withdrawAmount && (
                                                <span className="text-sm text-primary font-semibold whitespace-nowrap">
                                                    Available:{selectedFiatCurrency.name} {(parseFloat(withdrawAmount || "0") - .25).toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => setOtpVerifyOpen(true)}
                                            className={cn(
                                                "w-full py-2 rounded-lg text-sm font-semibold transition",
                                                otpVerified
                                                    ? "bg-green-500/20 text-green-400"
                                                    : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                                            )}
                                        >
                                            {otpVerified ? "✅ Email Verified" : "Verify Email for Withdraw"}
                                        </button>
                                        <button
                                            disabled={!otpVerified}
                                            // className="w-full py-3 bg-primary text-primary-foreground 
                                            // rounded-lg font-semibold text-sm hover:bg-primary/90"
                                            className={cn(
                                                "w-full py-3 rounded-lg font-semibold text-sm transition",
                                                otpVerified
                                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                    : "bg-gray-500 cursor-not-allowed text-white"
                                            )}
                                            onClick={async () => {
                                                console.log({ withdrawAmount, selectedMethod, account });
                                                if (!otpVerified) {
                                                    toast.error("Please verify OTP first");
                                                    return;
                                                }
                                                if (!withdrawAmount || !selectedMethod || !account) {
                                                    toast.error("Fill all fields");
                                                    return;
                                                }

                                                // if (Number(withdrawAmount) > balance) {
                                                //     toast.error("Insufficient balance");
                                                //     return;
                                                // }

                                                try {
                                                    await requestWithdraw({
                                                        currency: selectedWallet?.name || "BDT",
                                                        amount: Number(withdrawAmount),
                                                        method: selectedMethod,
                                                        account: account,
                                                        otp: otpCode
                                                    });
                                                    console.log("SELECTED:", selectedWallet);
                                                    console.log("REAL WALLET:", realWallet);
                                                    console.log("BALANCE:", balance);
                                                    toast.success("Withdraw request sent 🚀");
                                                } catch (err: any) {
                                                    toast.error(err.message || "Withdraw failed");
                                                }
                                            }}
                                        >
                                            Withdraw Submit ◇
                                        </button>
                                        <div className="bg-secondary rounded-lg p-3 space-y-1">
                                            <p className="text-xs text-muted-foreground">ⓘ 1. Your transfer amount has to MATCH the submission amount.</p>
                                            <p className="text-xs text-muted-foreground">2. Each Order ID can ONLY be used once to avoid duplicates.</p>
                                            <p className="text-xs text-muted-foreground">3. Please follow the deposit guideline to make deposit, otherwise your deposit will be missing.</p>
                                        </div>
                                    </div>
                                )}

                                {!selectedMethod && (
                                    <button className="w-full text-center text-primary text-sm mt-2 hover:underline">
                                        View more
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
            {


            }
            {/* Modals */}
            <WithdrawOtpVerifyModal open={otpVerifyOpen} onClose={() => setOtpVerifyOpen(false)} onVerified={(otp) => setOtpCode(otp)} />
            <CWalletModal open={cwalletOpen} onClose={() => setCwalletOpen(false)} />
            <DepositGuaranteeModal open={guaranteeOpen} onClose={() => setGuaranteeOpen(false)} />
            <HowToDepositModal open={howToOpen} onClose={() => setHowToOpen(false)} />
            <AddCurrencyModal open={addCurrencyOpen} onClose={() => setAddCurrencyOpen(false)} onSelect={(c) => { /* could switch to that currency */ }} />
        </div>
    );
};

export default Withdraw;

interface OtpVerifyModalProps {
    open: boolean;
    onClose: () => void;
    onVerified: (otp: string) => void;
}

export const WithdrawOtpVerifyModal = ({ open, onClose, onVerified }: OtpVerifyModalProps) => {
    const isMobile = useIsMobile();
    const [code, setCode] = useState("");
    const [sent, setSent] = useState(false);
    const { sendWithdrawOtp, verifyWithdrawOtp } = useWalletStore();

    const handleSendCode = async () => {
        try {
            await sendWithdrawOtp();
            setSent(true);
            toast.success("OTP sent to your email");
        } catch (err: any) {
            toast.error(err.message || "Failed to send OTP");
        }
    };

    const handleVerify = async () => {
        if (code.length !== 6) {
            toast.error("Enter valid 6 digit OTP");
            return;
        }

        try {
            await verifyWithdrawOtp(code);
            onVerified(code);
            toast.success("Email verified ✅");
            onClose();
        } catch (err: any) {
            toast.error(err.message || "Invalid OTP");
        }
    };
    const content = (
        <div className="flex flex-col items-center p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between w-full">
                {isMobile ? (
                    <button onClick={onClose} className="p-1">
                        <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                    </button>
                ) : <div />}
                <h3 className="font-semibold text-foreground">Email Verification</h3>
                {/* {!isMobile && (
          <button onClick={onClose} className="p-1 rounded-full hover:bg-secondary">
            <X className="w-5 h-5 text-muted-foreground" /> 
          </button>
        )} */}
            </div>

            {/* Icon */}
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-10 h-10 text-primary" />
            </div>

            {!sent ? (
                <>
                    <p className="text-sm text-muted-foreground text-center">
                        We'll send a verification code to your registered email address to create your Cwallet account.
                    </p>
                    <Button
                        onClick={handleSendCode}
                        className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                    >
                        Send Verification Code
                    </Button>
                </>
            ) : (
                <>
                    <p className="text-sm text-muted-foreground text-center">
                        Enter the 6-digit code sent to your email
                    </p>
                    <input
                        type="text"
                        maxLength={6}
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                        placeholder="000000"
                        className="w-full text-center text-2xl tracking-[0.5em] py-3 bg-secondary rounded-lg border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button
                        onClick={handleVerify}
                        className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                    >
                        Verify Otp for Withdraw
                    </Button>
                    <button onClick={handleSendCode} className="text-sm text-primary hover:underline">
                        Resend Code
                    </button>
                </>
            )}
        </div>
    );

    if (isMobile) {
        return (
            <Sheet open={open} onOpenChange={onClose}>
                <SheetContent side="right" className="w-full sm:max-w-md p-0">
                    {content}
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-[400px] p-0 gap-0">
                {content}
            </DialogContent>
        </Dialog>
    );
};
