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
import HelpUs from "@/components/home/HelpUs";
import Providers from "@/components/home/Providers";

interface IndexProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}
const Index = ({ isLoggedIn, setIsLoggedIn }: IndexProps) => {
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
  const [isMobile, setIsMobile] = useState(false);

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

  const toggleTheme = () => setIsDark(!isDark);
  const handleSwitchToSignIn = () => { setSignUpOpen(false); setSignInOpen(true); };
  const handleSwitchToSignUp = () => { setSignInOpen(false); setSignUpOpen(true); };
  const handleForgotPassword = () => { setSignInOpen(false); setResetPasswordOpen(true); };
  const handleBackToLogin = () => { setResetPasswordOpen(false); setSignInOpen(true); };
  const handleLogin = () => { setSignInOpen(false); setIsLoggedIn(true); };
  const handleLogout = () => { setIsLoggedIn(false); };

  // Calculate margin based on sidebar state - no margin on mobile since sidebar is overlay
  const getMainMargin = () => {
    if (isMobile) return 0;
    if (!sidebarOpen) return 0;
    return sidebarCollapsed ? 64 : 240;
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
        />

        <main 
          className="flex-1 min-w-0 pb-20 lg:pb-0 transition-all duration-300 overflow-y-auto custom-scrollbar"
          style={{ marginLeft: getMainMargin() }}
        >
          <div className="px-3 lg:px-6 py-4 lg:py-5 space-y-5 lg:space-y-6">
            <HeroSection onSignUp={() => setSignUpOpen(true)} />
            <RecentBigWins />
            <CategoryCards />
            <BCOriginals  />
            <LiveSports />
            <BCExclusive />
            <Slots />
            <UpcomingLottery />
            <LiveCasino />
            <DepositBonus />
            <BingoGames />
            <LatestRoundRace />
            <HotGames />
            <HelpUs/>
            <Providers/>
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
      <SignUpModal isOpen={signUpOpen} onClose={() => setSignUpOpen(false)} onSwitchToSignIn={handleSwitchToSignIn} setIsLoggedIn={setIsLoggedIn}/>
      <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} onSwitchToSignUp={handleSwitchToSignUp} onForgotPassword={handleForgotPassword} setIsLoggedIn={setIsLoggedIn} />
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
