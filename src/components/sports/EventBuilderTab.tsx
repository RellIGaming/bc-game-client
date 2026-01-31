import { useState } from 'react';
import { BetItem, SportCategory, TimeFilter } from '@/types/sports';
import { MatchCard } from './MatchCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { eventBuilderMatches } from '@/lib/sportsData';
import { SportCategoryFilter } from './SportCategoryFilter';

interface EventBuilderTabProps {
  onAddBet: (bet: BetItem) => void;
  selectedBets: string[];
}

export function EventBuilderTab({ onAddBet, selectedBets }: EventBuilderTabProps) {
  const [selectedSport, setSelectedSport] = useState<SportCategory>('soccer');
  const [selectedTime, setSelectedTime] = useState<TimeFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 8;

  const totalPages = Math.ceil(eventBuilderMatches.length / matchesPerPage);
  const startIndex = (currentPage - 1) * matchesPerPage;
  const displayedMatches = eventBuilderMatches.slice(startIndex, startIndex + matchesPerPage);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <SportCategoryFilter
          selectedSport={selectedSport}
          onSportChange={setSelectedSport}
          selectedTime={selectedTime}
          onTimeChange={setSelectedTime}
        />
      </div>

      {/* Match Grid */}
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {displayedMatches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            onAddBet={onAddBet}
            selectedBets={selectedBets}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 py-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="p-2 bg-secondary rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm text-muted-foreground">
          {startIndex + 1} - {Math.min(startIndex + matchesPerPage, eventBuilderMatches.length)} of{' '}
          {eventBuilderMatches.length}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="p-2 bg-secondary rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Odds Format */}
      <div className="flex items-center justify-center gap-4 py-6">
        <span className="text-sm text-muted-foreground">ODDS FORMAT</span>
        <select className="bg-secondary text-foreground px-4 py-2 rounded-lg outline-none">
          <option>European</option>
          <option>American</option>
          <option>Fractional</option>
        </select>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-muted-foreground max-w-2xl mx-auto">
        Although every effort is made to ensure data displayed on our site is accurate, this data is for
        information purposes and should be used as a guide only. In the event of any particular information
        being incorrect, we assume no liability for it.
      </p>
    </div>
  );
}
