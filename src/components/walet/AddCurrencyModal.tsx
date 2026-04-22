import { X, ArrowLeft, Search } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useMemo } from "react";

type Currency = {
  id: string;
  name: string;
  fullName: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (currency: Currency) => void;
};

const fiatList: Currency[] = [
  { id: "usd", name: "USD", fullName: "US Dollar" },
  { id: "eur", name: "EUR", fullName: "Euro" },
  { id: "gbp", name: "GBP", fullName: "British Pound" },
  { id: "inr", name: "INR", fullName: "Indian Rupee" },
  { id: "bdt", name: "BDT", fullName: "Bangladeshi Taka" },
  { id: "pkr", name: "PKR", fullName: "Pakistani Rupee" },
  { id: "jpy", name: "JPY", fullName: "Japanese Yen" },
  { id: "cny", name: "CNY", fullName: "Chinese Yuan" },
  { id: "krw", name: "KRW", fullName: "South Korean Won" },
  { id: "try", name: "TRY", fullName: "Turkish Lira" },
  { id: "brl", name: "BRL", fullName: "Brazilian Real" },
  { id: "aud", name: "AUD", fullName: "Australian Dollar" },
  { id: "cad", name: "CAD", fullName: "Canadian Dollar" },
  { id: "sgd", name: "SGD", fullName: "Singapore Dollar" },
  { id: "aed", name: "AED", fullName: "UAE Dirham" },
  { id: "php", name: "PHP", fullName: "Philippine Peso" },
  { id: "thb", name: "THB", fullName: "Thai Baht" },
  { id: "vnd", name: "VND", fullName: "Vietnamese Dong" },
  { id: "idr", name: "IDR", fullName: "Indonesian Rupiah" },
  { id: "myr", name: "MYR", fullName: "Malaysian Ringgit" },
];

const cryptoCurrencies: Currency[] = [
  { id: "btc", name: "BTC", fullName: "Bitcoin" },
  { id: "eth", name: "ETH", fullName: "Ethereum" },
  { id: "usdt", name: "USDT", fullName: "Tether" },
  { id: "usdc", name: "USDC", fullName: "USD Coin" },
  { id: "bnb", name: "BNB", fullName: "BNB" },
  { id: "sol", name: "SOL", fullName: "Solana" },
  { id: "doge", name: "DOGE", fullName: "Dogecoin" },
  { id: "trx", name: "TRX", fullName: "Tron" },
  { id: "xrp", name: "XRP", fullName: "Ripple" },
  { id: "ltc", name: "LTC", fullName: "Litecoin" },
  { id: "ada", name: "ADA", fullName: "Cardano" },
];

const Content = ({ onClose, isMobile, onSelect }: { onClose: () => void; isMobile: boolean; onSelect: Props["onSelect"] }) => {
  const [search, setSearch] = useState("");

  const filteredFiat = fiatList.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.fullName.toLowerCase().includes(search.toLowerCase())
  );
  const filteredCrypto = cryptoCurrencies.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full max-h-[80vh]">
      {isMobile ? (
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <button onClick={onClose}><ArrowLeft className="w-5 h-5" /></button>
          <h3 className="font-semibold">Select Currency</h3>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold">Select Currency</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
      )}

      <div className="p-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search currency" className="w-full bg-transparent outline-none text-sm" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {filteredFiat.length > 0 && (
          <>
            <p className="text-xs text-muted-foreground px-3 mb-1">Cash</p>
            {filteredFiat.map((item) => (
              <button key={item.id} onClick={() => { onSelect(item); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary transition">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">{item.name[0]}</span>
                <span className="text-sm font-medium">{item.name} - {item.fullName}</span>
              </button>
            ))}
          </>
        )}
        {filteredCrypto.length > 0 && (
          <>
            <p className="text-xs text-muted-foreground px-3 mt-3 mb-1">Crypto</p>
            {filteredCrypto.map((item) => (
              <button key={item.id} onClick={() => { onSelect(item); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary transition">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">{item.name[0]}</span>
                <span className="text-sm font-medium">{item.name} - {item.fullName}</span>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default function AddCurrencyModal({ open, onClose, onSelect }: Props) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0">
          <Content onClose={onClose} isMobile onSelect={onSelect} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 max-h-[80vh]">
        <Content onClose={onClose} isMobile={false} onSelect={onSelect} />
      </DialogContent>
    </Dialog>
  );
}
