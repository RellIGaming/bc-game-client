import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import SportsCategoryTabs from "@/components/sports/SportsCategoryTabs";
import { BetSlip } from "@/components/sports/BetSlip";
import { SportsTabs } from "@/components/sports/SportsTabs";
import { HighlightsTab } from "@/components/sports/HighlightsTab";
import { EventBuilderTab } from "@/components/sports/EventBuilderTab";
import { BetsFeedTab } from "@/components/sports/BetsFeedTab";
import { BetItem, TabType } from "@/types/sports";
import SearchSportsCategory from "@/components/sports/SearchSportsCategory";
import SportCategoryPage from "@/components/sports/SportCategoryPage";

interface SportsPageProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const SportsPage = ({ isLoggedIn, setIsLoggedIn }: SportsPageProps) => {
  const navigate = useNavigate();
  const { category } = useParams<{ category?: string }>();
  const [showSearch, setShowSearch] = useState(false);
  const [searchCategory, setSearchCategory] = useState<{
    category: string;
    league?: string;
  } | null>(null);

  const [activeSportsTab, setActiveSportsTab] = useState<TabType>('highlights');
  const [bets, setBets] = useState<BetItem[]>([]);
  const [isBetSlipOpen, setIsBetSlipOpen] = useState(false);

  const selectedBetIds = bets.map((b) => b.id);

  const handleAddBet = (bet: BetItem) => {
    const existingIndex = bets.findIndex((b) => b.id === bet.id);
    if (existingIndex >= 0) {
      setBets(bets.filter((b) => b.id !== bet.id));
    } else {
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

  const handleCategorySelect = (cat: string) => {
    navigate(`/sports/${cat}`);
  };

  return (
    <div className="">
      <main>
        <SportsCategoryTabs
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          onCategorySelect={handleCategorySelect}
          activeCategory={category}
        />

        {!showSearch ? (
          <div className="mx-auto px-2 py-4">
            {category ? (
              // Show category-specific page
              <SportCategoryPage
                category={category}
                onAddBet={handleAddBet}
                selectedBets={selectedBetIds}
              />
            ) : (
              // Show default highlights/event-builder/bets-feed
              <>
                <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                  <SportsTabs activeTab={activeSportsTab} onTabChange={setActiveSportsTab} />
                </div>
                {activeSportsTab === 'highlights' && (
                  <HighlightsTab onAddBet={handleAddBet} selectedBets={selectedBetIds} />
                )}
                {activeSportsTab === 'event-builder' && (
                  <EventBuilderTab onAddBet={handleAddBet} selectedBets={selectedBetIds} />
                )}
                {activeSportsTab === 'bets-feed' && <BetsFeedTab onAddBet={handleAddBet} />}
              </>
            )}
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

      <AnimatePresence>
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
