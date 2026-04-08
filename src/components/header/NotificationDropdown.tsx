import { useState } from "react";
import { X, ChevronDown, Trash2, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useNotificationStore from "@/store/notificationStore";

type TabType = "promotions" | "transactions" | "system";





interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationDropdown = ({ isOpen, onClose }: NotificationDropdownProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("promotions");
  const [showUnread, setShowUnread] = useState(false);
  const { notifications } = useNotificationStore();
  const mapType = (type: string) => {
    if (type.includes("deposit") || type.includes("withdraw")) return "transactions";
    return "system";
  };
  const filteredNotifications = notifications.filter((n) => {
    const matchesTab =
      activeTab === "transactions"
        ? n.type.includes("deposit") || n.type.includes("withdraw")
        : activeTab === "system"
          ? true
          : false;

    const matchesUnread = showUnread ? !n.read : true;

    return matchesTab && matchesUnread;
  });
  const unreadCount = notifications.filter(n => n.type === activeTab && !n.read).length;

  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: "promotions", label: "Promotions", count: 11 },
    { id: "transactions", label: "Transactions" },
    { id: "system", label: "System" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{
              opacity: 0,
              x: typeof window !== "undefined" && window.innerWidth < 1024 ? "100%" : 0,
              y: typeof window !== "undefined" && window.innerWidth < 1024 ? 0 : -10,
            }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{
              opacity: 0,
              x: typeof window !== "undefined" && window.innerWidth < 1024 ? "100%" : 0,
              y: typeof window !== "undefined" && window.innerWidth < 1024 ? 0 : -10,
            }}
            transition={{ type: "tween", duration: 0.3 }}
            className="
    fixed lg:absolute
    inset-0 lg:inset-auto
    lg:top-full lg:right-0
    mt-0 lg:mt-2
    w-full h-full lg:w-96 lg:h-auto
    bg-card border border-border
    rounded-none lg:rounded-lg
    shadow-2xl
    z-50
    overflow-hidden
  ">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center gap-2">
              {/* Mobile back arrow */}
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-lg bg-secondary"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>

              <h3 className="text-lg font-semibold text-foreground flex-1 text-center">
                Notification
              </h3>

              {/* Desktop close icon */}
              <button
                onClick={onClose}
                className="hidden lg:block p-1 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>


            {/* Tabs */}
            <div className="flex bg-secondary rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 px-4 text-sm font-medium transition-colors rounded-lg
        ${activeTab === tab.id
                      ? "bg-primary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <span className="flex items-center justify-center gap-1">
                    {tab.label}
                    {tab.count && (
                      <span className="px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                        {tab.count}
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>


            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto scrollbar-hide">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => {
                  const dateObj = new Date(notification.createdAt);

                  return (
                    <div
                      key={notification.id}
                      className="p-4 border-b border-border hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs text-muted-foreground">
                          {dateObj.toLocaleDateString()} , {dateObj.toLocaleTimeString()}
                        </span>

                        {!notification.read && (
                          <span className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>

                      <h4 className="text-foreground font-medium mb-2 capitalize">
                        {notification.type.replace("-", " ")}
                      </h4>

                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <button className="text-primary text-sm hover:underline">
                          View details
                        </button>

                        <button className="p-1 hover:bg-secondary rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  No notifications
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-border flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm text-muted-foreground">Show unread</span>
                <div
                  className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${showUnread ? "bg-primary" : "bg-secondary"
                    }`}
                  onClick={() => setShowUnread(!showUnread)}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform ${showUnread ? "translate-x-5" : "translate-x-0.5"
                      }`}
                  />
                </div>
              </label>
              <button className="flex items-center gap-1 text-primary text-sm hover:underline">
                <span>✓✓</span> mark all as read
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationDropdown;
