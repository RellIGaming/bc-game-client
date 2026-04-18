import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Smile, Gift, ChevronDown, Shield, Volume2, Plus, Keyboard, AtSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/store/chatStore";
import useAuthStore from "@/store/authStore";

interface LiveChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const chatRooms = [
  { id: "global", name: "Global" },
  { id: "sports", name: "Sports" },
  { id: "english", name: "English" },
  { id: "chinese-t", name: "繁體中文" },
  { id: "chinese-s", name: "简体中文" },
  { id: "portuguese", name: "Português" },
  { id: "indonesian", name: "Indonesian" },
];


const LiveChat = ({ isOpen, onClose }: LiveChatProps) => {
  const {
    messages,
    initSocket,
    joinRoom,
    loadMessages,
    sendMessage,
  } = useChatStore();
  const { user } = useAuthStore();
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("Global");
  const [showRoomDropdown, setShowRoomDropdown] = useState(false);
  const [newMessageCount, setNewMessageCount] = useState(21);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
console.log("USER:", user);
  useEffect(() => {
    if (!isOpen) return;

    initSocket();
    joinRoom(room.toLowerCase());
    loadMessages();

  }, [isOpen, room]);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowRoomDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setNewMessageCount(0);
  };

const handleSendMessage = () => {
  console.log("🔥 CLICK SEND");

  if (!message.trim()) return;

  if (!user?.id) {
    console.log("❌ No user logged in");
    return;
  }

  sendMessage({
    message: message.trim(),
    room: room.toLowerCase(),
    userId: user.id,
  });

  setMessage("");
};

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRoomSelect = (roomName: string) => {
    setRoom(roomName);

    joinRoom(roomName.toLowerCase()); // 🔥 important
    setShowRoomDropdown(false);
  };
  useEffect(() => {
  setTimeout(() => {
    scrollToBottom();
  }, 100);
}, [messages]);
  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500"];
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          />

          {/* Chat Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-14 lg:top-14 h-[calc(100vh-3.5rem)] w-full sm:w-80 lg:w-72 xl:w-80 bg-card border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-border">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowRoomDropdown(!showRoomDropdown)}
                  className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {room}
                  <ChevronDown className={cn("w-4 h-4 transition-transform", showRoomDropdown && "rotate-180")} />
                </button>

                {/* Room Dropdown */}
                <AnimatePresence>
                  {showRoomDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
                    >
                      {chatRooms.map((chatRoom) => (
                        <button
                          key={chatRoom.id}
                          onClick={() => handleRoomSelect(chatRoom.name)}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors",
                            room === chatRoom.name
                              ? "bg-secondary text-foreground"
                              : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                          )}
                        >
                          {chatRoom.name}
                          {room === chatRoom.name && (
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded hover:bg-secondary transition-colors">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-1.5 rounded hover:bg-secondary transition-colors">
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                </button>
                <button onClick={onClose} className="p-1.5 rounded hover:bg-secondary transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Pinned Message */}
            <div className="p-3 border-b border-border bg-secondary/30">
              <div className="flex items-start gap-2">
                <div className="text-xs text-muted-foreground">
                  Pinned by <span className="text-foreground font-medium">Admin</span>
                </div>
                <button className="ml-auto text-xs text-primary hover:underline">Show More</button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hide">
              {messages.map((msg) => {
                const color = colors[msg.username?.length % colors.length];

                return (
                  <div key={msg.id} className="flex items-start gap-2">

                    {/* ✅ STATIC AVATAR */}
                    <div className="relative flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs text-white">
                        {msg.username?.charAt(0).toUpperCase() || "U"}
                      </div>

                      {/* ✅ STATIC LEVEL BADGE (OPTIONAL) */}
                      <span className="absolute -bottom-1 -right-1 text-[10px] font-bold px-1 rounded text-white bg-blue-500">
                        U
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">

                      {/* USERNAME + TIME */}
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "text-sm font-medium truncate",
                            msg.username === "ChatBot"
                              ? "text-green-500 font-bold"
                              : msg.isAdmin
                                ? "text-red-500"
                                : "text-foreground"
                          )}
                        >
                          {msg.username}{msg.username === "ChatBot" && (
  <span className="text-[10px] ml-1 text-green-400">BOT</span>
)}
                        </span>

                        <span className="text-xs text-muted-foreground">
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      {/* ✅ REPLY MESSAGE (optional) */}
                      {msg.replyTo && (
                        <div className="text-xs text-muted-foreground border-l-2 pl-2 mb-1">
                          <span className="font-medium">{msg.replyTo.username}: </span>
                          {msg.replyTo.message}
                        </div>
                      )}

                      {/* MESSAGE */}
                      <p className="text-sm break-words text-muted-foreground">
                        {msg.isDeleted ? "Message deleted" : msg.message}
                      </p>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />

              {/* New Messages Indicator */}
              {newMessageCount > 0 && (
                <button
                  onClick={scrollToBottom}
                  className="w-full py-2 rounded-lg bg-primary/20 text-primary text-sm font-medium hover:bg-primary/30 transition-colors"
                >
                  {newMessageCount} new messages ↓
                </button>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border">
              <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">

                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Your message..."
                  className="flex-1 bg-transparent border-none p-0 h-auto text-sm focus-visible:ring-0"
                />

                {/* SEND BUTTON 🔥 */}
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className={cn(
                    "p-2 rounded-md",
                    message.trim()
                      ? "bg-primary text-white"
                      : "bg-gray-500/30"
                  )}
                >
                  <Send className="w-4 h-4" />
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Keyboard className="w-5 h-5" />
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2 mt-2">
                <button className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                  <span className="text-sm">👋</span>
                </button>
                <button className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                  <AtSign className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                  <span className="text-sm">/</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LiveChat;
