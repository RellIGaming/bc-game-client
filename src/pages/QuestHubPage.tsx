import { useState, useEffect } from "react";
import { Info, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import questBanner from "@/assets/images/quest-bonus.png";

const tabs = ["Daily Quests", "Weekly Quests", "Special"];

const dailyQuests = [
  {
    title: "Baccarat Multiplayer Master",
    desc: "Winning streak of 3 rounds in Baccarat Multiplayer with bets greater than $0.4.",
    reward: "0.1 BCD",
    gameUrl: "/game/baccarat",
  },
  {
    title: "Roulette Multiplayer Master",
    desc: "Winning streak of 3 rounds in Roulette Multiplayer with bets greater than $0.4.",
    reward: "0.1 BCD",
    gameUrl: "/game/roulette",
  },
  {
    title: "Just wager on",
    desc: "Daily wager reaches $100.",
    reward: "0.2 BCD",
    gameUrl: null,
  },
];

const weeklyQuests = [
  {
    title: "Activate Rakeback Bonus Boost!",
    desc: "Place total bets of at least 700 this week to activate a Rakeback Boost. For the next 60 minutes, all your Rakeback rewards will be increased by 10%!",
    reward: "BCD0 / BCD700",
    status: "In progress",
    gameUrl: null,
  },
];

const QuestHubPage = () => {
  const [activeTab, setActiveTab] = useState("Daily Quests");
  const [timeLeft, setTimeLeft] = useState({ hours: 9, minutes: 22, seconds: 38 });
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) return { hours: 23, minutes: 59, seconds: 59 };
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    if (activeTab === "Weekly Quests") return "06d 09h 20m";
    return `${String(timeLeft.hours).padStart(2, "0")}h ${String(timeLeft.minutes).padStart(2, "0")}m ${String(timeLeft.seconds).padStart(2, "0")}s`;
  };

  const quests = activeTab === "Daily Quests" ? dailyQuests : activeTab === "Weekly Quests" ? weeklyQuests : [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold">Quest Hub</h1>

        {/* Banner */}
        <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-primary/30 to-primary/10 p-6">
          <div>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Accumulated rewards</p>
            <p className="text-2xl font-bold mt-1">🟣 0 BCD</p>
          </div>
          <img src={questBanner} alt="" className="absolute right-4 top-2 w-32 h-28 object-contain hidden sm:block" />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-3 text-sm font-medium text-center border-b-2 transition-colors",
                activeTab === tab ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Timer & Previous */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Expires in <span className="text-foreground font-bold">{formatTime()}</span>
          </p>
          <button className="text-sm text-muted-foreground flex items-center gap-1 hover:text-foreground">
            <Clock className="w-4 h-4" /> Previous Quests <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Quest Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quests.map((quest, i) => (
            <div key={i} className="bg-card rounded-lg p-4 flex items-start gap-4">
              <div className="w-12 h-12 text-3xl flex items-center justify-center shrink-0">🪙</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-sm">{quest.title}</h3>
                  <Info className="w-3 h-3 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{quest.desc}</p>
                {"status" in quest ? (
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">{quest.status}</p>
                    <p className="text-xs mt-1">🟣 <span className="font-bold">{quest.reward}</span></p>
                  </div>
                ) : (
                  <p className="text-xs text-primary mt-2">🟣 Earn {quest.reward}</p>
                )}
              </div>
              {quest.gameUrl && (
                <Button
                  size="sm"
                  onClick={() => navigate(quest.gameUrl!)}
                  className="bg-primary text-primary-foreground rounded-full px-5 shrink-0"
                >
                  Go
                </Button>
              )}
            </div>
          ))}
        </div>

        {activeTab === "Special" && (
          <div className="bg-card rounded-lg p-12 text-center">
            <div className="text-5xl mb-4">🎁</div>
            <p className="text-muted-foreground">Stay tuned—something's coming!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestHubPage;
