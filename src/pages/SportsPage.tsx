import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/home/Footer";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import SportsCategoryTabs from "@/components/sports/SportsCategoryTabs";

interface SportsPageProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const SportsPage=({ isLoggedIn, setIsLoggedIn }: SportsPageProps) => {
 const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
   const [isMobile, setIsMobile] = useState(false);
   const toggleTheme = () => setIsDark(!isDark);

   const getMainMargin = () => {
    if (isMobile) return 0;
    if (!sidebarOpen) return 0;
    return sidebarCollapsed ? 64 : 240;
  };
  useEffect(() => {
    document.documentElement.classList.remove("light");
    if (!isDark) {
      document.documentElement.classList.add("light");
    }
  }, [isDark]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
        setSidebarCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [activeTab, setActiveTab] = useState("highlights");
  const [betSlipOpen, setBetSlipOpen] = useState(false);
  const [betRows, setBetRows] = useState([]);
  const [quickBet, setQuickBet] = useState(false);

  const addBet = (bet) => {
    setBetSlipOpen(true);
    setBetRows((prev) => [...prev, bet]);
  };

  return (
   <div className="h-screen flex flex-col overflow-hidden bg-background">
       <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onSearchClick={() => setSearchOpen(true)}
        onChatClick={() => setChatOpen(!chatOpen)}
        onSignInClick={() => setSignInOpen(true)}
        onSignUpClick={() => setSignUpOpen(true)}
        onLanguageClick={() => setLanguageOpen(true)}
        onCurrencyClick={() => setCurrencyOpen(true)}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        isSidebarCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        isLoggedIn={isLoggedIn}
        onLogout={() => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }}
      />

      <div className="flex flex-1 pt-14 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onClose={() => setSidebarOpen(false)}
          isDark={isDark}
          onThemeToggle={toggleTheme}
          onLanguageClick={() => setLanguageOpen(true)}
          onCurrencyClick={() => setCurrencyOpen(true)}
          onChatClick={() => setChatOpen(!chatOpen)}
        />

        <main 
          className="flex-1 min-w-0 pb-20 lg:pb-0 transition-all duration-300 overflow-y-auto custom-scrollbar"
          style={{ marginLeft: getMainMargin() }}
        >
        {/* TOP TABS */}
        <SportsCategoryTabs/>
        <div className="flex gap-2 p-3 ml-2">
          {["highlights", "event", "betsfeed"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 b-radius text-sm font-medium ${activeTab === t ? "bg-primary text-white" : "bg-secondary"}`}
            >
              {t === "highlights" && "Highlights"}
              {t === "event" && "Event Builder"}
              {t === "betsfeed" && "Bets Feed"}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "highlights" && <Highlights addBet={addBet} />}
          {activeTab === "event" && <EventBuilder addBet={addBet} />}
          {activeTab === "betsfeed" && <BetsFeed addBet={addBet} />}
        </div>
      
          <Footer />
        </main>
</div>
      {/* BET SLIP MODAL */}
      <AnimatePresence>
        {betSlipOpen && (
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            className="fixed bottom-4 right-4 w-80 bg-card b-radius shadow-xl border border-border z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-3 border-b">
              <span className="font-semibold">Bet Slip</span>
              <button onClick={() => setBetSlipOpen(false)}>✕</button>
            </div>

            {/* QUICK BET TOGGLE */}
            <div className="p-2 border-b flex items-center justify-between">
              <span className="text-sm">Quick Bet</span>
              <button
                onClick={() => setQuickBet(!quickBet)}
                className={`w-10 h-5 rounded-full ${quickBet ? "bg-primary" : "bg-secondary"}`}
              />
            </div>

            {/* BET ROWS */}
            {!quickBet && (
              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {betRows.map((b, i) => (
                  <div key={i} className="p-2 bg-secondary b-radius text-sm">
                    {b}
                  </div>
                ))}
              </div>
            )}

            {/* FOOTER */}
            <div className="p-3 border-t">
              <button className="w-full py-2 bg-primary text-white b-radius">Place Bet</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Highlights({ addBet }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-card p-4 b-radius border">
          <div className="font-semibold">Match {i}</div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <button onClick={() => addBet(`Match ${i} - Option 1`)} className="bg-secondary p-2 rounded">1</button>
            <button onClick={() => addBet(`Match ${i} - Draw`)} className="bg-secondary p-2 rounded">X</button>
            <button onClick={() => addBet(`Match ${i} - Option 2`)} className="bg-secondary p-2 rounded">2</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function EventBuilder({ addBet }) {
  const [sport, setSport] = useState("soccer");
  const [time, setTime] = useState("today");

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <select value={sport} onChange={(e) => setSport(e.target.value)} className="bg-secondary p-2 b-radius">
          <option value="soccer">Soccer</option>
          <option value="basketball">Basketball</option>
        </select>
        <select value={time} onChange={(e) => setTime(e.target.value)} className="bg-secondary p-2 b-radius">
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card p-4 b-radius border">
            <div className="font-semibold">Event {i}</div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <button onClick={() => addBet(`Event ${i} - 1`)} className="bg-secondary p-2 rounded">1</button>
              <button onClick={() => addBet(`Event ${i} - X`)} className="bg-secondary p-2 rounded">X</button>
              <button onClick={() => addBet(`Event ${i} - 2`)} className="bg-secondary p-2 rounded">2</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BetsFeed({ addBet }) {
  return (
    <div className="space-y-6">
      {["Soccer", "Basketball", "Tennis"].map((cat) => (
        <div key={cat}>
          <h3 className="font-semibold mb-2">{cat}</h3>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card p-3 b-radius flex justify-between items-center border">
                <span>{cat} Match {i}</span>
                <button onClick={() => addBet(`${cat} Match ${i}`)} className="bg-primary text-white px-3 py-1 rounded">Add</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


export default SportsPage;