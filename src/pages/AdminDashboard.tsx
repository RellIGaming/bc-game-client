import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import FilterBar from "@/components/admin/FilterBar";
import DepositChart from "@/components/admin/DepositChart";
import ActivePlayersChart from "@/components/admin/ActivePlayersChart";
import AgentCommissionCard from "@/components/admin/AgentCommissionCard";
import LiveBetsTable from "@/components/admin/LiveBetsTable";
import WorldMapCard from "@/components/admin/WorldMapCard";
import FinancialActivityTable from "@/components/admin/FinancialActivityTable";
import GamingActivityTable from "@/components/admin/GamingActivityTable";
import RiskLevelCard from "@/components/admin/RiskLevelCard";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Check if admin is logged in
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin-login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <AdminHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />

        {/* Dashboard Content */}
        <main className="p-4 lg:p-6 space-y-6">
          {/* Page Title */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl lg:text-2xl font-bold text-foreground">Dashboard</h1>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Settings</span>
            </button>
          </div>

          {/* Filter Bar */}
          <FilterBar />

          {/* Stats Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <DepositChart />
            <ActivePlayersChart />
            <AgentCommissionCard />
          </div>

          {/* Live Bets & World Map Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="lg:col-span-2">
              <LiveBetsTable />
            </div>
            <WorldMapCard />
          </div>

          {/* Financial & Gaming Activity Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <FinancialActivityTable />
            <GamingActivityTable />
            <RiskLevelCard />
          </div>

          {/* Footer */}
          <footer className="pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
              <p>© 2023 BetMaster. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                <span>|</span>
                <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
