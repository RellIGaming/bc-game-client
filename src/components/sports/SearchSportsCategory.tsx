import { useState } from 'react';
import { ChevronLeft, ChevronDown, Globe, LayoutGrid, Trophy, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { BetItem } from '@/types/sports';
import { MatchCard } from './MatchCard';
import { upcomingMatches } from '../../lib/sportsData';

export interface SearchSportsCategoryProps {
    activeCategory: {
        category: string;
        league?: string;
    } | null;

    onBack: () => void;

    onSelectCategory: (cat: {
        category: string;
        league?: string;
    }) => void;

    onAddBet: (bet: BetItem) => void;

    selectedBets: string[];
}


const leagueTabs = [
    { id: "popular", label: "Popular", icon: null },
    { id: "uefa-europa", label: "UEFA Europa League", icon: "🌍" },
    { id: "uefa-champions", label: "UEFA Champions League", icon: "🏆" },
    { id: "copa-libertadores", label: "Copa Libertadores", icon: "🏆" },
    { id: "copa-sudamericana", label: "Copa Sudamericana", icon: "🏆" },
    { id: "uefa-conference", label: "UEFA Conference League", icon: "🏆" },
    { id: "women-champions", label: "Women UEFA Champions Lea...", icon: "🏆" },
    { id: "club-friendly", label: "Club Friendly Games", icon: "⚽" },
    { id: "wc-qualification", label: "WC Qualification, UEFA", icon: "🌍" },
    { id: "world-cup", label: "World Cup", icon: "🏆" },
];
const outrightGroups = [
    {
        title: "World Cup Winner 2026",
        closingDate: "Closes: Mar 23, 20:30",
        options: [
            { name: "Spain", odds: 5.5 },
            { name: "England", odds: 7.0 },
            { name: "Brazil", odds: 9.0 },
            { name: "Argentina", odds: 9.0 },
            { name: "France", odds: 9.0 },
            { name: "Portugal", odds: 11.0 },
            { name: "Germany", odds: 13.0 },
            { name: "Netherlands", odds: 13.0 },
            { name: "Norway", odds: 26.0 },
        ],
        showMore: true,
    },
    {
        title: "Group Qualification",
        closingDate: "Closes: Mar 23, 20:30",
        options: [
            { name: "Brazil", odds: 1.01 },
            { name: "England", odds: 1.01 },
            { name: "Spain", odds: 1.04 },
            { name: "Argentina", odds: 1.02 },
            { name: "Portugal", odds: 1.03 },
            { name: "Germany", odds: 1.03 },
            { name: "Belgium", odds: 1.03 },
            { name: "France", odds: 1.04 },
            { name: "Ecuador", odds: 1.3 },
        ],
        showMore: true,
    },
    {
        title: "Top Goalscorer",
        closingDate: "Closes: Mar 23, 20:30",
        options: [
            { name: "Kylian Mbappe", odds: 7.0 },
            { name: "Harry Kane", odds: 8.0 },
            { name: "Erling Haaland", odds: 15.0 },
            { name: "Lionel Messi", odds: 15.0 },
            { name: "Lamine Yamal", odds: 15.0 },
            { name: "Cristiano Ronaldo", odds: 26.0 },
            { name: "Vini Jr/Bellingham", odds: 25.0 },
            { name: "Ousmane Dembele", odds: 26.0 },
            { name: "Lautaro Martinez", odds: 25.0 },
        ],
        showMore: true,
    },
];
const groupWinners = [
    "Group A Winner", "Group B Winner", "Group C Winner", "Group D Winner",
    "Group E Winner", "Group F Winner", "Group G Winner", "Group H Winner",
    "Group I Winner", "Group J Winner", "Group K Winner", "Group L Winner",
    "To Reach Final", "Winners Group"
];
const popularTagMap: Record<string, { category: string; league: string }> = {
    "UEFA Europa League": {
        category: "soccer",
        league: "uefa-europa",
    },
    "UEFA Champions League": {
        category: "soccer",
        league: "uefa-champions",
    },
    "Penalty Shoot-out (10 shots)": {
        category: "originals",
        league: "penalty-shootout",
    },
    "Saloon Dice (10 rounds)": {
        category: "originals",
        league: "saloon-dice",
    },
    "FA Cup (2x6 min)": {
        category: "soccer",
        league: "fa-cup",
    },
    "Copa del Rey": {
        category: "soccer",
        league: "copa-del-rey",
    },
};
const SearchSportsCategory = ({ activeCategory,
    onBack,
    onSelectCategory,
    onAddBet,
    selectedBets, }: SearchSportsCategoryProps) => {
    const [activeTab, setActiveTab] = useState("1");
    const [query, setQuery] = useState("");
    const [activeLeague, setActiveLeague] = useState("uefa-europa");
    const [activeView, setActiveView] = useState<'matches' | 'outrights'>('matches');
    const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
    const isMobile = useIsMobile();
    const [activeSearchCategory, setActiveSearchCategory] = useState<{
        category: string;
        league: string;
    } | null>(null);
    const categoryName = activeCategory?.category
        ? activeCategory.category.charAt(0).toUpperCase() +
        activeCategory.category.slice(1)
        : "";
    const toggleGroupExpand = (groupTitle: string) => {
        setExpandedGroups(prev =>
            prev.includes(groupTitle)
                ? prev.filter(g => g !== groupTitle)
                : [...prev, groupTitle]
        );
    };
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            {/* Search Input */}
            <div className="flex items-center gap-4 m-6">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search"
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-secondary rounded-lg text-foreground outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <button
                    onClick={() => {
                        onBack();
                        setQuery("");
                    }}
                    className="px-4 py-3 bg-secondary text-foreground rounded-lg hover:bg-muted transition-colors"
                >
                    Close
                </button>
            </div>

            {/* Popular Tags */}
            {/* <div className="flex flex-wrap gap-2 mb-8">
                {Object.keys(popularTagMap).map((tag) => (
                    <button
                        key={tag}
                        className="px-4 py-2 bg-secondary text-foreground text-sm rounded-full hover:bg-muted transition-colors"
                        onClick={() => {
                            setActiveSearchCategory(popularTagMap[tag]);
                            onBack();
                        }}
                    >
                        {tag}
                    </button>
                ))}
            </div> */}


            {/* Empty State */}
            {/* <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-24 h-24 mb-6">
                    <div className="relative">
                        <Search className="w-16 h-16 text-primary" />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full" />
                    </div>
                </div>
                <h3 className="text-xl font-medium mb-2">Looking for something special?</h3>
            </div> */}
            <div className="sticky top-0 z-40 bg-background border-b border-border">
                <div className=" mx-auto px-4 py-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className="p-2 rounded-lg hover:bg-secondary transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <Globe className="w-6 h-6 text-primary" />
                        <h1 className="text-lg font-semibold">{categoryName}</h1>
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <span className="text-sm">All</span>
                            <span className="bg-secondary px-2 py-0.5 rounded text-xs">151</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                    </div>
                </div>
                {/* League Tabs - Horizontal scroll */}
                <div className="mx-auto px-4 py-2">
                    {/* Scroll container */}
                    <div
                        className={cn(
                            "overflow-x-auto scrollbar-hide pb-2",
                            // mobile: right → left scroll
                            "rtl",
                            // desktop: normal
                            "md:ltr"
                        )}
                    >
                        {/* Inner content */}
                        <div
                            className={cn(
                                "flex items-center gap-2 w-max",
                                "ltr"
                            )}
                        >
                            {leagueTabs.map((league) => (
                                <button
                                    key={league.id}
                                    onClick={() => setActiveLeague(league.id)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                                        activeLeague === league.id
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-secondary text-foreground hover:bg-muted"
                                    )}
                                >
                                    {league.icon && <span>{league.icon}</span>}
                                    {league.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>


                {/* Matches / Outrights Toggle */}
                <div className=" mx-auto px-4 pb-3">
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
                            <LayoutGrid className="w-4 h-4" />
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
                            <Trophy className="w-4 h-4" />
                            Outrights
                        </button>
                    </div>
                </div>
            </div>
            {/* Content */}
            <div className="mx-auto px-4 py-6">
                {activeView === 'matches' ? (
                    <div>
                        {/* League Title */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-lg">🌍</span>
                            <h2 className="text-lg font-semibold text-primary">
                                {leagueTabs.find(l => l.id === activeLeague)?.label || "UEFA Europa League"}
                            </h2>
                        </div>
                        {/* Match Cards Grid */}
                        <div className={cn(
                            "grid gap-4",
                            isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-4"
                        )}>
                            {upcomingMatches.map((match) => (
                                <MatchCard
                                    key={match.id}
                                    match={match}
                                    onAddBet={onAddBet}
                                    selectedBets={selectedBets}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        {/* International Label */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-primary">🌍</span>
                            <span className="text-sm text-muted-foreground">International</span>
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </div>
                        {/* World Cup Section */}
                        <div className="flex items-center gap-2 mb-6">
                            <Globe className="w-5 h-5 text-muted-foreground" />
                            <span className="text-foreground font-medium">World Cup</span>
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </div>
                        {/* Outright Groups */}
                        <div className="space-y-6">
                            {outrightGroups.map((group) => (
                                <div key={group.title} className="bg-card rounded-lg border border-border overflow-hidden">
                                    {/* Group Header */}
                                    <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold text-primary">{group.title}</h3>
                                            <p className="text-xs text-muted-foreground">{group.closingDate}</p>
                                        </div>
                                        <ChevronDown className={cn(
                                            "w-5 h-5 text-muted-foreground transition-transform",
                                            expandedGroups.includes(group.title) && "rotate-180"
                                        )} />
                                    </div>
                                    {/* Options Grid */}
                                    <div className={cn(
                                        "p-4",
                                        isMobile ? "grid grid-cols-1 gap-2" : "grid grid-cols-3 gap-2"
                                    )}>
                                        {group.options.map((option) => (
                                            <button
                                                key={option.name}
                                                className="flex items-center justify-between px-4 py-3 bg-secondary rounded-lg hover:bg-muted transition-colors"
                                            >
                                                <span className="text-sm text-foreground">{option.name}</span>
                                                <span className="text-sm font-semibold text-primary">{option.odds.toFixed(1)}</span>
                                            </button>
                                        ))}
                                    </div>
                                    {/* Show More */}
                                    {group.showMore && (
                                        <button className="w-full py-3 text-sm text-muted-foreground hover:text-foreground border-t border-border flex items-center justify-center gap-1">
                                            SHOW MORE
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            {/* Group Winners - Collapsed List */}
                            <div className="space-y-1">
                                {groupWinners.map((winner) => (
                                    <button
                                        key={winner}
                                        onClick={() => toggleGroupExpand(winner)}
                                        className="w-full flex items-center justify-between px-4 py-3 bg-card rounded-lg border border-border hover:bg-secondary transition-colors"
                                    >
                                        <span className="text-sm text-primary">{winner}</span>
                                        <ChevronDown className={cn(
                                            "w-4 h-4 text-muted-foreground transition-transform",
                                            expandedGroups.includes(winner) && "rotate-180"
                                        )} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


export default SearchSportsCategory;