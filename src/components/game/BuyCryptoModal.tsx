import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Menu,
  Globe,
  FileText,
  Shield,
  HelpCircle,
  Moon,
  ChevronDown,
  ChevronRight,
  Search,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";
// Fiat currencies
const fiatCurrencies = [
  { id: "inr", name: "INR", icon: "🇮🇳" },
  { id: "usd", name: "USD", icon: "🇺🇸" },
  { id: "eur", name: "EUR", icon: "🇪🇺" },
  { id: "gbp", name: "GBP", icon: "🇬🇧" },
  { id: "jpy", name: "JPY", icon: "🇯🇵" },
  { id: "dkk", name: "DKK", icon: "🇩🇰" },
  { id: "ghs", name: "GHS", icon: "🇬🇭" },
  { id: "idr", name: "IDR", icon: "🇮🇩" },
];
// Crypto currencies
const cryptoCurrencies = [
  { id: "usdt", name: "USDT", icon: "🟢", balance: 0 },
  { id: "eth", name: "ETH", icon: "🔵", balance: 0 },
  { id: "btc", name: "BTC", icon: "🟠", balance: 0 },
  { id: "trx", name: "TRX", icon: "🔴", balance: 0 },
  { id: "uni", name: "UNI", icon: "🩷", balance: 0 },
  { id: "wbtc", name: "WBTC", icon: "🟡", balance: 0 },
  { id: "xlm", name: "XLM", icon: "⚪", balance: 0 },
];
// Languages
const languages = [
  { id: "en", name: "English" },
  { id: "fr", name: "French (Français)" },
  { id: "de", name: "German (Deutsch)" },
  { id: "nl", name: "Dutch (Nederlands)" },
  { id: "hi", name: "Hindi (हिन्दी)" },
  { id: "es", name: "Spanish (Español)" },
];
// Support providers
const supportProviders = [
  { id: "alchemy", name: "Alchemy Pay Support", icon: "🔵" },
  { id: "banxa", name: "Banxa Support", icon: "🟢" },
  { id: "binance", name: "Binance Connect Support", icon: "🟡" },
  { id: "binance-p2p", name: "Binance P2P Support", icon: "🟡" },
];
interface BuyCryptoModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const BuyCryptoModal = ({ isOpen, onClose }: BuyCryptoModalProps) => {
  const [payAmount, setPayAmount] = useState("2200");
  const [receiveAmount, setReceiveAmount] = useState("21.4");
  const [selectedFiat, setSelectedFiat] = useState(fiatCurrencies[0]);
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoCurrencies[0]);
  const [showFiatDropdown, setShowFiatDropdown] = useState(false);
  const [showCryptoDropdown, setShowCryptoDropdown] = useState(false);
  const [fiatSearch, setFiatSearch] = useState("");
  const [cryptoSearch, setCryptoSearch] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  // Drawer state
  const [showDrawer, setShowDrawer] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [langSearch, setLangSearch] = useState("");
  const filteredFiat = fiatCurrencies.filter((c) =>
    c.name.toLowerCase().includes(fiatSearch.toLowerCase())
  );
  const filteredCrypto = cryptoCurrencies.filter((c) =>
    c.name.toLowerCase().includes(cryptoSearch.toLowerCase())
  );
  const filteredLanguages = languages.filter((l) =>
    l.name.toLowerCase().includes(langSearch.toLowerCase())
  );
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full h-70vh max-w-lg bg-card rounded-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-secondary">
            <span className="text-lg font-semibold">Onramper</span>
            <button onClick={onClose} className="p-2 rounded-lg bg-muted hover:bg-muted/80">
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Inner Card */}
          <div className="m-4 bg-white rounded-xl text-black overflow-hidden">
            {/* Inner Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                  ₿
                </div>
                <span className="font-semibold">Buy crypto</span>
              </div>
              <button onClick={() => setShowDrawer(true)} className="p-2 hover:bg-gray-100 rounded-lg">
                <Menu className="w-5 h-5" />
              </button>
            </div>
            {/* Content */}
            <div className="p-4 space-y-4">
              {/* You pay with */}
              <div>
                <label className="text-sm text-gray-500">You spend</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    className="flex-1 text-2xl font-semibold bg-transparent outline-none"
                  />
                  <div className="relative">
                    <button
                      onClick={() => setShowFiatDropdown(!showFiatDropdown)}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full"
                    >
                      <span>{selectedFiat.icon}</span>
                      <span className="font-medium">{selectedFiat.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {showFiatDropdown && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-xl shadow-xl z-10">
                        <div className="p-2">
                          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                            <Search className="w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search"
                              value={fiatSearch}
                              onChange={(e) => setFiatSearch(e.target.value)}
                              className="flex-1 bg-transparent outline-none text-sm"
                            />
                          </div>
                        </div>
                        <div className="max-h-48 overflow-y-auto">
                          {filteredFiat.map((currency) => (
                            <button
                              key={currency.id}
                              onClick={() => {
                                setSelectedFiat(currency);
                                setShowFiatDropdown(false);
                              }}
                              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                            >
                              <div className="flex items-center gap-2">
                                <span>{currency.icon}</span>
                                <span>{currency.name}</span>
                              </div>
                              {selectedFiat.id === currency.id && (
                                <div className="w-4 h-4 rounded-full bg-green-500" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Divider */}
              <div className="border-t border-gray-200" />
              {/* You get */}
              <div>
                <label className="text-sm text-gray-500">You get</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={receiveAmount}
                    onChange={(e) => setReceiveAmount(e.target.value)}
                    className="flex-1 text-2xl font-semibold bg-transparent outline-none"
                  />
                  <div className="relative">
                    <button
                      onClick={() => setShowCryptoDropdown(!showCryptoDropdown)}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full"
                    >
                      <span>{selectedCrypto.icon}</span>
                      <span className="font-medium">{selectedCrypto.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {showCryptoDropdown && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white border rounded-xl shadow-xl z-10">
                        <div className="p-2">
                          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                            <Search className="w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search"
                              value={cryptoSearch}
                              onChange={(e) => setCryptoSearch(e.target.value)}
                              className="flex-1 bg-transparent outline-none text-sm"
                            />
                          </div>
                        </div>
                        <div className="max-h-48 overflow-y-auto">
                          {filteredCrypto.map((currency) => (
                            <button
                              key={currency.id}
                              onClick={() => {
                                setSelectedCrypto(currency);
                                setShowCryptoDropdown(false);
                              }}
                              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                            >
                              <div className="flex items-center gap-2">
                                <span>{currency.icon}</span>
                                <span>{currency.name}</span>
                              </div>
                              <div className="text-right text-sm">
                                <div>₹{currency.balance.toFixed(2)}</div>
                                <div className="text-gray-400">{currency.balance}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-400 mt-1">◆ Ethereum</div>
              </div>
              {/* Warning */}
              <div className="text-sm text-red-500">
                No payment methods available. Please select a different fiat currency
              </div>
              {/* Pay using */}
              <div>
                <label className="text-sm text-gray-500">Pay using</label>
              </div>
              {/* Buy button */}
              <button
                disabled={!agreeToTerms}
                className="w-full py-3 bg-gray-200 text-gray-500 rounded-xl font-medium"
              >
                Buy {selectedCrypto.name}
              </button>
            </div>
            {/* Footer */}

          </div>
          <div className="px-4 pb-4 text-center">
            <button className="text-sm text-gray-500 hover:text-gray-700">
              Content not loading? Click Here ↗
            </button>
          </div>
          {/* Settings Drawer */}
          <AnimatePresence>
            {showDrawer && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50"
                onClick={() => setShowDrawer(false)}
              >
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25 }}
                  className="absolute right-0 top-0 bottom-0 w-80 bg-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Drawer Header */}
                  <div className="flex items-center justify-end p-4">
                    <button
                      onClick={() => setShowDrawer(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  {/* Drawer Content */}
                  <div className="px-4 space-y-2">
                    {/* Language */}
                    <button
                      onClick={() => setShowLanguageModal(true)}
                      className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-800">Language</span>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </button>
                    {/* Privacy Policy */}
                    <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-800">Privacy Policy</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                    {/* Terms of Usage */}
                    <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-800">Terms of Usage</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                    {/* Help & Support */}
                    <div>
                      <button
                        onClick={() => setShowHelpDropdown(!showHelpDropdown)}
                        className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <HelpCircle className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-800">Help & Support</span>
                        </div>
                        <ChevronDown className={cn(
                          "w-5 h-5 text-gray-400 transition-transform",
                          showHelpDropdown && "rotate-180"
                        )} />
                      </button>
                      <AnimatePresence>
                        {showHelpDropdown && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 py-2 bg-gray-50 rounded-lg mx-4 mb-2">
                              <p className="text-xs text-gray-500 mb-3">
                                <strong>Note:</strong> All providers below are supported by Onramper, but token,
                                payment method and fiat currency support may vary per provider.
                              </p>
                              {supportProviders.map((provider) => (
                                <button
                                  key={provider.id}
                                  className="w-full flex items-center gap-3 py-2 hover:bg-gray-100 rounded-lg px-2"
                                >
                                  <span>{provider.icon}</span>
                                  <span className="text-sm text-gray-700">{provider.name}</span>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {/* Dark Mode */}
                    <div className="flex items-center justify-between px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Moon className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-800">Dark Mode</span>
                      </div>
                      <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={cn(
                          "relative w-12 h-6 rounded-full transition-colors",
                          isDarkMode ? "bg-green-500" : "bg-gray-300"
                        )}
                      >
                        <div
                          className={cn(
                            "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                            isDarkMode ? "right-1" : "left-1"
                          )}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Language Modal */}
          <AnimatePresence>
            {showLanguageModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 flex items-center justify-center"
                onClick={() => setShowLanguageModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="w-80 bg-white rounded-xl overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b">
                    <span className="font-semibold text-gray-800">Choose language</span>
                    <button
                      onClick={() => setShowLanguageModal(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg mb-4">
                      <Search className="w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search"
                        value={langSearch}
                        onChange={(e) => setLangSearch(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-sm text-gray-800"
                      />
                    </div>
                    <div className="space-y-1 max-h-64 overflow-y-auto">
                      {filteredLanguages.map((lang) => (
                        <button
                          key={lang.id}
                          onClick={() => {
                            setSelectedLanguage(lang.id);
                            setShowLanguageModal(false);
                          }}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg"
                        >
                          <span className="text-gray-800">{lang.name}</span>
                          {selectedLanguage === lang.id && (
                            <Check className="w-5 h-5 text-gray-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
export default BuyCryptoModal;