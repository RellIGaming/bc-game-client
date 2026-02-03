import { useState, useMemo } from "react";
import { ArrowUpDown, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
const cryptoCurrencies = [
  { id: "usdt", name: "USDT", icon: "🟢", balance: 0 },
  { id: "eth", name: "ETH", icon: "🔵", balance: 0 },
  { id: "btc", name: "BTC", icon: "🟠", balance: 0 },
  { id: "bnb", name: "BNB", icon: "🟡", balance: 0 },
  { id: "trx", name: "TRX", icon: "🔴", balance: 0 },
  { id: "wbnb", name: "WBNB", icon: "🟡", balance: 0 },
  { id: "sol", name: "SOL", icon: "🟣", balance: 0 },
];
const SwapSection = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USDT");
  const [toCurrency, setToCurrency] = useState("BCD");

  const percentages = [25, 50, 75, 100];
  return (
    <div className="space-y-6">

        {/* FROM */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">From</span>
          <span className="text-sm text-gray-400">≈ ₹0.00</span>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Input */}
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder="0"
            className="flex-1 bg-secondary rounded-lg px-4 py-2 text-white text-lg outline-none"
          />

          {/* Currency */}
          <button className="flex items-center justify-center gap-2 bg-secondary px-4 py-2 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="font-semibold text-xs">{fromCurrency}</span>
            <span>▾</span>
          </button>
        </div>

        {/* Percentage Buttons */}
        <div className="grid grid-cols-4 gap-2 mt-3">
          {percentages.map((p) => (
            <button
              key={p}
              className="bg-secondary py-2 rounded-lg text-sm hover:bg-[#30363a]"
            >
              {p}%
            </button>
          ))}
        </div>

        {/* SWAP ICON */}
        <div className="flex justify-center my-5">
          <button className="bg-secondary p-3 rounded-lg hover:bg-[#30363a]">
            <ArrowUpDown className="w-5 h-5 text-green-400" />
          </button>
        </div>

        {/* TO */}
        <span className="text-sm text-gray-400">To</span>

        <div className="flex flex-col md:flex-row gap-3 mt-2">
          <input
            type="number"
            value={toAmount}
            onChange={(e) => setToAmount(e.target.value)}
            placeholder="0"
            className="flex-1 bg-secondary rounded-lg px-4 py-2 text-white text-lg outline-none"
          />

          <button className="flex items-center justify-center gap-2 bg-[#202427] px-4 py-2 rounded-lg">
            <div className="w-3 h-3 bg-green-400 rounded-full" />
            <span className="font-semibold text-xs">{toCurrency}</span>
            <span>▾</span>
          </button>
        </div>

        {/* BALANCES */}
        <div className="flex justify-between text-sm text-gray-400 mt-4">
          <span>Deposit Balance: 0</span>
          <span>Bonus Balance: 0</span>
        </div>

        {/* DETAILS */}
        <div className="mt-6 space-y-3 text-sm">

          <div className="flex justify-between text-gray-400">
            <span>Rate</span>
            <span className="text-primary">1 USDT ≈ 1 BCD</span>
          </div>

          <div className="flex justify-between text-gray-400">
            <span>Estimated Time</span>
            <span className="text-white">30 Seconds</span>
          </div>

          <div className="flex justify-between text-gray-400">
            <span>Swap fee</span>
            <span className="text-white">0 USDT</span>
          </div>

        </div>

        {/* SWAP BUTTON */}
        <button className="w-full bg-primary hover:bg-green-600 mt-2 py-2 rounded-lg font-semibold">
          Swap Now
        </button>
      </div>
    

  );
};
export default SwapSection;