export interface Team {
  id: string;
  name: string;
  logo?: string;
}

export interface Match {
  id: string;
  league: string;
  country: string;
  startTime: string;
  isLive: boolean;
  liveTime?: string;
  homeTeam: Team;
  awayTeam: Team;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  additionalMarkets?: Market[];
}

export interface Market {
  name: string;
  options: MarketOption[];
}

export interface MarketOption {
  label: string;
  value: string;
  odds: number;
}

export interface BetItem {
  id: string;
  matchId: string;
  matchName: string;
  selection: string;
  odds: number;
  market: string;
  stake?: number;
}

export interface BetsFeedItem {
  id: string;
  event: string;
  // icon: string;
  outcome: string;
  odds: number;
  stake: string;
  potentialWin: string;
  user: string;
  type: 'single' | 'combo';
  sport: string;
}

export type SportCategory =
  | 'all'
  | 'soccer'
  | 'cricket'
  | 'tennis'
  | 'basketball'
  | 'counter-strike'
  | 'dota2'
  | 'league-of-legends'
  | 'volleyball'
  | 'table-tennis'
  | 'ice-hockey';

export type TimeFilter = '3h' | '24h' | '48h' | 'all';

export type TabType = 'highlights' | 'event-builder' | 'bets-feed';

export type BetSlipTab = 'single' | 'combo' | 'system';
