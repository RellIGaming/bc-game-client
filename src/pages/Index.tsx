import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import LiveChat from "@/components/layout/LiveChat";
import SearchModal from "@/components/layout/SearchModal";
import MobileNav from "@/components/layout/MobileNav";
import SignUpModal from "@/components/auth/SignUpModal";
import SignInModal from "@/components/auth/SignInModal";
import ResetPasswordModal from "@/components/auth/ResetPasswordModal";
import UserProfilePanel from "@/components/auth/UserProfilePanel";
import HeroSection from "@/components/home/HeroSection";
import RecentBigWins from "@/components/home/RecentBigWins";
import CategoryCards from "@/components/home/CategoryCards";
import BCOriginals from "@/components/home/BCOriginals";
import LiveCasinoAndSlots from "@/components/home/LiveCasinoAndSlots";
import DepositBonus from "@/components/home/DepositBonus";
import Footer from "@/components/home/Footer";

const Index = () => {
  const [isDark, setIsDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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
        isDark={isDark}
        onThemeToggle={toggleTheme}
        isSidebarCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onClose={() => setSidebarOpen(false)}
          isDark={isDark}
          onThemeToggle={toggleTheme}
        />

        <main className="flex-1 min-w-0 pb-20 lg:pb-0">
          <div className="container py-4 lg:py-6 space-y-6 lg:space-y-8">
            <HeroSection onSignUp={() => setSignUpOpen(true)} />
            <RecentBigWins />
            <CategoryCards />
            <BCOriginals />
            <LiveCasinoAndSlots />
            <DepositBonus />
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
