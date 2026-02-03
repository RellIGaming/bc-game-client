import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ChevronDown, Info, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import AddAddressModal from '../game/AddAddressModal';
import WithdrawGuideModal from '../game/WithdrawGuideModal';
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
const Withdraw = () => {
    const [open, setOpen] = useState(false);
    const [openGuide, setOpenGuide] = useState(false);
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(allBalances[2]);
    const [depositTab, setDepositTab] = useState<"crypto" | "fiat">("crypto");
    const [selectedCrypto, setSelectedCrypto] = useState("bc");
    const [selectedNetwork, setSelectedNetwork] = useState("solana");
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [withdrawAddress, setWithdrawAddress] = useState("");
    const [openDropdown, setOpenDropdown] = useState(false);

    const filtered = useMemo(() => {
        return allBalances.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);
    const cashList = filtered.filter((i) => i.type === "cash");
    const cryptoList = filtered.filter((i) => i.type === "crypto");
    return (
        <>
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
            <WithdrawGuideModal
                open={openGuide}
                onClose={() => setOpenGuide(false)}
            />
        </>
    );
};

export default Withdraw;