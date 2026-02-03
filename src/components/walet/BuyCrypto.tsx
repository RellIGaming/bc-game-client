import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const fiatList = [
  { id: "inr", name: "INR", icon: "₹" },
  { id: "usd", name: "USD", icon: "$" },
  { id: "eur", name: "EUR", icon: "€" },
];

const cryptoList = [
  { id: "usdt", name: "USDT", icon: "🪙" },
  { id: "btc", name: "BTC", icon: "₿" },
  { id: "eth", name: "ETH", icon: "♦" },
];

export default function BuyCrypto({ openModal }) {
  const [amount, setAmount] = useState("2200");

  const [selectedFiat, setSelectedFiat] = useState(fiatList[0]);
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoList[0]);

  const [openFiat, setOpenFiat] = useState(false);
  const [openCrypto, setOpenCrypto] = useState(false);

  const [searchFiat, setSearchFiat] = useState("");
  const [searchCrypto, setSearchCrypto] = useState("");

  const filteredFiat = fiatList.filter((f) =>
    f.name.toLowerCase().includes(searchFiat.toLowerCase())
  );

  const filteredCrypto = cryptoList.filter((c) =>
    c.name.toLowerCase().includes(searchCrypto.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* PAY WITH */}
      <div>
        <p className="text-sm text-muted-foreground mb-2">You pay with</p>

        <div className="flex gap-2 w-full">
          {/* AMOUNT INPUT */}
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 min-w-0 px-4 py-2 bg-secondary rounded-lg text-xs font-semibold outline-none"
          />

          {/* FIAT DROPDOWN */}
          <div className="relative shrink-0">
            <button
              onClick={() => {
                setOpenFiat(!openFiat);
                setOpenCrypto(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-xs bg-secondary rounded-lg whitespace-nowrap"
            >
              <span>{selectedFiat.icon}</span>
              <span>{selectedFiat.name}</span>
              <ChevronDown size={16} />
            </button>

            {openFiat && (
              <DropdownModal
                search={searchFiat}
                setSearch={setSearchFiat}
                list={filteredFiat}
                onSelect={(item) => {
                  setSelectedFiat(item);
                  setOpenFiat(false);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* ESTIMATE OBTAIN */}
      <div>
        <p className="text-sm text-muted-foreground mb-2">
          Estimate to obtain
        </p>

        <div className="flex gap-2">
          <input
            value="21.41"
            disabled
            className="flex-1 px-4 py-2 text-xs bg-secondary rounded-lg font-semibold"
          />

          {/* CRYPTO DROPDOWN */}
          <div className="relative shrink-0">
            <button
              onClick={() => {
                setOpenCrypto(!openCrypto);
                setOpenFiat(false);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-xs whitespace-nowrap"
            >
              <span>{selectedCrypto.icon}</span>
              <span>{selectedCrypto.name}</span>
              <ChevronDown size={16} />
            </button>

            {openCrypto && (
              <DropdownModal
                search={searchCrypto}
                setSearch={setSearchCrypto}
                list={filteredCrypto}
                onSelect={(item) => {
                  setSelectedCrypto(item);
                  setOpenCrypto(false);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="border-t border-border pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Estimate Total (including fee)
          </span>
          <span className="font-semibold">
            {amount} {selectedFiat.name}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Estimate to obtain</span>
          <span className="text-green-400 font-semibold">
            21.41 {selectedCrypto.name}
          </span>
        </div>
      </div>

      {/* INFO BOX */}
      <div className="bg-green-500/10 text-green-400 p-3 rounded-lg text-sm">
        Depending on the blockchain, the deposit may take a few minutes to 1
        hour to arrive.
      </div>

      {/* DISCLAIMER */}
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" defaultChecked />
        I have read and agree to the disclaimer.
      </label>

      {/* BUTTON */}
      <button  onClick={openModal} className="w-full bg-primary text-black font-semibold py-2 rounded-lg hover:opacity-90">
        Buy Crypto
      </button>
    </div>
  );
}

/* ---------------- DROPDOWN MODAL ---------------- */

function DropdownModal({ search, setSearch, list, onSelect }) {
  return (
    <div className="absolute right-0 top-full mt-2 w-52 bg-card border border-border rounded-xl shadow-xl z-50">
      <div className="p-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
          <Search size={16} />
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-xs"
          />
        </div>
      </div>

      <div className="max-h-48 overflow-y-auto">
        {list.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full flex items-center gap-2 px-4 py-2 text-xs hover:bg-secondary/50"
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
