import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, DollarSign, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface LanguageCurrencyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const languages = [
    { code: "en", name: "English" },
    { code: "in", name: "Indian English" },
    { code: "vi", name: "Tiếng việt" },
    { code: "id", name: "Indonesian" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "pt", name: "Português" },
    { code: "de", name: "Deutsch" },
    { code: "ru", name: "Русский" },
    { code: "zh", name: "中文" },
    { code: "ar", name: "العربية" },
    { code: "hi", name: "हिन्दी" },
    { code: "tr", name: "Türkçe" },
    { code: "th", name: "ไทย" },
];

const currencies = [
    { code: "none", name: "None", icon: "◎", color: "text-primary" },
    { code: "usd", name: "USD", icon: "$", color: "text-green-500" },
    { code: "brl", name: "BRL", icon: "R$", color: "text-green-400" },
    { code: "inr", name: "INR", icon: "₹", color: "text-orange-500" },
    { code: "eur", name: "EUR", icon: "€", color: "text-blue-500" },
    { code: "gbp", name: "GBP", icon: "£", color: "text-purple-500" },
    { code: "jpy", name: "JPY", icon: "¥", color: "text-red-500" },
    { code: "cny", name: "CNY", icon: "¥", color: "text-yellow-500" },
    { code: "krw", name: "KRW", icon: "₩", color: "text-blue-400" },
    { code: "rub", name: "RUB", icon: "₽", color: "text-red-400" },
];

const LanguageCurrencyModal = ({ isOpen, onClose }: LanguageCurrencyModalProps) => {
    const [activeTab, setActiveTab] = useState<"language" | "currency">("language");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const [selectedCurrency, setSelectedCurrency] = useState("none");

    const filteredLanguages = useMemo(() => {
        if (!searchQuery.trim()) return languages;
        const query = searchQuery.toLowerCase();
        return languages.filter(
            (lang) =>
                lang.name.toLowerCase().includes(query) ||
                lang.code.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const filteredCurrencies = useMemo(() => {
        if (!searchQuery.trim()) return currencies;
        const query = searchQuery.toLowerCase();
        return currencies.filter(
            (curr) =>
                curr.name.toLowerCase().includes(query) ||
                curr.code.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const handleTabChange = (tab: "language" | "currency") => {
        setActiveTab(tab);
        setSearchQuery("");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md bg-card rounded-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="relative p-4 pb-0">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>

                            {/* Tabs */}
                            <div className="relative flex border-b border-border">
                                <button
                                    onClick={() => handleTabChange("language")}
                                    className={cn(
                                        "flex-1 py-3 text-sm font-medium relative z-10",
                                        activeTab === "language"
                                            ? "text-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    Language
                                </button>

                                <button
                                    onClick={() => handleTabChange("currency")}
                                    className={cn(
                                        "flex-1 py-3 text-sm font-medium relative z-10",
                                        activeTab === "currency"
                                            ? "text-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    View in currency
                                </button>

                                {/* Smooth indicator */}
                                <motion.div
                                    layout
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className={cn(
                                        "absolute bottom-0 h-0.5 bg-primary",
                                        activeTab === "language" ? "left-0 w-1/2" : "left-1/2 w-1/2"
                                    )}
                                />
                            </div>

                        </div>

                        {/* Content */}
                        <div className="p-4">
                            {/* {activeTab === "currency" && (
                                <p className="text-sm text-muted-foreground mb-4">
                                    Select the desired currency to display. The Currencies will be shown in approximated values.
                                </p>
                            )} */}

                            {/* Search */}
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search"
                                    className="bg-secondary border-border h-9 pl-10"
                                />
                            </div>

                            {/* List */}
                            <div className="max-h-80 overflow-y-auto scrollbar-hide space-y-1">
                                {activeTab === "language" ? (
                                    filteredLanguages.length > 0 ? (
                                        filteredLanguages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => setSelectedLanguage(lang.code)}
                                                className={cn(
                                                    "w-full flex items-center justify-between px-4 py-2 rounded-sm transition-colors",
                                                    selectedLanguage === lang.code
                                                        ? "bg-secondary"
                                                        : "hover:bg-secondary/50"
                                                )}
                                            >
                                                <span className="text-sm text-foreground">{lang.name}</span>
                                                {selectedLanguage === lang.code && (
                                                    <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                                    </div>
                                                )}
                                            </button>
                                        ))
                                    ) : (
                                        <p className="text-center text-sm text-muted-foreground py-4">
                                            No languages found
                                        </p>
                                    )
                                ) : (
                                    <>
                                        {filteredCurrencies.length > 0 ? (
                                            filteredCurrencies.map((curr) => (
                                                <div key={curr.code}>
                                                    <button
                                                        onClick={() => setSelectedCurrency(curr.code)}
                                                        className={cn(
                                                            "w-full flex items-center justify-between px-3 py-1 rounded-sm transition-colors",
                                                            selectedCurrency === curr.code
                                                                ? "bg-secondary"
                                                                : "hover:bg-secondary/50"
                                                        )}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span className={cn("text-lg font-medium", curr.color)}>
                                                                {curr.icon}
                                                            </span>
                                                            <span className="text-sm text-foreground">{curr.name}</span>
                                                        </div>
                                                        {selectedCurrency === curr.code && (
                                                            <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                                            </div>
                                                        )}
                                                    </button>
                                                    {/* {curr.code === "none" && selectedCurrency === "none" && (
                            <div className="mx-4 mb-2 p-3 bg-primary/10 rounded-lg flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-muted-foreground">
                                When none is selected, some amounts are still displayed in the last selected fiat currency.(USD)
                              </p>
                            </div>
                          )} */}
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center text-sm text-muted-foreground py-4">
                                                No currencies found
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LanguageCurrencyModal;
