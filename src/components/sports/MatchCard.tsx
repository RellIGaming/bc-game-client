import { useState } from 'react';
import { Match, BetItem } from '@/types/sports';
import { cn } from '@/lib/utils';
import { ChevronDown, MapPin, Clock, Zap } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  onAddBet: (bet: BetItem) => void;
  selectedBets: string[];
}

export function MatchCard({ match, onAddBet, selectedBets }: MatchCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleOddsClick = (selection: string, odds: number, market: string = '1x2') => {
    const betId = `${match.id}-${selection}-${market}`;
    onAddBet({
      id: betId,
      matchId: match.id,
      matchName: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
      selection,
      odds,
      market,
    });
  };

  const isBetSelected = (selection: string, market: string = '1x2') => {
    return selectedBets.includes(`${match.id}-${selection}-${market}`);
  };

  return (
    <div className="betting-card overflow-hidden bg-card b-radius">
      {/* Header */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-muted-foreground border-b border-border ">
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3" />
          <span>{match.country}</span>
          <span>·</span>
          <span>{match.league}</span>
        </div>
        <div className="flex items-center gap-2">
          {match.isLive ? (
            <span className="live-badge">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse-live" />
              LIVE
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {match.startTime}
            </span>
          )}
          {match.isLive && match.liveTime && (
            <span className="text-betting-live">{match.liveTime}</span>
          )}
          <Zap className="w-3 h-3 text-primary" />
        </div>
      </div>

      {/* Teams */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center text-xs">⚽</div>
          <span className="text-foreground font-medium text-sm">{match.homeTeam.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center text-xs">⚽</div>
          <span className="text-foreground font-medium text-sm">{match.awayTeam.name}</span>
        </div>
      </div>

      {/* Odds */}
      <div className="px-4 pb-3">
        <div className="text-xs text-muted-foreground mb-2">1x2</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOddsClick(match.homeTeam.name, match.odds.home)}
            className={cn(
              'flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all',
              isBetSelected(match.homeTeam.name)
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-betting-card-hover'
            )}
          >
            <span className="text-muted-foreground mr-2">1</span>
            <span>{match.odds.home.toFixed(2)}</span>
          </button>
          
          {match.odds.draw > 0 && (
            <button
              onClick={() => handleOddsClick('draw', match.odds.draw)}
              className={cn(
                'flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all',
                isBetSelected('draw')
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-betting-card-hover'
              )}
            >
              <span className="text-muted-foreground mr-2">draw</span>
              <span>{match.odds.draw.toFixed(2)}</span>
            </button>
          )}
          
          <button
            onClick={() => handleOddsClick(match.awayTeam.name, match.odds.away)}
            className={cn(
              'flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all',
              isBetSelected(match.awayTeam.name)
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-betting-card-hover'
            )}
          >
            <span className="text-muted-foreground mr-2">2</span>
            <span>{match.odds.away.toFixed(2)}</span>
          </button>

          {/* Expand Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              'p-2 rounded-md transition-all',
              isExpanded ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-muted'
            )}
          >
            <ChevronDown className={cn('w-4 h-4 transition-transform', isExpanded && 'rotate-180')} />
          </button>
        </div>
      </div>

      {/* Expanded Markets */}
      {isExpanded && match.additionalMarkets && (
        <div className="px-4 pb-4 space-y-4 border-t border-border pt-4 animate-fade-in">
          {match.additionalMarkets.map((market) => (
            <div key={market.name}>
              <div className="text-xs text-muted-foreground mb-2">{market.name}</div>
              <div className="flex flex-wrap gap-2">
                {market.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleOddsClick(option.label, option.odds, market.name)}
                    className={cn(
                      'py-2 px-3 rounded-md text-sm font-medium transition-all min-w-[80px]',
                      isBetSelected(option.label, market.name)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground hover:bg-betting-card-hover'
                    )}
                  >
                    <div className="text-xs text-muted-foreground truncate">{option.label}</div>
                    <div>{option.odds.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
