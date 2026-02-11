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
              <Route path="/search" element={<SearchPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/wallet" element={<WalletPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/game/:gameId" element={<GameDetailPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/wallet/:section" element={<WalletPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/live-stats" element={<LiveStats />} />
              <Route path="/category/vip-club" element={<VipClubPage isLoggedIn={isLoggedIn} />} />
              <Route path="/category/bonus" element={<BonusPage />} />
              <Route path="/category/referal" element={<ReferralPage />} />
              <Route path="/category/fair" element={<ProvablyFairPage />} />
              <Route path="/category/gambling" element={<ResponsibleGamblingPage />} />
              <Route path="/category/sponsorships" element={<SponsorshipPage />} />
              <Route path="/category/promotions" element={<PromotionsPage />} />
              <Route path="/category/daily" element={<DailyContestPage />} />
              <Route path="/category/lucky" element={<WeeklyRafflePage />} />
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
