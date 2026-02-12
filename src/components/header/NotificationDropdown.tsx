import { useState } from "react";
import { X, ChevronDown, Trash2, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type TabType = "promotions" | "transactions" | "system";

interface Notification {
  id: string;
  type: TabType;
  title: string;
  date: string;
  time: string;
  image?: string;
  description?: string;
  isRead: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "promotions",
    title: "🏀 Its Weekly Sports Bonus Time! ⚙️",
    date: "1/17/2026",
    time: "10:58:10 AM",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=300&h=200&fit=crop",
    description: "WEEKLY SPORTS BONUS UNLOCKED! BET $500 AND GET UP TO $1000!",
    isRead: false,
  },
  {
    id: "2",
    type: "promotions",
    title: "🎰 New Slot Tournament Started!",
    date: "1/16/2026",
    time: "3:30:00 PM",
    description: "Join our exclusive slot tournament and win big prizes!",
    isRead: false,
  },
  {
    id: "3",
    type: "transactions",
    title: "Deposit Confirmed",
    date: "1/15/2026",
    time: "11:20:00 AM",
    description: "Your deposit of ₹1,000 has been confirmed.",
    isRead: true,
  },
  {
    id: "4",
    type: "system",
    title: "Security Update",
    date: "1/14/2026",
    time: "9:00:00 AM",
    description: "We've updated our security protocols for your protection.",
    isRead: true,
  },
];

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationDropdown = ({ isOpen, onClose }: NotificationDropdownProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("promotions");
  const [showUnread, setShowUnread] = useState(false);

  const filteredNotifications = notifications.filter(n => {
    const matchesTab = n.type === activeTab;
    const matchesUnread = showUnread ? !n.isRead : true;
    return matchesTab && matchesUnread;
  });

  const unreadCount = notifications.filter(n => n.type === activeTab && !n.isRead).length;

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
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 border-b border-border hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs text-muted-foreground">
                        {notification.date}, {notification.time}
                      </span>
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    <h4 className="text-foreground font-medium mb-2">{notification.title}</h4>
                    {notification.image && (
                      <div className="relative rounded-lg overflow-hidden mb-2">
                        <img
                          src={notification.image}
                          alt="Notification"
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <span className="text-xs bg-secondary/80 px-2 py-1 rounded text-foreground">
                            Sports
                          </span>
                          <p className="text-white font-bold mt-1 text-sm">
                            {notification.description}
                          </p>
                        </div>
                        <button className="absolute bottom-2 right-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                          Show all <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    {!notification.image && notification.description && (
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <button className="text-primary text-sm hover:underline">
                        Click to know more.
                      </button>
                      <button className="p-1 hover:bg-secondary rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                ))
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
