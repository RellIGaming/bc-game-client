import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { useState } from "react";
import LiveStats from "./components/home/LiveStats";
import CasinoPage from "./pages/CasinoPage";
import GameDetailPage from "./pages/GameDetailPage";
import WalletPage from "./pages/WalletPage";
import SportsPage from "./pages/SportsPage";
import SearchPage from "./pages/SearchPage";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import VipClubPage from "./pages/VipClubPage";
import BonusPage from "./pages/BonusPage";
import ReferralPage from "./pages/ReferralPage";
import ProvablyFairPage from "./pages/ProvablyFairPage";
import ResponsibleGamblingPage from "./pages/ResponsibleGamblingPage";
import SponsorshipPage from "./pages/SponsorshipPage";
import PromotionsPage from "./pages/PromotionsPage";
import DailyContestPage from "./pages/DailyContestPage";
import WeeklyRafflePage from "./pages/WeeklyRafflePage";
import QuestHubPage from "./pages/QuestHubPage";
import ChallengePage from "./pages/ChallengePage";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
              <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
              {/* <Route path="/" element={<Index isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} /> */}
              <Route path="/casino" element={<CasinoPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/sports" element={<SportsPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/sports/:category" element={<SportsPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/search" element={<SearchPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/wallet" element={<WalletPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/game/:gameId" element={<GameDetailPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/wallet/:section" element={<WalletPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/casino/:category" element={<CategoryPage />} />
              <Route path="/live-stats" element={<LiveStats />} />
              <Route path="/vip-club" element={<VipClubPage isLoggedIn={isLoggedIn} />} />
              <Route path="/bonus" element={<BonusPage />} />
              <Route path="/referal" element={<ReferralPage />} />
              <Route path="/fair" element={<ProvablyFairPage />} />
              <Route path="/gambling" element={<ResponsibleGamblingPage />} />
              <Route path="/sponsorships" element={<SponsorshipPage />} />
              <Route path="/sponsorships/:tab" element={<SponsorshipPage />} />
              <Route path="/promotions" element={<PromotionsPage />} />
              <Route path="/daily" element={<DailyContestPage />} />
              <Route path="/lucky" element={<WeeklyRafflePage />} />
              <Route path="/quest-hub" element={<QuestHubPage />} />
              <Route path="/challenge" element={<ChallengePage />} />
            </Route>
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
};

export default App;
