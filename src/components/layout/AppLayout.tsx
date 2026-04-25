import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { rescanForTranslation } from "@/i18n/autoTranslate";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import SearchModal from "@/components/layout/SearchModal";
import LanguageCurrencyModal from "@/components/layout/LanguageCurrencyModal";
import ResetPasswordModal from "@/components/auth/ResetPasswordModal";
import UserProfilePanel from "@/components/auth/UserProfilePanel";
import SignUpModal from "@/components/auth/SignUpModal";
import SignInModal from "@/components/auth/SignInModal";
import useAuthStore from "@/store/authStore";
import ForgotPassword from "../auth/ForgotPassword";

interface AppLayoutProps {
  isLoggedIn: boolean;
}

const AppLayout = ({ isLoggedIn }: AppLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);
  const { logout } = useAuthStore();
  // Re-scan DOM on every route change so newly-mounted pages get translated.
  useEffect(() => {
    // Allow the new route's components to render first.
    const t1 = window.setTimeout(() => rescanForTranslation(), 100);
    const t2 = window.setTimeout(() => rescanForTranslation(), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location.pathname]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
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
  const handleForgotPassword = () => { setSignInOpen(false); setForgotOpen(true); };
  const handleResetPassword = () => { setSignInOpen(false); setResetPasswordOpen(true); };
  const handleBackToLogin = () => { setResetPasswordOpen(false); setSignInOpen(true); };
  const handleLogin = () => { setSignInOpen(false); };
  const handleLogout = () => { logout(); };




  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
      if (mobile) setSidebarCollapsed(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getMainMargin = () => {
    if (isMobile || !sidebarOpen) return 0;
    return sidebarCollapsed ? 64 : 240;
  };

  const onSearchClick = () => {
    if (window.innerWidth < 768) {
      navigate("/search");
    } else {
      setSearchOpen(true);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* ✅ HEADER (only once) */}
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onSearchClick={onSearchClick}
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
          logout();
        }}
      />

      <div className="flex flex-1 pt-14 overflow-hidden">
        {/* ✅ SIDEBAR (only once) */}
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


        {/* ✅ MAIN CONTENT (pages render here) */}
        <main
          className="flex-1 min-w-0 pb-14 lg:pb-0 overflow-y-auto transition-all duration-300"
          style={{ marginLeft: getMainMargin() }}
        >
          <Outlet /> {/* 👈 THIS IS THE MAGIC */}
        </main>
        {/* <LiveChat isOpen={chatOpen} onClose={() => setChatOpen(false)} /> */}
      </div>

      {/* ✅ FOOTER & MOBILE NAV (only once) */}
      <MobileNav
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onSearchClick={onSearchClick}
        onChatClick={() => setChatOpen(!chatOpen)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* ✅ MODALS (global) */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <LanguageCurrencyModal isOpen={languageOpen} onClose={() => setLanguageOpen(false)} />
      <SignUpModal
        isOpen={signUpOpen}
        onClose={() => setSignUpOpen(false)}
        onSwitchToSignIn={handleSwitchToSignIn}
      />

      <SignInModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
        onSwitchToSignUp={handleSwitchToSignUp}
        onForgotPassword={handleForgotPassword}
        onResetPassword={handleResetPassword}

      />
      <ResetPasswordModal isOpen={resetPasswordOpen} onClose={() => setResetPasswordOpen(false)} onBackToLogin={handleBackToLogin} />
      <ForgotPassword
        isOpen={forgotOpen}
        onClose={() => setForgotOpen(false)}
        onBackToLogin={() => {
          setForgotOpen(false);
          setSignInOpen(true);
        }}
      />      <UserProfilePanel isOpen={profileOpen} onClose={() => setProfileOpen(false)} />

      {/* <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-20 right-4 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg gaming-glow lg:hidden flex items-center justify-center z-30"
      >
        <span className="text-xl">💬</span>
      </button> */}
    </div>
  );
};

export default AppLayout;
