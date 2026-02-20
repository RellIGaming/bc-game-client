import { useState } from 'react';
import { ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { BetItem } from '@/types/sports';
import { MatchCard } from './MatchCard';
import { sportCategoryMatches, sportDisplayInfo } from '@/lib/sportsCategoryData';

interface SportCategoryPageProps {
  category: string;
  onAddBet: (bet: BetItem) => void;
  selectedBets: string[];
}

export default function SportCategoryPage({ category, onAddBet, selectedBets }: SportCategoryPageProps) {
  const isMobile = useIsMobile();
  const data = sportCategoryMatches[category];
  const info = sportDisplayInfo[category];
  const [activeLeague, setActiveLeague] = useState('Popular');
  const [activeView, setActiveView] = useState<'matches' | 'outrights'>('matches');
  const [page, setPage] = useState(1);
  const perPage = 12;

  if (!data || !info) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>No data available for this sport category.</p>
      </div>
    );
  }

  const allUpcoming = data.upcoming;
  const totalPages = Math.ceil(allUpcoming.length / perPage);
  const paginatedUpcoming = allUpcoming.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-6">
      {/* Sport Title */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">{info.icon}</span>
        <h1 className="text-xl sm:text-2xl font-bold">{info.name}</h1>
      </div>

      {/* League Filter Tags */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted">
          <span className="text-sm text-muted-foreground whitespace-nowrap">All</span>
          <span className="bg-secondary px-2 py-0.5 rounded text-xs text-muted-foreground">
            {data.live.length + data.upcoming.length}
          </span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
        {data.leagues.map((league) => (
          <button
            key={league}
            onClick={() => setActiveLeague(league)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
              activeLeague === league
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-muted"
            )}
          >
            {league}
          </button>
        ))}
      </div>

      {/* Matches / Outrights Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveView('matches')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
            activeView === 'matches'
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          )}
        >
          Matches
        </button>
        <button
          onClick={() => setActiveView('outrights')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
            activeView === 'outrights'
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          )}
        >
          Outrights
        </button>
      </div>

      {activeView === 'matches' ? (
        <>
          {/* Live Section */}
          {data.live.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-bold">Live</h2>
                <span className="live-badge px-2 py-0.5 bg-betting-live text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  {data.live.length}
                </span>
              </div>
              <div className={cn("grid gap-4", isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-3")}>
                {data.live.map((match) => (
                  <MatchCard key={match.id} match={match} onAddBet={onAddBet} selectedBets={selectedBets} />
                ))}
              </div>
            </section>
          )}

          {/* Upcoming Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-bold">🔥 Upcoming</h2>
            </div>
            <div className={cn("grid gap-4", isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-3")}>
              {paginatedUpcoming.map((match) => (
                <MatchCard key={match.id} match={match} onAddBet={onAddBet} selectedBets={selectedBets} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg bg-secondary hover:bg-muted disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-muted-foreground">
                  {(page - 1) * perPage + 1} - {Math.min(page * perPage, allUpcoming.length)} of {allUpcoming.length}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg bg-secondary hover:bg-muted disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </section>
        </>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p>No outrights available for {info.name} at this time.</p>
        </div>
      )}

      {/* Odds Format */}
      <div className="flex items-center justify-center gap-4 py-6">
        <span className="text-sm text-muted-foreground tracking-wider">ODDS FORMAT</span>
        <select className="bg-secondary text-foreground px-4 py-2 rounded-lg outline-none">
          <option>European</option>
          <option>American</option>
          <option>Fractional</option>
        </select>
      </div>
    </div>
  );
}
