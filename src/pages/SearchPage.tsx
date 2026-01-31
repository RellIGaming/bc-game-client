import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { allGames, categories } from "@/components/layout/SearchModal";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import LanguageCurrencyModal from "@/components/layout/LanguageCurrencyModal";
import SignUpModal from "@/components/auth/SignUpModal";
import SignInModal from "@/components/auth/SignInModal";
import ResetPasswordModal from "@/components/auth/ResetPasswordModal";

interface searchPageProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const SearchPage = ({ isLoggedIn, setIsLoggedIn }: searchPageProps) => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("casino");
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingGameId, setPendingGameId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("Popular");
  const [provider, setProvider] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Filter games
  const filteredGames = useMemo(() => {
    let games = allGames;

    if (activeCategory !== "all") {
      games = games.filter((game) => game.category === activeCategory);
    }

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      games = games.filter((game) =>
        game.name.toLowerCase().includes(searchLower)
      );
    }

    if (sortBy === "Popular") {
      games = [...games].sort((a, b) => b.players - a.players);
    }

    return games;
  }, [search, activeCategory, sortBy]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };
  const toggleTheme = () => setIsDark(!isDark);
  const handleSwitchToSignIn = () => { setSignUpOpen(false); setSignInOpen(true); };
  const handleSwitchToSignUp = () => { setSignInOpen(false); setSignUpOpen(true); };
  const handleForgotPassword = () => { setSignInOpen(false); setResetPasswordOpen(true); };
  const handleBackToLogin = () => { setResetPasswordOpen(false); setSignInOpen(true); };
  const getMainMargin = () => {
    if (isMobile) return 0;
    if (!sidebarOpen) return 0;
    return sidebarCollapsed ? 64 : 240;
  };

  // Handle login success - navigate to pending game
  const handleLoginSuccess = (value: boolean) => {
    setIsLoggedIn(value);
    setSignInOpen(false);
    if (pendingGameId && value) {
      navigate(`/game/${pendingGameId}`);
      setPendingGameId(null);
    }
  };
  const onSearchClick = () => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      navigate("/search");
    } else {
      setSearchOpen(true);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <main
      >
        <div className="min-h-screen bg-background flex flex-col">
          {/* ✅ PAGE HEADER (Header/Footer NOT hidden) */}
          <div className="sticky top-0 z-20 bg-background border-b border-border">
            <div className="flex items-center gap-3 p-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-secondary"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold">Search Games</h2>
            </div>

            {/* ✅ Search Bar */}
            <div className="px-3 pb-3">
              <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2">
                <Search className="w-5 h-5 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search games..."
                  className="bg-transparent border-none focus-visible:ring-0"
                />
              </div>
            </div>

            {/* ✅ Categories */}
            <div className="px-3 pb-3 overflow-x-auto scrollbar-hide">
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap",
                      activeCategory === cat.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ✅ CONTENT */}
          <div className="flex-1 overflow-y-auto px-3 py-3">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner size="lg" />
              </div>
            ) : filteredGames.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {filteredGames.map((game) => (
                  <div
                    key={game.id}
                    className="relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={game.image}
                      alt={game.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {game.multiplier && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                        {game.multiplier}
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <h3 className="text-white text-xs font-semibold truncate">
                        {game.name}
                      </h3>
                      <p className="text-white/70 text-[10px]">
                        👥 {game.players}
                      </p>
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <span className="text-4xl mb-3">🔍</span>
                <p className="text-muted-foreground">No games found</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
