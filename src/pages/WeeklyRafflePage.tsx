import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const myTicketsTabs = ["Active", "Past", "My Winnings"];

const winnerListData = Array.from({ length: 20 }, (_, i) => ({
  no: i + 1,
  name: i < 5
    ? ["TBH738", "Uuywhfctcez", "—щ|з~_ÏÇ—щ|з—", "Coffee_lima", "LaToiteliste"][i]
    : `Player${i + 1}`,
  ticketNumber: Math.floor(Math.random() * 80000000 + 10000000).toString(),
  prize: i < 5
    ? [`₹451,622.40`, `₹316,027.86`, `₹181,043.96`, `₹136,738.72`, `₹95,524.48`][i]
    : `₹8,052.44`,
}));

const raffleRules = [
  { q: "How to Enter", a: "Log in and wager the required daily amount to earn a ticket. Each qualifying wager earns you one ticket automatically." },
  { q: "Weekly Raffle Draw", a: "The weekly raffle draw takes place every Monday at 5:30 PM. Winners are selected randomly from all valid tickets." },
  { q: "Terms and Conditions", a: "Participants must be at least 18 years old. Only verified accounts are eligible. Tickets are non-transferable." },
  { q: "Winning Prize Details:", a: "Prizes are distributed based on ticket number matches. Top prizes go to exact matches, with smaller prizes for partial matches." },
];

const faqItems = [
  "How to earn the \"ticket\"? How many tickets can I collect?",
  "When the winner be announced?",
  "Can I win multiple rewards in a round of weekly raffle?",
  "Can I join the next raffle with \"Old Ticket\"?",
  "Can I know more about the time period?",
];

const WeeklyRafflePage = () => {
  const [mainTab, setMainTab] = useState<"My Tickets" | "Results">("My Tickets");
  const [activeSubTab, setActiveSubTab] = useState("Active");
  const [timeLeft, setTimeLeft] = useState({ days: 1, hours: 21, minutes: 0, seconds: 33 });
  const [currentRound, setCurrentRound] = useState("2026020220000");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) { days = 6; hours = 23; minutes = 59; seconds = 59; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <h1 className="font-bold text-lg">Weekly Raffle</h1>
          <span className="text-xs text-muted-foreground">Game ID: {currentRound}</span>
          <span className="text-primary text-xs cursor-pointer">How To Play?</span>
          <span className="text-xs text-muted-foreground">🎫 <span className="text-primary">Buy</span> get 1 ticket</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-accent/20 to-accent/5 b-radius p-5 sm:p-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-wider text-accent">⭐ SUPER LUCKY DRAW</p>
            <p className="text-2xl sm:text-3xl font-bold text-accent mt-1">₹1,810,489.60</p>
            <p className="text-xs text-muted-foreground mt-2">Next Draw Starts in</p>
            <p className="text-lg font-bold text-primary mt-1">
              {timeLeft.days}d:{timeLeft.hours}h:{timeLeft.minutes}m:{timeLeft.seconds}s
            </p>
            <button className="mt-3 bg-accent text-accent-foreground px-6 py-2 b-radius font-medium text-sm">
              Earn ticket
            </button>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-primary font-bold">79633</span> tickets have been sent this round
            </p>
          </div>
        </div>

        {/* How to Earn Ticket */}
        <div>
          <h3 className="font-bold text-sm mb-3">How to Earn Ticket</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-card b-radius p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl">🎰</div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Log in & Wager <span className="text-primary font-bold">₹8,052.44</span> Daily:
                </p>
                <p className="text-sm font-bold text-accent">+ 1 Ticket</p>
              </div>
            </div>
            <div className="bg-card b-radius p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl">💰</div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Every wager <span className="text-primary font-bold">₹86,554.48</span> :
                </p>
                <p className="text-sm font-bold text-accent">+ 1 Ticket</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: My Tickets / Results */}
        <div className="flex gap-4 border-b border-border">
          {(["My Tickets", "Results"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setMainTab(tab)}
              className={cn(
                "pb-2 text-sm font-medium border-b-2 transition-colors",
                mainTab === tab ? "border-primary text-foreground" : "border-transparent text-muted-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {mainTab === "My Tickets" ? (
          <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-card b-radius p-4">
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-accent" />
                  <span className="text-xs text-muted-foreground">Total tickets: <span className="text-foreground font-bold">0</span></span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Ticket className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Total winning tickets: <span className="text-foreground font-bold">0</span></span>
                </div>
              </div>
              <div className="bg-card b-radius p-4 flex items-center gap-2">
                <span className="text-xs text-destructive">🔴</span>
                <span className="text-xs text-muted-foreground">Total Prize won:</span>
                <span className="text-lg font-bold text-accent">₹0.00</span>
              </div>
            </div>

            {/* Sub Tabs */}
            <div className="flex gap-1 bg-card b-radius p-1">
              {myTicketsTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={cn(
                    "flex-1 py-2 text-sm font-medium b-radius transition-colors text-center",
                    activeSubTab === tab ? "bg-secondary text-foreground" : "text-muted-foreground"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="text-center py-8">
              <p className="text-xs text-muted-foreground mb-4">
                Wager <span className="text-primary font-bold">₹8,052.44</span> to get your daily raffle ticket.
              </p>
              <div className="text-6xl mb-3">🐧</div>
              <p className="text-sm text-muted-foreground">Stay tuned—something's coming!</p>
            </div>
          </div>
        ) : (
          /* Results Tab */
          <div className="space-y-4">
            {/* Round Selector */}
            <div className="flex items-center gap-3">
              <button className="p-1 hover:bg-secondary b-radius"><ChevronLeft className="w-5 h-5" /></button>
              <div className="flex items-center gap-1 bg-card b-radius px-3 py-1.5 text-sm">
                <span className="font-medium">{currentRound}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
              <button className="p-1 hover:bg-secondary b-radius"><ChevronRight className="w-5 h-5" /></button>
              <div className="ml-auto text-xs text-muted-foreground hidden sm:block">
                Draw time: 2/2/2026, 5:30:00 PM
              </div>
              <div className="ml-auto sm:ml-2 text-xs text-muted-foreground flex items-center gap-1">
                <Ticket className="w-3 h-3 text-accent" />
                Total participated tickets: <span className="text-accent font-bold">272935</span>
              </div>
            </div>

            {/* Winner List */}
            <div className="text-center font-bold text-lg mb-3">Winner List</div>
            <div className="bg-card b-radius overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left p-3 font-medium">No.</th>
                    <th className="text-left p-3 font-medium">Winner Name</th>
                    <th className="text-center p-3 font-medium">Ticket Numbers</th>
                    <th className="text-right p-3 font-medium">Prize</th>
                  </tr>
                </thead>
                <tbody>
                  {winnerListData.map((w, i) => (
                    <tr key={i} className={cn(
                      "border-b border-border/50",
                      i % 2 === 0 ? "bg-card" : "bg-secondary/20"
                    )}>
                      <td className="p-3 text-muted-foreground">No. {w.no}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-400 to-orange-500 shrink-0" />
                          <span className="font-medium truncate max-w-[120px]">{w.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <span className="bg-yellow-500 text-black px-3 py-0.5 b-radius text-xs font-bold">
                          {w.ticketNumber}
                        </span>
                      </td>
                      <td className="p-3 text-right text-accent font-medium">+ {w.prize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <button className="p-1 hover:bg-secondary b-radius"><ChevronLeft className="w-4 h-4" /></button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "w-8 h-8 b-radius text-sm font-medium",
                    currentPage === page ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-secondary"
                  )}
                >
                  {page < 10 ? `0${page}` : page}
                </button>
              ))}
              <button className="p-1 hover:bg-secondary b-radius"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {/* Raffle Rules */}
        <div>
          <h3 className="font-bold text-lg mb-3">Raffle Rules</h3>
          <Accordion type="single" collapsible className="space-y-2">
            {raffleRules.map((rule, i) => (
              <AccordionItem key={i} value={`rule-${i}`} className="bg-card b-radius border-none px-4">
                <AccordionTrigger className="text-sm font-medium hover:no-underline py-3">
                  {rule.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-3">
                  {rule.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* FAQ */}
        <div>
          <h3 className="font-bold text-lg mb-3">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card b-radius border-none px-4">
                <AccordionTrigger className="text-sm font-medium hover:no-underline py-3">
                  {item}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-3">
                  Details will be provided here. Check back for updates on this topic.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default WeeklyRafflePage;
