import { useState } from 'react';
import { Match, BetItem, SportCategory, TimeFilter } from '@/types/sports';
import { MatchCard } from './MatchCard';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { liveMatches, popularMatches, sportCategories, upcomingMatches } from '@/lib/sportsData';
import HighlightsBanner from './LiveMatchBanner';
import LiveMatchBanner from './LiveMatchBanner';
import FeaturedMatchesSlider from './FeaturedMatchesSlider';

interface HighlightsTabProps {
  onAddBet: (bet: BetItem) => void;
  selectedBets: string[];
}

export function HighlightsTab({ onAddBet, selectedBets }: HighlightsTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<SportCategory>('cricket');
 const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  return (
    <div className="space-y-8">
        <LiveMatchBanner />
      {/* Featured Carousel - Placeholder */}
      <FeaturedMatchesSlider/>

      {/* Popular Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Popular</h2>
        </div>

        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {sportCategories.slice(0, 8).map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'sport-chip whitespace-nowrap p-2 bg-card b-radius',
                selectedCategory === category.id ? 'active' : ''
              )}
            >
              <span className='text-xs'>{category.icon}</span>
            <span className='text-xs'>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Popular Matches */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {popularMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onAddBet={onAddBet}
              selectedBets={selectedBets}
            />
          ))}
        </div>
      </section>

      {/* Live Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">Live</h2>
            <span className="live-badge">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse-live" />
              {liveMatches.length}
            </span>
          </div>
          <button className="text-sm text-primary hover:underline flex items-center gap-1">
            Go to Live
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {sportCategories.slice(0, 8).map((category) => (
            <button
              key={category.id}
              className={cn(
                'sport-chip whitespace-nowrap p-2 bg-card b-radius',
                category.id === 'soccer' ? 'active' : ''
              )}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Live Matches */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {liveMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onAddBet={onAddBet}
              selectedBets={selectedBets}
            />
          ))}
        </div>
      </section>

      {/* Upcoming Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Upcoming</h2>
        </div>

        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {sportCategories.slice(0, 8).map((category) => (
            <button
              key={category.id}
              className={cn(
                'sport-chip whitespace-nowrap p-2 bg-card b-radius',
                category.id === 'soccer' ? 'active' : ''
              )}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Upcoming Matches */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {upcomingMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onAddBet={onAddBet}
              selectedBets={selectedBets}
            />
          ))}
        </div>
      </section>

      {/* Odds Format */}
      <div className="flex items-center justify-center gap-4 py-6">
        <span className="text-sm text-muted-foreground">ODDS FORMAT</span>
        <select className="bg-secondary text-foreground px-4 py-2 rounded-lg outline-none">
          <option>European</option>
          <option>American</option>
          <option>Fractional</option>
        </select>
      </div>
    </div>
  );
}
