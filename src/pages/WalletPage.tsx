import { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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
import { toast } from "sonner";
import TransactionSection from "@/components/walet/TransactionSection";
import VaultProSection from "@/components/walet/VaultProSection";
import SwapSection from "@/components/walet/SwapSection";
import BuyCryptoModal from "@/components/game/BuyCryptoModal";
import Rollover from "@/components/walet/Rollover";
import BetHistory from "@/components/walet/BetHistory";
import Withdraw from "@/components/walet/Withdraw";
import Deposit from "@/components/walet/Deposit";
import Balance from "@/components/walet/Balance";
import BuyCrypto from "@/components/walet/BuyCrypto";

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
// Networks for deposit
const networks = [
  { id: "solana", name: "Solana" },
  { id: "ethereum", name: "Ethereum" },
  { id: "bsc", name: "BSC" },
  { id: "polygon", name: "Polygon" },
  { id: "tron", name: "Tron" },
];

interface WalletPageProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const WalletPage = ({ isLoggedIn, setIsLoggedIn }: WalletPageProps) => {
 
  const { section } = useParams();
  const navigate = useNavigate();
  
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState(section || "deposit");
 
 
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [hideZeroBalance, setHideZeroBalance] = useState(false);
  const [balanceSearch, setBalanceSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(allBalances[2]);
  const dropdownRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  
  // Buy Crypto Modal
  const [showBuyCryptoModal, setShowBuyCryptoModal] = useState(false);

  const filtered = useMemo(() => {
    return allBalances.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const cashList = filtered.filter((i) => i.type === "cash");
  const cryptoList = filtered.filter((i) => i.type === "crypto");
  useEffect(() => {
    if (section) {
      setActiveSection(section);
    }
  }, [section]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
 
  const handleSectionChange = (sectionId: string) => {
  setActiveSection(sectionId);
  navigate(`/wallet/${sectionId}`);
};

  const renderContent = () => {
    switch (activeSection) {
      case "balance":
        return <Balance/>;
      case "deposit":
        return <Deposit/>;
      case "withdraw":
        return <Withdraw/>;
      case "buy-crypto":
        return (<BuyCrypto openModal={() => setShowBuyCryptoModal(true)} />);
      case "swap":
        return <SwapSection />;
      case "vault-pro":
        return <VaultProSection />;
      case "transaction":
        return <TransactionSection  />;
      case "rollover":
        return <Rollover  />;
      case "bet-history":
        return <BetHistory />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 ">
        <h1 className="text-xl font-bold mb-4 hidden md:block">WALLET</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Menu */}
          <div className="lg:w-64 shrink-0 bg-card rounded-lg hidden md:block">
            <div className={cn(
              "flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0",
              isMobile && "flex-nowrap"
            )}>
              {walletMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                    activeSection === item.id
                      ? "bg-secondary text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* <div className="bg-card rounded-lg p-4"> */}
            <div className="">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
      {/* Buy Crypto Modal */}
      <BuyCryptoModal
        isOpen={showBuyCryptoModal}
        onClose={() => setShowBuyCryptoModal(false)}
      />
    </div>
  );
};
export default WalletPage;