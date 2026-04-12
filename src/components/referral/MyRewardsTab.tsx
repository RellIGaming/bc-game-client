import { useEffect, useState } from "react";
import { Info, Search, X, ChevronDown, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useReferralStore } from "@/store/walletStore";
import { useNavigate } from "react-router-dom";

const subTabs = ["Commission by Friends", "Commission by Currency", "Level Up Rewards"];

export default function MyRewardsTab() {
  const {
    rewardsSummary,
    commissionByFriends,
    commissionByCurrency,
    levelRewards,
    rewardHistory,

    fetchRewardsSummary,
    fetchCommissionByFriends,
    fetchCommissionByCurrency,
    fetchLevelRewards,
    fetchRewardHistory
  } = useReferralStore();
const navigate = useNavigate();
  console.log(rewardsSummary,"rewardsSummary" )
  const [subTab, setSubTab] = useState("Commission by Friends");
  const [allCodesOpen, setAllCodesOpen] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [historyType, setHistoryType] = useState("Commission Rewards");
  const [historyDropdown, setHistoryDropdown] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    fetchRewardsSummary();
    fetchCommissionByFriends();
  }, []);
  useEffect(() => {
    if (historyOpen) {
      fetchRewardHistory(historyType === "Commission Rewards" ? "COMMISSION" : "REFERRAL");
    }
  }, [historyOpen, historyType]);
  const [selectedRegDate, setSelectedRegDate] = useState<Date | undefined>(undefined);
  const [selectedWagerStart, setSelectedWagerStart] = useState<Date | undefined>(new Date(2026, 0, 11));
  const [selectedWagerEnd, setSelectedWagerEnd] = useState<Date | undefined>(new Date(2026, 3, 11));

  const HistoryContent = ({ onClose }: { onClose: () => void }) => (
    <div className="flex flex-col h-full">
      {isMobile ? (
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <button onClick={onClose}><ArrowLeft className="w-5 h-5" /></button>
          <h3 className="font-semibold text-primary">Reward History</h3>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-primary">Reward History</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
      )}
      <div className="p-4 space-y-4">
        <div className="relative">
          <button
            onClick={() => setHistoryDropdown(!historyDropdown)}
            className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-2 text-sm"
          >
            {historyType} <ChevronDown className="w-4 h-4" />
          </button>
          {historyDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-10 w-56">
              {["Commission Rewards", "Referral Rewards"].map((t) => (
                <button
                  key={t}
                  onClick={() => { setHistoryType(t); setHistoryDropdown(false); }}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-secondary transition-colors"
                >
                  {t}
                  <span className={cn("w-4 h-4 rounded-full border-2", historyType === t ? "bg-primary border-primary" : "border-muted-foreground")} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 text-xs text-muted-foreground px-2">
          <span>Amount</span><span>Time</span><span>Status</span>
        </div>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🦖</div>
          <p className="text-muted-foreground text-sm font-medium">Stay tuned—something's coming!</p>
        </div>
      </div>
    </div>
  );

  const RulesContent = ({ onClose }: { onClose: () => void }) => (
    <div className="flex flex-col h-full">
      {isMobile ? (
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <button onClick={onClose}><ArrowLeft className="w-5 h-5" /></button>
          <h3 className="font-semibold">Referral Rules</h3>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold">Referral Rules</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
      )}
      <div className="p-4 space-y-3 text-sm text-muted-foreground overflow-y-auto">
        <p>1. Share your referral link or code with friends.</p>
        <p>2. Your friend signs up using your referral link/code.</p>
        <p>3. You earn commission on their wagers automatically.</p>
        <p>4. Commission rates vary by game type (Casino: 25%, Sports: 25%).</p>
        <p>5. Referral rewards are unlocked as your friend levels up in VIP.</p>
        <p>6. You can create up to 20 referral codes.</p>
        <p>7. Commission is calculated and paid in real-time.</p>
        <p>8. You can withdraw rewards to your wallet at any time.</p>
      </div>
    </div>
  );

  const renderSubTabContent = () => {
    switch (subTab) {
      case "Commission by Friends":
        return (
          <>
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <button
                  onClick={() => setAllCodesOpen(!allCodesOpen)}
                  className="flex items-center gap-2 bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm min-w-[160px]"
                >
                  All Codes <ChevronDown className="w-4 h-4 ml-auto" />
                </button>
                {allCodesOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-10 w-48">
                    {["All Codes", "Code 1", "Code 2"].map(c => (
                      <button key={c} onClick={() => setAllCodesOpen(false)} className="w-full text-left px-4 py-2.5 text-sm hover:bg-secondary">{c}</button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm flex-1 min-w-[180px] max-w-[280px]">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  placeholder="Search UserName"
                  className="bg-transparent outline-none w-full text-sm"
                />
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 border border-border bg-secondary rounded-lg px-4 py-2.5 text-sm">
                    Registration Date: {selectedRegDate ? format(selectedRegDate, "yyyy/MM/dd") : "All Range"}
                    {selectedRegDate && (
                      <span onClick={(e) => { e.stopPropagation(); setSelectedRegDate(undefined); }}>
                        <X className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedRegDate}
                    onSelect={setSelectedRegDate}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 border border-border bg-secondary rounded-lg px-4 py-2.5 text-sm">
                    Wager Date: {selectedWagerStart && selectedWagerEnd
                      ? `${format(selectedWagerStart, "yyyy/MM/dd")}-${format(selectedWagerEnd, "yyyy/MM/dd")}`
                      : "All Range"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedWagerEnd}
                    onSelect={(d) => setSelectedWagerEnd(d)}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Table */}
            <div className="bg-card rounded-xl overflow-x-auto">
              <div className="min-w-[700px]">
                <div className="grid grid-cols-6 text-xs text-muted-foreground px-4 py-3 border-b border-border">
                  <span>Username</span>
                  <span>User ID</span>
                  <span>Commission Rate</span>
                  <span>Total Deposits (Past 7D)</span>
                  <span>Registration Date</span>
                  <span className="text-right">Total Commission</span>
                </div>
                <div className="text-center py-16">
                  {commissionByFriends.length === 0 ? (
                    <p>empty</p>
                  ) : (
                    commissionByFriends.map((f) => (
                      <div key={f.userId} className="grid grid-cols-6 px-4 py-2">
                        <span>{f.username}</span>
                        <span>{f.userId}</span>
                        <span>{f.commissionRate}</span>
                        <span>₹{f.totalDeposit7d}</span>
                        <span>{new Date(f.registrationDate).toLocaleDateString()}</span>
                        <span className="text-right">₹{f.totalCommission}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        );

      case "Commission by Currency":
        return (
          <div className="bg-card rounded-xl text-center py-16">
            {commissionByCurrency.map((c) => (
              <div key={c.currency}>
                {c.currency} - ₹{c.totalCommission}
              </div>
            ))}
          </div>
        );

      case "Level Up Rewards":
        return (
          <>
            {/* Filter - only Registration Date */}
            <div className="flex flex-wrap gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 border border-border bg-secondary rounded-lg px-4 py-2.5 text-sm">
                    Registration Date: {selectedRegDate ? format(selectedRegDate, "yyyy/MM/dd") : "All Range"}
                    {selectedRegDate && (
                      <span onClick={(e) => { e.stopPropagation(); setSelectedRegDate(undefined); }}>
                        <X className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedRegDate}
                    onSelect={setSelectedRegDate}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Table */}
            <div className="bg-card rounded-xl overflow-x-auto">
              <div className="min-w-[500px]">
                <div className="grid grid-cols-5 text-xs text-muted-foreground px-4 py-3 border-b border-border">
                  <span>Username</span>
                  <span>Registration Date</span>
                  <span>VIP Level</span>
                  <span>Code</span>
                  <span className="text-right">Earned</span>
                </div>
                <div className="text-center py-16">
                  {levelRewards.map((l, i) => (
                    <div key={i}>
                      {l.username} - VIP {l.vipLevel} - ₹{l.earned}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Rewards Summary */}
      <div className="bg-card rounded-xl p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 flex flex-col sm:flex-row gap-6 w-full">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Available Commission Rewards <Info className="w-3.5 h-3.5" />
              </div>
              <p className="text-2xl font-bold text-primary">₹{rewardsSummary?.availableCommission || 0}</p>
              <p className="text-xs text-muted-foreground">Total Received <span className="text-foreground font-medium">$0.00</span></p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Available Referral Rewards <Info className="w-3.5 h-3.5" />
              </div>
              <p className="text-2xl font-bold text-primary">₹{rewardsSummary?.availableReferral || 0}</p>
              <p className="text-xs text-muted-foreground">
                Total Received <span className="text-foreground font-medium">$0.00</span>
                {" "}Locked Rewards <span className="text-foreground font-medium">$0.00</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button  onClick={() => navigate("/wallet/swap")} variant="ghost" className="text-muted-foreground">Swap</Button>
            <Button onClick={() => navigate("/wallet/withdraw")} className="bg-primary text-primary-foreground px-6">Withdraw to Wallet</Button>
          </div>
        </div>
      </div>

      {/* Sub Tabs + Actions */}
      <div className="bg-card rounded-xl p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex gap-1 overflow-x-auto">
            {subTabs.map((t) => (
              <button
                key={t}
                onClick={() => setSubTab(t)}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                  subTab === t
                    ? "text-foreground border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setRulesOpen(true)}>
              📋 Rules
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setHistoryOpen(true)}>
              🕐 History &gt;
            </Button>
          </div>
        </div>
      </div>

      {renderSubTabContent()}

      {/* History Modal */}
      {isMobile ? (
        <Sheet open={historyOpen} onOpenChange={setHistoryOpen}>
          <SheetContent side="right" className="w-full sm:max-w-md p-0">
            <HistoryContent onClose={() => setHistoryOpen(false)} />
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
          <DialogContent className="max-w-md p-0">
            <HistoryContent onClose={() => setHistoryOpen(false)} />
          </DialogContent>
        </Dialog>
      )}

      {/* Rules Modal */}
      {isMobile ? (
        <Sheet open={rulesOpen} onOpenChange={setRulesOpen}>
          <SheetContent side="right" className="w-full sm:max-w-md p-0">
            <RulesContent onClose={() => setRulesOpen(false)} />
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={rulesOpen} onOpenChange={setRulesOpen}>
          <DialogContent className="max-w-md p-0">
            <RulesContent onClose={() => setRulesOpen(false)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
