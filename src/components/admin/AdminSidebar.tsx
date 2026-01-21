import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Gamepad2,
  Wallet,
  FileText,
  Settings,
  FileCode,
  Radio,
  ChevronDown,
  ChevronRight,
  LogOut,
  X,
} from "lucide-react";
import logo from "@/assets/images/logo.png";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: { id: string; label: string; path: string }[];
}

interface AdminSidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const AdminSidebar = ({ isMobileOpen, onMobileClose }: AdminSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(["dashboard"]);

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/admin",
    },
    {
      id: "agents",
      label: "Agents",
      icon: <Users className="w-5 h-5" />,
      children: [
        { id: "agents-list", label: "All Agents", path: "/admin/agents" },
        { id: "agents-add", label: "Add Agent", path: "/admin/agents/add" },
      ],
    },
    {
      id: "sub-admin",
      label: "Sub-Admin",
      icon: <UserCog className="w-5 h-5" />,
      children: [
        { id: "subadmin-list", label: "All Sub-Admins", path: "/admin/sub-admins" },
        { id: "subadmin-add", label: "Add Sub-Admin", path: "/admin/sub-admins/add" },
      ],
    },
    {
      id: "players",
      label: "Players",
      icon: <Gamepad2 className="w-5 h-5" />,
      children: [
        { id: "players-list", label: "All Players", path: "/admin/players" },
        { id: "players-active", label: "Active Players", path: "/admin/players/active" },
        { id: "players-banned", label: "Banned Players", path: "/admin/players/banned" },
      ],
    },
    {
      id: "finance",
      label: "Finance",
      icon: <Wallet className="w-5 h-5" />,
      children: [
        { id: "finance-deposits", label: "Deposits", path: "/admin/finance/deposits" },
        { id: "finance-withdrawals", label: "Withdrawals", path: "/admin/finance/withdrawals" },
        { id: "finance-transactions", label: "Transactions", path: "/admin/finance/transactions" },
      ],
    },
    {
      id: "reports",
      label: "Reports",
      icon: <FileText className="w-5 h-5" />,
      children: [
        { id: "reports-daily", label: "Daily Reports", path: "/admin/reports/daily" },
        { id: "reports-weekly", label: "Weekly Reports", path: "/admin/reports/weekly" },
        { id: "reports-monthly", label: "Monthly Reports", path: "/admin/reports/monthly" },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      children: [
        { id: "settings-general", label: "General", path: "/admin/settings/general" },
        { id: "settings-security", label: "Security", path: "/admin/settings/security" },
        { id: "settings-payment", label: "Payment Methods", path: "/admin/settings/payment" },
      ],
    },
    {
      id: "cms",
      label: "CMS Pages",
      icon: <FileCode className="w-5 h-5" />,
      children: [
        { id: "cms-pages", label: "All Pages", path: "/admin/cms" },
        { id: "cms-banners", label: "Banners", path: "/admin/cms/banners" },
        { id: "cms-promotions", label: "Promotions", path: "/admin/cms/promotions" },
      ],
    },
  ];

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    navigate("/");
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const handleLogoClick = () => {
    navigate("/");
    window.location.reload();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <button onClick={handleLogoClick} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <img src={logo} alt="Rellbet" className="w-6 h-6" />
          <span className="font-bold text-foreground">Rellbet Admin</span>
        </button>
        <button
          onClick={onMobileClose}
          className="lg:hidden p-2 hover:bg-secondary/50 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Admin Profile */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <UserCog className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">Admin</p>
            <p className="text-xs text-muted-foreground">
              {localStorage.getItem("adminEmail") || "admin@betmaster.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.path) {
                    navigate(item.path);
                    onMobileClose();
                  } else {
                    toggleExpand(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.children && (
                  expandedItems.includes(item.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )
                )}
              </button>

              {/* Submenu */}
              <AnimatePresence>
                {item.children && expandedItems.includes(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-6 mt-1 space-y-1 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => {
                            navigate(child.path);
                            onMobileClose();
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive(child.path)
                              ? "bg-primary/20 text-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                          }`}
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </div>

      {/* Live Bets Section */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Live Bets</span>
          </div>
          <span className="text-xs text-primary">+</span>
        </div>
        <div className="space-y-2">
          {[
            { id: "56803", user: "CS1,236", amount: "+0.17%" },
            { id: "jhea/her", user: "12.5", amount: "USDT (913)" },
            { id: "jackk69", user: "48.2", amount: "USDT $55)" },
          ].map((bet, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-xs p-2 bg-secondary/30 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-muted-foreground">{bet.id}</span>
              </div>
              <span className="text-foreground">{bet.user}</span>
              <span className="text-primary">{bet.amount}</span>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 py-2 text-xs text-primary hover:bg-primary/10 rounded-lg transition-colors">
          All Live Bets
        </button>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-sidebar z-40"
        style={{ boxShadow: "4px 0 15px rgba(0, 0, 0, 0.3)" }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar - Full Width */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 h-full w-full bg-sidebar z-50 lg:hidden"
              style={{ boxShadow: "4px 0 15px rgba(0, 0, 0, 0.3)" }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
