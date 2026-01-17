import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import LiveChat from "@/components/layout/LiveChat";
import SearchModal from "@/components/layout/SearchModal";
import LanguageCurrencyModal from "@/components/layout/LanguageCurrencyModal";
import MobileNav from "@/components/layout/MobileNav";
import SignUpModal from "@/components/auth/SignUpModal";
import SignInModal from "@/components/auth/SignInModal";
import ResetPasswordModal from "@/components/auth/ResetPasswordModal";
import UserProfilePanel from "@/components/auth/UserProfilePanel";
import HeroSection from "@/components/home/HeroSection";
import RecentBigWins from "@/components/home/RecentBigWins";
import CategoryCards from "@/components/home/CategoryCards";
import BCOriginals from "@/components/home/BCOriginals";
import LiveSports from "@/components/home/LiveSports";
import BCExclusive from "@/components/home/BCExclusive";
import Slots from "@/components/home/Slots";
import UpcomingLottery from "@/components/home/UpcomingLottery";
import LiveCasino from "@/components/home/LiveCasino";
import DepositBonus from "@/components/home/DepositBonus";
import BingoGames from "@/components/home/BingoGames";
import LatestRoundRace from "@/components/home/LatestRoundRace";
import HotGames from "@/components/home/HotGames";
import Footer from "@/components/home/Footer";
import NewGame from "@/components/home/NewGame";

const Index = () => {
  const [isDark, setIsDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("casino");

  useEffect(() => {
    document.documentElement.classList.remove("light");
    if (!isDark) {
      document.documentElement.classList.add("light");
    }
  }, [isDark]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
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

  const toggleTheme = () => setIsDark(!isDark);
  const handleSwitchToSignIn = () => { setSignUpOpen(false); setSignInOpen(true); };
  const handleSwitchToSignUp = () => { setSignInOpen(false); setSignUpOpen(true); };
  const handleForgotPassword = () => { setSignInOpen(false); setResetPasswordOpen(true); };
  const handleBackToLogin = () => { setResetPasswordOpen(false); setSignInOpen(true); };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onSearchClick={() => setSearchOpen(true)}
        onChatClick={() => setChatOpen(!chatOpen)}
        onSignInClick={() => setSignInOpen(true)}
        onSignUpClick={() => setSignUpOpen(true)}
        onLanguageClick={() => setLanguageOpen(true)}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        isSidebarCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex pt-14">
        <Sidebar
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onClose={() => setSidebarOpen(false)}
          isDark={isDark}
          onThemeToggle={toggleTheme}
          onLanguageClick={() => setLanguageOpen(true)}
        />

        <main 
          className="flex-1 min-w-0 pb-20 lg:pb-0 transition-all duration-300"
          style={{ marginLeft: sidebarOpen ? (sidebarCollapsed ? 64 : 240) : 0 }}
        >
          <div className="px-3 lg:px-6 py-4 lg:py-5 space-y-5 lg:space-y-6">
            <HeroSection onSignUp={() => setSignUpOpen(true)} />
            <RecentBigWins />
            <CategoryCards />
            <BCOriginals />
            <LiveSports />
            <BCExclusive />
            <Slots />
            <UpcomingLottery />
            <LiveCasino />
            <DepositBonus />
            <BingoGames />
            <LatestRoundRace />
            <HotGames />
            <NewGame/>
          </div>
          <Footer />
        </main>

        <LiveChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </div>

      <MobileNav
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onSearchClick={() => setSearchOpen(true)}
        onChatClick={() => setChatOpen(!chatOpen)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <LanguageCurrencyModal isOpen={languageOpen} onClose={() => setLanguageOpen(false)} />
      <SignUpModal isOpen={signUpOpen} onClose={() => setSignUpOpen(false)} onSwitchToSignIn={handleSwitchToSignIn} />
      <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} onSwitchToSignUp={handleSwitchToSignUp} onForgotPassword={handleForgotPassword} />
      <ResetPasswordModal isOpen={resetPasswordOpen} onClose={() => setResetPasswordOpen(false)} onBackToLogin={handleBackToLogin} />
      <UserProfilePanel isOpen={profileOpen} onClose={() => setProfileOpen(false)} />

      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-20 right-4 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg gaming-glow lg:hidden flex items-center justify-center z-30"
      >
        <span className="text-xl">💬</span>
      </button>
    </div>
  );
};

export default Index;
