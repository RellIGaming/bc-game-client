import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SportsCategoryTabs from "@/components/sports/SportsCategoryTabs";
import { BetSlip } from "@/components/sports/BetSlip";
import { SportsTabs } from "@/components/sports/SportsTabs";
import { HighlightsTab } from "@/components/sports/HighlightsTab";
import { EventBuilderTab } from "@/components/sports/EventBuilderTab";
import { BetsFeedTab } from "@/components/sports/BetsFeedTab";
import { BetItem, TabType } from "@/types/sports";
import SearchSportsCategory from "@/components/sports/SearchSportsCategory";


interface SportsPageProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const SportsPage = ({ isLoggedIn, setIsLoggedIn }: SportsPageProps) => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchCategory, setSearchCategory] = useState<{
    category: string;
    league?: string;
  } | null>(null);
  const [pendingGameId, setPendingGameId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("sports");

  const handleLoginSuccess = (value: boolean) => {
    setIsLoggedIn(value);
    setSignInOpen(false);
    if (pendingGameId && value) {
      navigate(`/game/${pendingGameId}`);
      setPendingGameId(null);
    }
  };



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
    <div className="">
      <main
      >
        <SportsCategoryTabs
          showSearch={showSearch}
          setShowSearch={setShowSearch}
        />

        {!showSearch ? (
          <div className=" mx-auto px-4 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
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
        ) : (
          <SearchSportsCategory
            activeCategory={searchCategory}
            onBack={() => {
              setShowSearch(false);
              setSearchCategory(null);
            }}
            onSelectCategory={(cat) => setSearchCategory(cat)}
            onAddBet={handleAddBet}
            selectedBets={selectedBetIds}
          />
        )}
      </main>

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