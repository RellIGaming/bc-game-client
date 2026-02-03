import { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import qrLogo from "../../src/assets/images/qr-code.png"
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
import Footer from "@/components/home/Footer";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import WithdrawGuideModal from "@/components/game/WithdrawGuideModal";
import AddAddressModal from "@/components/game/AddAddressModal";

// Wallet menu items
const walletMenuItems = [
  { id: "balance", label: "Balance", icon: Wallet },
  { id: "deposit", label: "Deposit", icon: ArrowDownToLine },
  { id: "withdraw", label: "Withdraw", icon: ArrowUpFromLine },
  { id: "buy-crypto", label: "Buy Crypto", icon: CreditCard },
  { id: "swap", label: "Swap", icon: ArrowLeftRight },
  { id: "vault-pro", label: "Vault Pro", icon: Vault },
  { id: "transaction", label: "Transaction", icon: Receipt },
  { id: "rollover", label: "Rollover", icon: RotateCcw },
  { id: "bet-history", label: "Bet History", icon: Clock },
];

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
  { id: "xlm", name: "XLM", icon: "⚪", balance: 0, type: "crypto" },
  { id: "sats", name: "SATS", icon: "🟠", balance: 0, type: "crypto" },
  { id: "matic", name: "MATIC", icon: "🟣", balance: 0, type: "crypto" },
  { id: "wld", name: "WLD", icon: "⚪", balance: 0, type: "crypto" },
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

interface WalletPageProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const WalletPage = ({ isLoggedIn, setIsLoggedIn }: WalletPageProps) => {
  const { section } = useParams();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState(section || "deposit");
  const [depositTab, setDepositTab] = useState<"crypto" | "fiat">("crypto");
  const [selectedCrypto, setSelectedCrypto] = useState("bc");
  const [selectedNetwork, setSelectedNetwork] = useState("solana");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [hideZeroBalance, setHideZeroBalance] = useState(false);
  const [balanceSearch, setBalanceSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(allBalances[2]);
  const dropdownRef = useRef(null);
  const [openGuide, setOpenGuide] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);

  const filtered = useMemo(() => {
    return allBalances.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const cashList = filtered.filter((i) => i.type === "cash");
  const cryptoList = filtered.filter((i) => i.type === "crypto");

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/casino");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (section) {
      setActiveSection(section);
    }
  }, [section]);

  useEffect(() => {
    document.documentElement.classList.remove("light");
    if (!isDark) {
      document.documentElement.classList.add("light");
    }
  }, [isDark]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
        setSidebarCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  const getMainMargin = () => {
    if (isMobile) return 0;
    if (!sidebarOpen) return 0;
    return sidebarCollapsed ? 64 : 240;
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("GkNqpF2P9xi5yYWtF3snCSnNrJnSvZ9qvGSpMhG764c");
    toast.success("Address copied to clipboard!");
  };

  const filteredBalances = allBalances.filter(b => {
    if (hideZeroBalance && b.balance === 0) return false;
    if (balanceSearch && !b.name.toLowerCase().includes(balanceSearch.toLowerCase())) return false;
    return true;
  });

  const renderContent = () => {
    switch (activeSection) {
      case "balance":
        return (
          <div className="space-y-4">
            {/* Balance Summary */}
            <div className="flex flex-wrap gap-4 sm:gap-8 p-4 rounded-xl bg-[#213744]">
              <div>
                <p className="text-xs text-muted-foreground">Total Balance</p>
                <p className="text-lg font-bold text-primary">₹0.00</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Deposit Balance</p>
                <p className="text-lg font-bold text-primary">₹0.00</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Bonus Balance</p>
                <p className="text-lg font-bold text-foreground">₹0.00</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                {/* <input
                  type="checkbox"
                  checked={hideZeroBalance}
                  onChange={(e) => setHideZeroBalance(e.target.checked)}
                  className="rounded border-border"
                /> */}
                <button
                  onClick={() => setHideZeroBalance(!hideZeroBalance)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 
    ${hideZeroBalance ? "bg-green-500" : "bg-gray-300"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 
      ${hideZeroBalance ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
                Hide 0 balance
              </label>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  value={balanceSearch}
                  onChange={(e) => setBalanceSearch(e.target.value)}
                  className="pl-10 bg-secondary border-border w-full sm:w-48"
                />
              </div>
            </div>

            {/* Cash Section */}
            <div>
              <h3 className="text-sm text-muted-foreground mb-2">Cash</h3>
              {filteredBalances.filter(b => b.type === "cash").map((balance) => (
                <div key={balance.id} className="flex items-center justify-between py-3 border-b border-border bg-[#213744] b-radius px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{balance.icon}</span>
                    <span className="font-medium">{balance.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">₹{balance.balance.toFixed(2)}</span>
                    <button className="text-primary text-sm hover:underline">Deposit</button>
                    <button className="text-primary text-sm hover:underline">Withdraw</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Crypto Section */}
            <div>
              <h3 className="text-sm text-muted-foreground mb-2">Crypto currency</h3>
              <div className="bg-[#213744] px-4 b-radius">
                {filteredBalances.filter(b => b.type === "crypto").map((balance) => (
                  <div key={balance.id} className="flex items-center justify-between py-3 border-b border-gray-600">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{balance.icon}</span>
                      <span className="font-medium">{balance.name}</span>
                      {balance.isLocked && <span className="text-xs text-muted-foreground">🔒</span>}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">₹{balance.balance.toFixed(2)}</span>
                      <button className="text-primary text-sm hover:underline">Deposit</button>
                      <button className="text-muted-foreground text-sm">Withdraw</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "deposit":
        return (
          <div className="space-y-4">
            {/* Crypto/Fiat Tabs */}
            <div className="flex rounded-lg overflow-hidden">
              <button
                onClick={() => setDepositTab("crypto")}
                className={cn(
                  "flex-1 py-2 text-sm font-medium transition-colors",
                  depositTab === "crypto" ? "bg-secondary text-foreground" : "bg-card text-muted-foreground"
                )}
              >
                Crypto
              </button>
              <button
                onClick={() => setDepositTab("fiat")}
                className={cn(
                  "flex-1 py-2 text-sm font-medium transition-colors",
                  depositTab === "fiat" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"
                )}
              >
                Fiat
              </button>
            </div>

            {depositTab === "crypto" ? (
              <div className="space-y-4">
                {/* Crypto Selection */}
                <div className="flex flex-wrap gap-2">
                  {cryptoCurrencies.slice(0, 7).map((crypto) => (
                    <button
                      key={crypto.id}
                      onClick={() => setSelectedCrypto(crypto.id)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-colors",
                        selectedCrypto === crypto.id
                          ? "bg-secondary text-foreground"
                          : "bg-card text-muted-foreground hover:bg-secondary/50"
                      )}
                    >
                      <span>{crypto.icon}</span>
                      <span>{crypto.name}</span>
                    </button>
                  ))}
                  <button className="flex items-center gap-2 px-3 py-2 rounded-full text-sm bg-card text-muted-foreground hover:bg-secondary/50">
                    More <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                <button className="text-primary text-sm hover:underline">
                  Didn't see your currency? Add here
                </button>

                {/* Currency and Network Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Deposit Currency</label>
                    <div className="flex items-center gap-2 px-4 py-3 bg-secondary rounded-lg">
                      <span>🟡</span>
                      <span className="font-medium">BC</span>
                    </div>
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

                <button className="text-primary text-sm hover:underline ml-auto block">
                  📘 How to deposit crypto?
                </button>

                {/* Bonus Banner */}
                <div className="flex items-center gap-3 p-2 bg-gradient-to-r from-amber-900/30 to-amber-800/20 rounded-xl">
                  <Gift className="w-8 h-8 text-yellow-500" />
                  <p className="text-sm">
                    Get extra <span className="text-primary font-bold">180%</span> bonus on minimum of{" "}
                    <span className="text-primary font-bold">694.57718 BC</span> deposit
                  </p>
                </div>

                {/* Deposit Address */}
                <div className="space-y-3">

                  <div className="flex items-center gap-3 p-4 bg-card rounded-xl">
                    <div className="w-24 h-24  flex items-center justify-center">
                      <img src={qrLogo} alt="qr logo" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Deposit address</label>
                      <div className="flex flex-row min-w-0 bg-[#242527] p-2 b-radius mb-2">
                        <p className="text-primary text-sm break-all font-mono">
                          GkNqpF2P9xi5yYWtF3snCSnNrJnSvZ9qvGSpMhG764c
                        </p>
                        <button
                          onClick={handleCopyAddress}
                          className=" pl-4 rounded-lg hover:bg-secondary transition-colors"
                        >
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-amber-900/20 rounded-lg text-amber-500 text-sm mb-2">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                        Please note that SOL addresses are case sensitive.
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-destructive/10 rounded-lg text-destructive text-sm">
                        <Info className="w-4 h-4 flex-shrink-0" />
                        Send only BC to this deposit address. Transfers below 100 BC will not be credited.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* 7-Day Guarantee Badge */}
                <div className="flex justify-end">
                  <span className="px-3 py-1.5 bg-amber-900/30 text-amber-500 text-xs rounded-full flex items-center gap-1">
                    🎁 7-Day Deposit Guarantee ℹ️
                  </span>
                </div>

                {/* Currency Selection */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Deposit Currency</span>
                  <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
                    <span>🇮🇳</span>
                    <span className="font-medium">INR</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Bonus Banner */}
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-900/30 to-amber-800/20 rounded-xl">
                  <Gift className="w-8 h-8 text-yellow-500" />
                  <p className="text-sm">
                    Get extra <span className="text-primary font-bold">180%</span> bonus on minimum of{" "}
                    <span className="text-primary font-bold">₹150.00</span> deposit
                  </p>
                </div>

                {/* Deposit Methods */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Deposit Method</span>
                    <button className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-sm">
                      Recommend <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  {fiatMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between p-4 bg-card rounded-xl hover:bg-secondary/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {method.badge && (
                          <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded">
                            {method.badge}
                          </span>
                        )}
                        <div className="w-16 h-10 bg-secondary rounded flex items-center justify-center text-2xl">
                          💳
                        </div>
                        <span className="font-medium">{method.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{method.range} ⓘ</span>
                    </div>
                  ))}

                  <button className="w-full py-2 text-sm text-muted-foreground hover:text-foreground">
                    View less
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case "withdraw":
        return (
          <div className="space-y-4">
            {/* Withdraw Currency */}
            <div className="relative">
              <label className="text-sm text-muted-foreground mb-2 block">Withdraw Currency</label>
              <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-2 px-4 py-2 bg-[#2a2f2f] rounded-lg border border-[#3a3f3f]"
              >
                <span className="text-lg">{selected.icon}</span>
                <span className="font-medium text-white">{selected.name}</span>
                <ChevronDown className={`w-4 h-4 ml-auto text-gray-400 transition ${open ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute left-0 top-full mt-2 w-full bg-[#242828] border border-[#3a3f3f] rounded-xl shadow-lg z-50">

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

            {/* Choose Network */}
            <div className="relative">
              <label className="text-sm text-muted-foreground mb-2 block">Choose CoinNetwork</label>
              <select
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
                className="w-full px-4 py-3 bg-secondary b-radius border border-border text-foreground 
               appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <div className="w-full px-4 py-3 bg-[#2a2f2f] border border-[#3a3f3f] b-radius text-white appearance-none cursor-pointer"
                >
                  {networks.map((network) => (
                    <option key={network.id} value={network.id} className="bg-[#242828] text-white">
                      {network.name}
                    </option>
                  ))}
                </div>
              </select>
              <span className="pointer-events-none absolute right-4 top-[38px] text-muted-foreground">
                <ChevronDown className="w-4 h-4 ml-auto text-gray-400 transition" />
              </span>
            </div>

            <button
              onClick={() => setOpenGuide(true)}
              className="text-primary text-sm hover:underline ml-auto block"
            >
              📘 How to Withdraw Crypto?
            </button>

            {/* Withdrawal Address */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Withdrawal Address (Note: Only Solana)
              </label>
              <div className="relative w-full">

                {/* Input */}
                <Input
                  value={withdrawAddress}
                  onChange={(e) => setWithdrawAddress(e.target.value)}
                  placeholder="Fill in carefully according to the specific currency"
                  className="bg-secondary border-primary/50 pr-10"
                />

                {/* Icon Button */}
                <button
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  📋
                </button>

                {/* Dropdown Panel */}
                <AnimatePresence>
                  {openDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -5, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-2 w-full bg-[#242828] border border-[#3a3f3f] rounded-lg shadow-lg z-20"
                    >
                      <div className="p-3 text-sm text-gray-300 flex items-center justify-between">
                        <button>Manage</button>
                        <span>No record yet</span>

                        <button
                          onClick={() => {
                            setOpenAddressModal(true);
                            setOpenDropdown(false);
                          }}
                          className="px-3 py-1 bg-green-500 text-black rounded-md text-xs font-medium hover:bg-green-400"
                        >
                          + Add
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Add Address Modal */}
              {openAddressModal && <AddAddressModal onClose={() => setOpenAddressModal(false)} />}

            </div>

            <div className="flex items-center gap-2 p-3 bg-amber-900/20 rounded-lg text-amber-500 text-sm">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              Please note that SOL addresses are case sensitive.
            </div>

            {/* Withdraw Amount */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-muted-foreground">Withdraw Amount</label>
                <span className="text-sm text-primary">Min: 2,083.4116 BC</span>
              </div>
              <Input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="0"
                className="bg-secondary border-border text-lg"
              />
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2">
              <button className="py-2 bg-secondary rounded-lg text-sm hover:bg-secondary/80">Min</button>
              <button className="py-2 bg-secondary rounded-lg text-sm hover:bg-secondary/80">25%</button>
              <button className="py-2 bg-secondary rounded-lg text-sm hover:bg-secondary/80">50%</button>
              <button className="py-2 bg-secondary rounded-lg text-sm hover:bg-secondary/80">Max</button>
            </div>

            <div className="flex justify-end">
              <span className="text-sm text-muted-foreground">Available: <span className="text-foreground">0</span></span>
            </div>

            {/* Preview Button */}
            <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              Preview
            </Button>

            {/* Warning */}
            <div className="flex items-center gap-2 p-3 bg-destructive/10 rounded-lg text-destructive text-sm">
              <Info className="w-4 h-4 flex-shrink-0" />
              For security purposes, large or suspicious withdrawal may take 1-6 hours for audit process. We appreciate your patience!
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="">
        <main
          className=""
        >
          <div className="px-3 lg:px-6 py-4 lg:py-5">
            <h1 className="text-xl font-bold text-foreground mb-4">WALLET</h1>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              {/* Sidebar Menu */}
              <div className="w-full lg:w-56 flex-shrink-0 bg-[#213744] p-2 b-radius">
                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
                  {walletMenuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        navigate(`/wallet/${item.id}`);
                      }}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                        activeSection === item.id
                          ? "bg-secondary text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-card b-radius p-4 lg:p-6">
                  {renderContent()}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
    </div>
  );
};

export default WalletPage;
