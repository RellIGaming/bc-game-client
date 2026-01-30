import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/home/Footer";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import SportsCategoryTabs from "@/components/sports/SportsCategoryTabs";
import { BetSlip } from "@/components/sports/BetSlip";
import { SportsTabs } from "@/components/sports/SportsTabs";
import { Search } from "lucide-react";
import { HighlightsTab } from "@/components/sports/HighlightsTab";
import { EventBuilderTab } from "@/components/sports/EventBuilderTab";
import { BetsFeedTab } from "@/components/sports/BetsFeedTab";
import { BetItem, TabType } from "@/types/sports";
import MobileNav from "@/components/layout/MobileNav";
import SearchModal from "@/components/layout/SearchModal";
import LanguageCurrencyModal from "@/components/layout/LanguageCurrencyModal";
import SignUpModal from "@/components/auth/SignUpModal";
import SignInModal from "@/components/auth/SignInModal";
import ResetPasswordModal from "@/components/auth/ResetPasswordModal";

interface SportsPageProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const SportsPage = ({ isLoggedIn, setIsLoggedIn }: SportsPageProps) => {
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
  const [isMobile, setIsMobile] = useState(false);
  const toggleTheme = () => setIsDark(!isDark);
  const [showSearch, setShowSearch] = useState(false);
  const [pendingGameId, setPendingGameId] = useState<number | null>(null);
const [activeTab, setActiveTab] = useState("sports");
 const handleSwitchToSignIn = () => { setSignUpOpen(false); setSignInOpen(true); };
  const handleSwitchToSignUp = () => { setSignInOpen(false); setSignUpOpen(true); };
  const handleForgotPassword = () => { setSignInOpen(false); setResetPasswordOpen(true); };
  const handleBackToLogin = () => { setResetPasswordOpen(false); setSignInOpen(true); };
   const handleLoginSuccess = (value: boolean) => {
    setIsLoggedIn(value);
    setSignInOpen(false);
    if (pendingGameId && value) {
      navigate(`/game/${pendingGameId}`);
      setPendingGameId(null);
    }
  };
  const getMainMargin = () => {
    if (isMobile) return 0;
    if (!sidebarOpen) return 0;
    return sidebarCollapsed ? 64 : 240;
  };
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

  const [activeSportsTab, setActiveSportsTab] = useState<TabType>('highlights');
  const [bets, setBets] = useState<BetItem[]>([]);
  const [isBetSlipOpen, setIsBetSlipOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const selectedBetIds = bets.map((b) => b.id);

  const handleAddBet = (bet: BetItem) => {
    const existingIndex = bets.findIndex((b) => b.id === bet.id);
    if (existingIndex >= 0) {
      // Remove if already selected
      setBets(bets.filter((b) => b.id !== bet.id));
    } else {
      // Add new bet
      setBets([...bets, bet]);
      setIsBetSlipOpen(true);
    }
  };

  const handleRemoveBet = (betId: string) => {
    setBets(bets.filter((b) => b.id !== betId));
  };

  const handleClearAll = () => {
    setBets([]);
    setIsBetSlipOpen(false);
  };


  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onSearchClick={() => setSearchOpen(true)}
        onChatClick={() => setChatOpen(!chatOpen)}
        onSignInClick={() => setSignInOpen(true)}
        onSignUpClick={() => setSignUpOpen(true)}
        onLanguageClick={() => setLanguageOpen(true)}
        onCurrencyClick={() => setCurrencyOpen(true)}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        isSidebarCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        isLoggedIn={isLoggedIn}
        onLogout={() => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }}
      />

      <div className="flex flex-1 pt-14 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onClose={() => setSidebarOpen(false)}
          isDark={isDark}
          onThemeToggle={toggleTheme}
          onLanguageClick={() => setLanguageOpen(true)}
          onCurrencyClick={() => setCurrencyOpen(true)}
          onChatClick={() => setChatOpen(!chatOpen)}
        />

        <main
          className="flex-1 min-w-0 pb-20 lg:pb-0 transition-all duration-300 overflow-y-auto custom-scrollbar"
          style={{ marginLeft: getMainMargin() }}
        >
          <SportsCategoryTabs
            showSearch={showSearch}
            setShowSearch={setShowSearch}
          />

          {!showSearch && (
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <SportsTabs activeTab={activeSportsTab} onTabChange={setActiveSportsTab} />
              </div>
              <>
                {activeSportsTab === 'highlights' && (
                  <HighlightsTab onAddBet={handleAddBet} selectedBets={selectedBetIds} />
                )}
                {activeSportsTab === 'event-builder' && (
                  <EventBuilderTab onAddBet={handleAddBet} selectedBets={selectedBetIds} />
                )}
                {activeSportsTab === 'bets-feed' && <BetsFeedTab onAddBet={handleAddBet} />}
              </>
            </div>
          )}



          <Footer />
        </main>
      </div>
       <MobileNav
              onMenuClick={() => setSidebarOpen(!sidebarOpen)}
              onSearchClick={() => setSearchOpen(true)}
              onChatClick={() => setChatOpen(!chatOpen)}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
      
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
            <LanguageCurrencyModal isOpen={languageOpen} onClose={() => setLanguageOpen(false)} />
            <SignUpModal isOpen={signUpOpen} onClose={() => setSignUpOpen(false)} onSwitchToSignIn={handleSwitchToSignIn} setIsLoggedIn={setIsLoggedIn} />
            <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} onSwitchToSignUp={handleSwitchToSignUp} onForgotPassword={handleForgotPassword} setIsLoggedIn={handleLoginSuccess} />
            <ResetPasswordModal isOpen={resetPasswordOpen} onClose={() => setResetPasswordOpen(false)} onBackToLogin={handleBackToLogin} />
        
      {/* BET SLIP MODAL */}
      <AnimatePresence>
        {/* Bet Slip */}
        <BetSlip
          bets={bets}
          onRemoveBet={handleRemoveBet}
          onClearAll={handleClearAll}
          isOpen={isBetSlipOpen}
          onToggle={() => setIsBetSlipOpen(!isBetSlipOpen)}
        />
      </AnimatePresence>
    </div>
  );
}



export default SportsPage;