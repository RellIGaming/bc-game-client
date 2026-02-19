import { Match } from '@/types/sports';

// Generate matches for each sport category
const generateMatches = (sport: string, teams: { home: string; away: string; league: string; country: string }[], isLive: boolean = false): Match[] => {
  return teams.map((t, i) => ({
    id: `${sport}-${isLive ? 'live' : 'upcoming'}-${i}`,
    league: t.league,
    country: t.country,
    startTime: isLive ? `${Math.floor(Math.random() * 90)}'` : `Today, ${14 + Math.floor(i * 1.5)}:${['00', '30'][i % 2]}`,
    isLive,
    liveTime: isLive ? `${Math.random() > 0.5 ? '1st' : '2nd'} half` : undefined,
    homeTeam: { id: `${sport}-h${i}`, name: t.home },
    awayTeam: { id: `${sport}-a${i}`, name: t.away },
    odds: {
      home: +(1 + Math.random() * 4).toFixed(2),
      draw: sport === 'tennis' || sport === 'counter-strike' || sport === 'dota2' ? 0 : +(2 + Math.random() * 2).toFixed(2),
      away: +(1 + Math.random() * 4).toFixed(2),
    },
  }));
};

export const sportCategoryMatches: Record<string, { live: Match[]; upcoming: Match[]; leagues: string[] }> = {
  soccer: {
    leagues: ['Popular', 'FA Cup', 'Copa del Rey', 'Champions League', 'Coppa Italia', 'Copa do Brasil'],
    live: generateMatches('soccer', [
      { home: 'FC Barcelona', away: 'Atletico de Madrid', league: 'Copa del Rey (2x6 min)', country: 'Spain' },
      { home: 'Hellas Verona', away: 'FC Empoli', league: 'Serie A (2x6 min)', country: 'Italy' },
      { home: 'Fluminense', away: 'Borussia Dortmund', league: 'FIFA Club World Cup (2x6 min)', country: 'International' },
      { home: 'Borussia Dortmund', away: 'Bayern', league: 'Champions League (2x6 min)', country: 'International' },
      { home: 'Arsenal FC', away: 'Manchester City', league: 'England FA Cup (2x6 min)', country: 'England' },
      { home: 'Dynamo Moscow', away: 'Spartak Moscow', league: 'Premier League (2x6 min)', country: 'Russia' },
    ], true),
    upcoming: generateMatches('soccer', [
      { home: 'Mirassol FC', away: 'Avai FC', league: 'Brasileirão Série B (2x6 min)', country: 'Brazil' },
      { home: 'Bologna FC', away: 'ACF Fiorentina', league: 'Serie A (2x6 min)', country: 'Italy' },
      { home: 'Real Madrid', away: 'Atletico de Madrid', league: 'Copa del Rey (2x6 min)', country: 'Spain' },
      { home: 'Zenit St. Petersburg', away: 'CSKA Moscow', league: 'Premier League (2x6 min)', country: 'Russia' },
      { home: 'Unión Española', away: 'Huachipato FC', league: 'Campeonato PlanVital (2x6 min)', country: 'Chile' },
      { home: 'Panama', away: 'El Salvador', league: 'Copa America (2x6 min)', country: 'International' },
      { home: 'Manchester City', away: 'Chelsea FC', league: 'Champions League (2x6 min)', country: 'International' },
      { home: 'Flamengo', away: 'Chelsea', league: 'FIFA Club World Cup (2x6 min)', country: 'International' },
      { home: 'Chelsea FC', away: 'Manchester City', league: 'FA Cup (2x6 min)', country: 'England' },
    ]),
  },
  tennis: {
    leagues: ['Popular', 'ATP Doha', 'ATP Rio de Janeiro', 'WTA Dubai', 'ATP Delray Beach', 'ATP Challengers'],
    live: generateMatches('tennis', [
      { home: 'Rajeshwaran Revathi, Manya', away: 'Ivaluenko, Puline', league: 'ITF Women - ITF Bangalore', country: 'India' },
      { home: 'Yamaguchi, Mei', away: 'Kulikova, Anastasia', league: 'ITF Women - ITF Bangalore', country: 'India' },
      { home: 'Park, Suhyun', away: 'Sidorova, Kristianna', league: 'ITF Women - ITF Bangalore', country: 'India' },
      { home: 'Fognini, Fabio', away: 'Korda, Sebastian', league: 'eTennis - Australian Open', country: 'Australia' },
    ], true),
    upcoming: generateMatches('tennis', [
      { home: 'Machvadev, Daniil', away: 'Tsitsipas, Stefanoe', league: 'ATP Doha, Qatar', country: 'Qatar' },
      { home: 'Popyrln, Alexei', away: 'Sinner, Jannik', league: 'ATP Doha, Qatar', country: 'Qatar' },
      { home: 'Giron, Marcos', away: 'Ruud, Cooper', league: 'ATP Delray Beach, USA', country: 'USA' },
      { home: 'Alcaraz, Carlos', away: 'Reyes, Valentin', league: 'ATP Doha, Qatar', country: 'Qatar' },
      { home: 'Gauff, Coco', away: 'Merlano, Elise', league: 'WTA Dubai, UAE', country: 'UAE' },
      { home: 'Monseen, Felkion', away: 'Rubina, Andrey', league: 'ATP Doha, Qatar', country: 'Qatar' },
      { home: 'Laherda, Ari', away: 'Borgs, Zzara', league: 'ATP Doha, Qatar', country: 'Qatar' },
      { home: 'Bencic, Belinda', away: 'Svitolina, Elina', league: 'WTA Dubai, UAE', country: 'UAE' },
      { home: 'Facieovlia, Morton', away: 'Khochanova, Karen', league: 'ATP Doha, Qatar', country: 'Qatar' },
    ]),
  },
  basketball: {
    leagues: ['Popular', 'NBA', 'EuroLeague', 'NCAA', 'CBA'],
    live: generateMatches('basketball', [
      { home: 'LA Lakers', away: 'Boston Celtics', league: 'NBA', country: 'USA' },
      { home: 'Real Madrid', away: 'Panathinaikos', league: 'EuroLeague', country: 'Europe' },
    ], true),
    upcoming: generateMatches('basketball', [
      { home: 'Golden State Warriors', away: 'Miami Heat', league: 'NBA', country: 'USA' },
      { home: 'Milwaukee Bucks', away: 'Denver Nuggets', league: 'NBA', country: 'USA' },
      { home: 'CSKA Moscow', away: 'Barcelona', league: 'EuroLeague', country: 'Europe' },
      { home: 'Fenerbahce', away: 'Olimpia Milano', league: 'EuroLeague', country: 'Europe' },
      { home: 'Duke', away: 'North Carolina', league: 'NCAA', country: 'USA' },
      { home: 'Kansas', away: 'Kentucky', league: 'NCAA', country: 'USA' },
    ]),
  },
  'counter-strike': {
    leagues: ['Popular', 'PGL Cluj-Napoca 2026', 'ECL Season 5', 'CCT Season 3 EU', 'Berserk League'],
    live: generateMatches('counter-strike', [
      { home: 'Howl Fighters', away: 'Blue Gem Keepers', league: 'Counter-Strike 2 - C | H2H 2X2 (MR8)', country: 'World' },
      { home: 'Evoker', away: 'Raze', league: 'Counter-Strike 2 Duels - C | Berserk League', country: 'World' },
      { home: 'MIBR [AI]', away: 'MongoIZ [AI]', league: 'Counter-Strike 2 AI - AI | Decoy Major (MR24)', country: 'World' },
    ], true),
    upcoming: generateMatches('counter-strike', [
      { home: 'Gungnir Warriors', away: 'Howl Fighters', league: 'Counter-Strike 2 - C | H2H 2X2 (MR8)', country: 'World' },
      { home: 'Blue Gem Keepers', away: 'Gungnir Warriors', league: 'Counter-Strike 2 - C | H2H 2X2 (MR8)', country: 'World' },
      { home: 'Blue Gem Keepers', away: 'Howl Fighters', league: 'Counter-Strike 2 - C | H2H 2X2 (MR8)', country: 'World' },
      { home: 'Gungnir Warriors', away: 'Blue Gem Keepers', league: 'Counter-Strike 2 - C | H2H 2X2 (MR8)', country: 'World' },
      { home: 'Howl Fighters', away: 'Blue Gem Keepers', league: 'Counter-Strike 2 - C | H2H 2X2 (MR8)', country: 'World' },
      { home: 'Blue Gem Keepers', away: 'Gungnir Warriors', league: 'Counter-Strike 2 - C | H2H 2X2 (MR8)', country: 'World' },
      { home: 'Howl Fighters', away: 'Gungnir Warriors', league: 'Counter-Strike 2 - C | H2H 2X2 (MR8)', country: 'World' },
      { home: 'Blue Gem Keepers', away: 'Howl Fighters', league: 'Counter-Strike 2 - C | H2H 2X2 (MR8)', country: 'World' },
      { home: 'WW Team', away: 'Gungnir Warriors', league: 'CCT Season 3 EU Series #16', country: 'World' },
    ]),
  },
  dota2: {
    leagues: ['Popular', 'DreamLeague Season 28', 'CCT Season 2 Series 7'],
    live: [],
    upcoming: generateMatches('dota2', [
      { home: 'BetBoom Team', away: 'Team Yandex', league: 'Dota 2 - S | DreamLeague Season 28', country: 'World' },
      { home: 'PARIVISION', away: 'Team Liquid', league: 'Dota 2 - S | DreamLeague Season 28', country: 'World' },
      { home: 'paiN Gaming', away: 'Team OG', league: 'Dota 2 - S | DreamLeague Season 28', country: 'World' },
      { home: 'Aurora Gaming', away: 'Yakult\'s Brothers', league: 'Dota 2 - S | DreamLeague Season 28', country: 'World' },
      { home: 'VP.Prodigy', away: 'Pipsqueak+4', league: 'Dota 2 - B | CCT Season 2 Series 7', country: 'World' },
      { home: 'Team Spirit', away: 'Natus Vincere', league: 'Dota 2 - S | DreamLeague Season 28', country: 'World' },
      { home: 'Team Falcons', away: 'MOUZ', league: 'Dota 2 - S | DreamLeague Season 28', country: 'World' },
      { home: 'Tundra', away: 'GamerLegion', league: 'Dota 2 - S | DreamLeague Season 28', country: 'World' },
      { home: 'Xtreme Gaming', away: 'Execration', league: 'Dota 2 - S | DreamLeague Season 28', country: 'World' },
    ]),
  },
  'ice-hockey': {
    leagues: ['Popular', 'Olympic Games', 'NHL', 'KHL', 'Liga', 'Extraliga', 'SHL'],
    live: generateMatches('ice-hockey', [
      { home: 'Apaches East', away: 'Wild Vikings', league: 'International - 2x2 MNHL B (1x5 min)', country: 'International' },
      { home: 'Svirepye Ej', away: 'Ledovye Spartantcy', league: 'Russia - Magnites Open (1x10 min)', country: 'Russia' },
      { home: 'San Jose Parks (E)', away: 'Los Angeles (E)', league: 'eIce Hockey - NHL Pacific Division (3x3 min)', country: 'eIce Hockey' },
      { home: 'Montreal (E)', away: 'Ottawa Elevators (E)', league: 'eIce Hockey - NHL Atlantic Division (3x3 min)', country: 'eIce Hockey' },
      { home: 'Long Island (E)', away: 'Pittsburgh (E)', league: 'eIce Hockey - NHL Metropolitan Division (3x3 min)', country: 'eIce Hockey' },
      { home: 'Colorado (E)', away: 'Dallas (E)', league: 'eIce Hockey - NHL Central Division (3x3 min)', country: 'eIce Hockey' },
    ], true),
    upcoming: generateMatches('ice-hockey', [
      { home: 'Vegas Golden Lights (E)', away: 'Los Angeles (E)', league: 'eIce Hockey - NHL Pacific Division (3x3 min)', country: 'eIce Hockey' },
      { home: 'Tampa Bay (E)', away: 'Florida (E)', league: 'eIce Hockey - NHL Atlantic Division (3x3 min)', country: 'eIce Hockey' },
      { home: 'Carolina Canes (E)', away: 'Pittsburgh (E)', league: 'eIce Hockey - NHL Metropolitan Division (3x3 min)', country: 'eIce Hockey' },
      { home: 'Seattle (E)', away: 'Vancouver Trucks (E)', league: 'eIce Hockey - NHL Pacific Division (3x3 min)', country: 'eIce Hockey' },
      { home: 'Montreal (E)', away: 'Boston (E)', league: 'eIce Hockey - NHL Atlantic Division (3x3 min)', country: 'eIce Hockey' },
      { home: 'New Jersey Dragons (E)', away: 'Columbus (E)', league: 'eIce Hockey - NHL Metropolitan Division (3x3 min)', country: 'eIce Hockey' },
      { home: 'Ledovye Spartantcy', away: 'Stalnye Topory', league: 'Russia - Magnites Open (3x10 min)', country: 'Russia' },
      { home: 'Slovakia', away: 'Germany', league: 'International - Olympic Games', country: 'International' },
      { home: 'Metallurg Novokuznetsk', away: 'Zaurobye Kurgon', league: 'Russia - VHL', country: 'Russia' },
    ]),
  },
  cricket: {
    leagues: ['Popular', 'IPL', 'T20 International', 'ODI', 'Test Match'],
    live: generateMatches('cricket', [
      { home: 'India', away: 'Australia', league: 'T20 International', country: 'International' },
      { home: 'Mumbai Indians', away: 'Chennai Super Kings', league: 'IPL', country: 'India' },
    ], true),
    upcoming: generateMatches('cricket', [
      { home: 'Gujarat Giants', away: 'Mumbai Indians', league: 'T20 Premier League', country: 'India' },
      { home: 'Sri Lanka', away: 'England', league: 'T20 Internationals', country: 'International' },
      { home: 'Royal Challengers', away: 'Delhi Capitals', league: 'IPL', country: 'India' },
      { home: 'Pakistan', away: 'New Zealand', league: 'ODI Series', country: 'International' },
      { home: 'Rajasthan Royals', away: 'Punjab Kings', league: 'IPL', country: 'India' },
      { home: 'West Indies', away: 'South Africa', league: 'Test Match', country: 'International' },
    ]),
  },
  esoccer: {
    leagues: ['Popular', 'FA Cup (2x6 min)', 'Copa del Rey (2x6 min)', 'Coppa Italia (2x6 min)', 'Champions League (2x6 min)', 'Copa do Brasil (2x6 min)', 'Copa America'],
    live: generateMatches('esoccer', [
      { home: 'FC Barcelona', away: 'Atletico de Madrid', league: 'Copa del Rey (2x6 min)', country: 'Spain' },
      { home: 'Hellas Verona', away: 'FC Empoli', league: 'Serie A (2x6 min)', country: 'Italy' },
      { home: 'Fluminense', away: 'Borussia Dortmund', league: 'FIFA Club World Cup (2x6 min)', country: 'International' },
      { home: 'Borussia Dortmund', away: 'Bayern', league: 'Champions League (2x6 min)', country: 'International' },
      { home: 'Arsenal FC', away: 'Manchester City', league: 'England FA Cup (2x6 min)', country: 'England' },
      { home: 'Dynamo Moscow', away: 'Spartak Moscow', league: 'Premier League (2x6 min)', country: 'Russia' },
      { home: 'Juventude', away: 'Athletico-PR', league: 'Copa de Brasil (2x6 min)', country: 'Brazil' },
      { home: 'Leipzig', away: 'Wolfsburg', league: 'Bundesliga (2x6 min)', country: 'Germany' },
      { home: 'Dep. La Guaira', away: 'Caracas F.C.', league: 'Liga FUTVE (2x6 min)', country: 'Venezuela' },
    ], true),
    upcoming: generateMatches('esoccer', [
      { home: 'Mirassol FC', away: 'Avai FC', league: 'Brasileirão Série B (2x6 min)', country: 'Brazil' },
      { home: 'Bologna FC', away: 'ACF Fiorentina', league: 'Serie A (2x6 min)', country: 'Italy' },
      { home: 'Real Madrid', away: 'Atletico de Madrid', league: 'Copa del Rey (2x6 min)', country: 'Spain' },
      { home: 'Zenit St. Petersburg', away: 'CSKA Moscow', league: 'Premier League (2x6 min)', country: 'Russia' },
      { home: 'Manchester City', away: 'Chelsea FC', league: 'Champions League (2x6 min)', country: 'International' },
      { home: 'Flamengo', away: 'Chelsea', league: 'FIFA Club World Cup (2x6 min)', country: 'International' },
      { home: 'Chelsea FC', away: 'Manchester City', league: 'FA Cup (2x6 min)', country: 'England' },
      { home: 'Shanghai Port', away: 'Shanghai Shenhua', league: 'CSL Super League (2x6 min)', country: 'China' },
      { home: 'Borussia Dortmund', away: 'Eintracht Frankfurt', league: 'Bundesliga (2x6 min)', country: 'Germany' },
    ]),
  },
  volleyball: {
    leagues: ['Popular', 'Serie A', 'Bundesliga', 'SuperLiga'],
    live: [],
    upcoming: generateMatches('volleyball', [
      { home: 'Modena Volley', away: 'Sir Safety Perugia', league: 'Serie A', country: 'Italy' },
      { home: 'Zenit Kazan', away: 'Dinamo Moscow', league: 'SuperLiga', country: 'Russia' },
      { home: 'BR Volleys', away: 'VfB Friedrichshafen', league: 'Bundesliga', country: 'Germany' },
      { home: 'Trentino Volley', away: 'Lube Civitanova', league: 'Serie A', country: 'Italy' },
    ]),
  },
  'table-tennis': {
    leagues: ['Popular', 'TT Cup', 'Pro Spin Series', 'Liga Pro'],
    live: generateMatches('table-tennis', [
      { home: 'Tikhonov, Evgeny', away: 'Xu, Haidong', league: 'TT Cup', country: 'World' },
      { home: 'Mueller, Franz', away: 'Chen, Wei', league: 'Pro Spin Series', country: 'World' },
    ], true),
    upcoming: generateMatches('table-tennis', [
      { home: 'Ivanov, Sergei', away: 'Kim, Dong-Moon', league: 'Liga Pro', country: 'World' },
      { home: 'Smith, James', away: 'Tanaka, Yuki', league: 'TT Cup', country: 'World' },
      { home: 'Garcia, Pablo', away: 'Li, Xiaoming', league: 'Pro Spin Series', country: 'World' },
    ]),
  },
  'american-football': {
    leagues: ['Popular', 'NFL', 'NCAAF', 'XFL'],
    live: [],
    upcoming: generateMatches('american-football', [
      { home: 'Kansas City Chiefs', away: 'San Francisco 49ers', league: 'NFL', country: 'USA' },
      { home: 'Dallas Cowboys', away: 'Philadelphia Eagles', league: 'NFL', country: 'USA' },
      { home: 'Alabama', away: 'Georgia', league: 'NCAAF', country: 'USA' },
      { home: 'Ohio State', away: 'Michigan', league: 'NCAAF', country: 'USA' },
    ]),
  },
  baseball: {
    leagues: ['Popular', 'MLB', 'NPB', 'KBO'],
    live: [],
    upcoming: generateMatches('baseball', [
      { home: 'LA Dodgers', away: 'NY Yankees', league: 'MLB', country: 'USA' },
      { home: 'Houston Astros', away: 'Atlanta Braves', league: 'MLB', country: 'USA' },
      { home: 'Yomiuri Giants', away: 'Hanshin Tigers', league: 'NPB', country: 'Japan' },
    ]),
  },
  handball: {
    leagues: ['Popular', 'Bundesliga', 'LNH', 'Champions League'],
    live: [],
    upcoming: generateMatches('handball', [
      { home: 'THW Kiel', away: 'SG Flensburg', league: 'Bundesliga', country: 'Germany' },
      { home: 'Paris Saint-Germain', away: 'Montpellier', league: 'LNH', country: 'France' },
      { home: 'Barcelona', away: 'Aalborg', league: 'Champions League', country: 'Europe' },
    ]),
  },
  racing: {
    leagues: ['Popular', 'Formula 1', 'NASCAR', 'MotoGP'],
    live: [],
    upcoming: generateMatches('racing', [
      { home: 'Max Verstappen', away: 'Lewis Hamilton', league: 'Formula 1', country: 'International' },
      { home: 'Chase Elliott', away: 'Kyle Larson', league: 'NASCAR', country: 'USA' },
    ]),
  },
  mma: {
    leagues: ['Popular', 'UFC', 'Bellator', 'ONE Championship'],
    live: [],
    upcoming: generateMatches('mma', [
      { home: 'Fighter A', away: 'Fighter B', league: 'UFC 310', country: 'USA' },
      { home: 'Fighter C', away: 'Fighter D', league: 'Bellator', country: 'USA' },
    ]),
  },
  boxing: {
    leagues: ['Popular', 'WBC', 'WBA', 'IBF'],
    live: [],
    upcoming: generateMatches('boxing', [
      { home: 'Boxer A', away: 'Boxer B', league: 'WBC Title Fight', country: 'USA' },
      { home: 'Boxer C', away: 'Boxer D', league: 'WBA Eliminator', country: 'UK' },
    ]),
  },
};

// Map sidebar IDs to sport keys
export const sidebarToSportKey: Record<string, string> = {
  soccer: 'soccer',
  tennis: 'tennis',
  basketball: 'basketball',
  cricket: 'cricket',
  fIFA: 'esoccer',
  'american Football': 'american-football',
  'ice Hockey': 'ice-hockey',
  baseball: 'baseball',
  handball: 'handball',
  racing: 'racing',
};

// Sport display info
export const sportDisplayInfo: Record<string, { icon: string; name: string }> = {
  soccer: { icon: '⚽', name: 'Soccer' },
  tennis: { icon: '🎾', name: 'Tennis' },
  basketball: { icon: '🏀', name: 'Basketball' },
  cricket: { icon: '🏏', name: 'Cricket' },
  esoccer: { icon: '⚽', name: 'eSoccer' },
  'counter-strike': { icon: '🎮', name: 'Counter-Strike' },
  dota2: { icon: '⚔️', name: 'Dota 2' },
  'ice-hockey': { icon: '🏒', name: 'Ice Hockey' },
  volleyball: { icon: '🏐', name: 'Volleyball' },
  'table-tennis': { icon: '🏓', name: 'Table Tennis' },
  'american-football': { icon: '🏈', name: 'American Football' },
  baseball: { icon: '⚾', name: 'Baseball' },
  handball: { icon: '🤾', name: 'Handball' },
  racing: { icon: '🏎️', name: 'Racing' },
  mma: { icon: '🥊', name: 'MMA' },
  boxing: { icon: '🥊', name: 'Boxing' },
};
