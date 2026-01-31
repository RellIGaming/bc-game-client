import { useState } from 'react';
import { BetItem, BetSlipTab } from '@/types/sports';
import { cn } from '@/lib/utils';
import { X, ChevronDown, Trash2, Settings, AlertCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import logo from "../../assets/images/logo.png"

interface BetSlipProps {
  bets: BetItem[];
  onRemoveBet: (betId: string) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function BetSlip({ bets, onRemoveBet, onClearAll, isOpen, onToggle }: BetSlipProps) {
  const [activeTab, setActiveTab] = useState<BetSlipTab>('single');
  const [quickBet, setQuickBet] = useState(false);
  const [stake, setStake] = useState(50);
  const [isExpanded, setIsExpanded] = useState(true);

  const tabs: { id: BetSlipTab; label: string }[] = [
    { id: 'single', label: 'Single' },
    { id: 'combo', label: 'Combo' },
    { id: 'system', label: 'System' },
  ];

  const totalOdds = bets.reduce((acc, bet) => acc * bet.odds, 1);
  const potentialWin = stake * totalOdds;

  if (!isOpen && bets.length === 0) return null;

  return (
    <> 
    <div className="fixed bottom-0 right-4 z-50 w-80 max-w-[calc(70vw-2rem)]">
      {/* Collapsed Header */}
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex items-center justify-between px-4 py-3 rounded-t-lg transition-all',
          quickBet
            ? 'bg-primary'
            : 'bg-primary border border-border'
        )}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <span className="w-6 h-6">📋</span>
          </div>
          <span className="font-medium">Betslip</span>
          {bets.length > 0 && (
            <span className="w-5 h-5 text-primary-foreground text-xs rounded-full flex items-center justify-center">
              {bets.length}
            </span>
          )}
          <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#ffffff]">QUICK BET</span>
          <Switch
            checked={quickBet}
            onCheckedChange={setQuickBet}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </button>

      {/* Expanded Content */}
      {isOpen && (
        <div className="bg-card border border-t-0 border-border  shadow-2xl animate-slide-up overflow-hidden">
          {quickBet ? (
            /* Quick Bet Mode */
            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-2">
                QuickBet mode is on! After single click on any selection, it will place your bet immediately.
              </p>
              <p className="text-sm text-muted-foreground">
                See all your bets on{' '}
                <a href="#" className="text-primary hover:underline">
                  My Bets page
                </a>
              </p>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="w-4 h-4" />
                <span>Please, login to place bet</span>
              </div>
              <button className="w-full mt-4 py-3 bg-primary text-primary-foreground b-radius font-medium hover:bg-betting-green-hover transition-colors">
                LOGIN
              </button>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Don't you have an account?{' '}
                <a href="#" className="text-primary hover:underline">
                  Join Now!
                </a>
              </p>
            </div>
          ) : (
            /* Normal Mode */
            <>
              {/* Tabs */}
              <div className="flex border-b border-border">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex-1 py-3 text-sm font-medium transition-colors',
                      activeTab === tab.id
                        ? 'text-foreground border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Bets List */}
              <div className="max-h-24 overflow-y-auto ">
                {bets.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    <p className="text-sm">No bets added yet</p>
                  </div>
                ) : (
                  <div className="p-3 space-y-3">
                    {bets.map((bet) => (
                      <div key={bet.id} className="bg-secondary rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-1">
                              <span className="text-xs">⚽</span>
                              <span className="text-sm font-medium text-primary">{bet.selection}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{bet.matchName}</p>
                            <p className="text-xs text-muted-foreground">{bet.market}</p>
                          </div>
                          <button
                            onClick={() => onRemoveBet(bet.id)}
                            className="p-1 hover:bg-muted rounded transition-colors"
                          >
                            <X className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                        <div className="text-lg font-bold text-primary">{bet.odds.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Combo Boost (for combo tab) */}
              {activeTab === 'combo' && bets.length >= 2 && (
                <div className="px-3 pb-3">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs text-yellow-500">
                        MIN ODDS 1.5 COMBOBOOST
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {bets.length} bets left to get x1.05 boost on your winnings!
                    </p>
                    <div className="flex gap-1">
                      {['x1.05', 'x1.15', 'x1.25', 'x1.5'].map((boost, i) => (
                        <div
                          key={boost}
                          className={cn(
                            'flex-1 py-1 text-center text-xs rounded',
                            i === 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                          )}
                        >
                          {boost}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Stake and Actions */}
              {bets.length > 0 && (
                <div className="p-3 border-t border-border">
                  {/* Quick Amount Buttons */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1 text-sm text-primary">
                      <img src={logo} alt="logo" className='w-4 h-4' />
                      <span className="font-medium">Rellbet</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                      <input
                        type="number"
                        value={stake}
                        onChange={(e) => setStake(Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-2 bg-secondary rounded-lg text-foreground outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[200, 500, 2000, 5000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setStake(amount)}
                        className="py-2 bg-secondary rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                      >
                        {amount}
                      </button>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="space-y-1 mb-3">
                    {activeTab === 'combo' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Odds</span>
                        <span>{totalOdds.toFixed(3)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Bet</span>
                      <span>₹ {stake}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-muted-foreground">POTENTIAL WIN</span>
                      <span className="text-primary">
                        ₹ {activeTab === 'combo' ? potentialWin.toFixed(1) : (stake * bets[0]?.odds || 0).toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Login Notice */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <AlertCircle className="w-4 h-4" />
                    <span>Please, login to place bet</span>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <button className="w-full py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-muted transition-colors">
                      BOOK
                    </button>
                    <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-betting-green-hover transition-colors">
                      LOGIN
                    </button>
                  </div>

                  <p className="text-center text-sm text-muted-foreground mt-3">
                    Don't you have an account?{' '}
                    <a href="#" className="text-primary hover:underline">
                      Join Now!
                    </a>
                  </p>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                    <button
                      onClick={onClearAll}
                      className="p-2 hover:bg-muted rounded transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <Settings className="w-4 h-4" />
                      <span>Odds Settings</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
    {/* ===== MOBILE BETSLIP FAB ===== */}
<button
  onClick={onToggle}
  className="md:hidden fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center"
>
  <span className="text-xl">📋</span>
  {bets.length > 0 && (
    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
      {bets.length}
    </span>
  )}
</button>
</>
  );
}
