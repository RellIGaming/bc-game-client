import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { BetItem, SportCategory } from '@/types/sports';
import { betsFeedData, sportCategories } from '@/lib/sportsData';

interface BetsFeedTabProps {
  onAddBet: (bet: BetItem) => void;
}

export function BetsFeedTab({ onAddBet }: BetsFeedTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<SportCategory | 'all'>('all');

  const categories = [
    { id: 'all', name: 'All', icon: '🎯' },
    ...sportCategories.slice(0, 10),
  ];

  const filteredBets =
    selectedCategory === 'all'
      ? betsFeedData
      : betsFeedData.filter((bet) => bet.sport === selectedCategory);

  const handleAddToBetSlip = (item: typeof betsFeedData[0]) => {
    onAddBet({
      id: `feed-${item.id}`,
      matchId: item.id,
      matchName: item.event,
      selection: item.outcome,
      odds: item.odds,
      market: 'Bets Feed',
    });
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as SportCategory | 'all')}
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

      {/* Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="py-3 px-4 font-medium">Event</th>
              <th className="py-3 px-4 font-medium">Outcome</th>
              <th className="py-3 px-4 font-medium text-right">Odds</th>
              <th className="py-3 px-4 font-medium text-right">Stake</th>
              <th className="py-3 px-4 font-medium text-right">Potential Win</th>
              <th className="py-3 px-4 font-medium text-right">User</th>
              <th className="py-3 px-4 font-medium text-right"></th>
            </tr>
          </thead>
          <tbody>
            {filteredBets.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border hover:bg-muted/50 transition-colors"
              >
                <td className="py-2 px-4">
                  <div className="flex items-center gap-2">
                    {item.type === 'combo' && (
                      <span className="px-2 py-0.5 bg-primary text-muted-foreground text-xs rounded">
                        Combo
                      </span>
                    )}
                    <span className="text-[10px] font-medium text-left text-muted-foreground max-w-[150px] truncate">{item.event}</span>
                  </div>
                </td>
                <td className="text-[10px] font-medium text-left py-2 px-4 text-muted-foreground max-w-[150px] truncate">
                  {item.outcome}
                </td>
                <td className="text-[10px] font-medium py-2 px-4 text-right text-muted-foreground">{item.odds.toFixed(3)}</td>
                <td className="text-[10px] font-medium py-2 px-4 text-right text-muted-foreground">{item.stake}</td>
                <td className=" text-[10px] font-medium py-2 px-4 text-right text-muted-foreground">{item.potentialWin}</td>
                <td className="text-[10px] font-medium py-2 px-4 text-right text-muted-foreground">{item.user}</td>
                <td className="py-2 px-4 text-right font-medium">
                  <button
                    onClick={() => handleAddToBetSlip(item)}
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-primary text-primary-foreground font-medium rounded hover:bg-betting-green-hover transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span className='text-[10px] text-secondary-foreground font-medium'>ADD TO BETSLIP</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* ===== MOBILE VIEW (Cards) ===== */}
      <div className="space-y-2 md:hidden">
        {filteredBets.map((item) => (
          <div
            key={item.id}
            className="border border-border rounded-md p-3 hover:bg-muted/50 transition-colors"
          >
            {/* Top */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {item.type === "combo" && (
                    <span className="px-2 py-0.5 bg-primary text-muted-foreground text-[10px] rounded">
                      Combo
                    </span>
                  )}
                  <span className="text-[10px] font-medium text-muted-foreground truncate max-w-[200px]">
                    {item.event}
                  </span>
                </div>

                <span className="block text-[10px] font-medium text-muted-foreground truncate max-w-[200px]">
                  {item.outcome}
                </span>
              </div>

              <button
                onClick={() => handleAddToBetSlip(item)}
                className="shrink-0 inline-flex items-center gap-1 px-3 py-1 text-xs bg-primary text-primary-foreground font-medium rounded hover:bg-betting-green-hover transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span className="text-[10px] font-medium">ADD</span>
              </button>
            </div>

            {/* Divider */}
            <div className="my-2 border-t border-border" />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground">
              <div className="flex justify-between">
                <span>Odds</span>
                <span className="font-medium">{item.odds.toFixed(3)}</span>
              </div>

              <div className="flex justify-between">
                <span>Stake</span>
                <span className="font-medium">{item.stake}</span>
              </div>

              <div className="flex justify-between">
                <span>Win</span>
                <span className="font-medium">{item.potentialWin}</span>
              </div>

              <div className="flex justify-between">
                <span>User</span>
                <span className="font-medium">{item.user}</span>
              </div>
            </div>
          </div>
        ))}
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
