import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Smile, Gift, ChevronDown, Shield, Volume2, Plus, Keyboard, AtSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

const mockMessages = [
  {
    id: 1,
    user: "BC_DPO1",
    avatar: "",
    level: 15,
    message: "@SKY2KING good luck",
    time: "19:32",
    levelColor: "bg-primary",
  },
  {
    id: 2,
    user: "BALOCH_GREAT",
    avatar: "",
    level: 39,
    message: "Great day for you",
    time: "19:32",
    levelColor: "bg-vip",
  },
  {
    id: 3,
    user: "BC_DPO1",
    avatar: "",
    level: 15,
    message: "@Akusiapaya halo",
    time: "19:32",
    levelColor: "bg-primary",
  },
  {
    id: 4,
    user: "mazari0786",
    avatar: "",
    level: 19,
    message: "Bast washes the bc game is good game",
    time: "19:32",
    levelColor: "bg-gold",
  },
  {
    id: 5,
    user: "Bc_FLASH",
    avatar: "",
    level: 5,
    message: "Trust the process.",
    time: "19:32",
    levelColor: "bg-primary",
  },
  {
    id: 6,
    user: "Gwendolen_01",
    avatar: "",
    level: 22,
    message: "Keep rolling guys 💪 all Friends ✨",
    time: "15:46",
    levelColor: "bg-vip",
  },
  {
    id: 7,
    user: "BC_ZABARDAST",
    avatar: "",
    level: 3,
    message: "@KEEP_PLAY to you too",
    time: "15:47",
    levelColor: "bg-primary",
  },
];

const LiveChat = ({ isOpen, onClose }: LiveChatProps) => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("Global");
  const [showRoomDropdown, setShowRoomDropdown] = useState(false);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessageCount, setNewMessageCount] = useState(21);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      user: "You",
      avatar: "",
      level: 1,
      message: message.trim(),
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
      levelColor: "bg-primary",
    };

    setMessages([...messages, newMessage]);
    setMessage("");
    setTimeout(scrollToBottom, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRoomSelect = (roomName: string) => {
    setRoom(roomName);
    setShowRoomDropdown(false);
  };

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
              {messages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-2">
                  <div className="relative flex-shrink-0">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={msg.avatar} />
                      <AvatarFallback className="bg-secondary text-xs">
                        {msg.user[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={cn(
                        "absolute -bottom-1 -right-1 text-[10px] font-bold px-1 rounded text-white",
                        msg.levelColor
                      )}
                    >
                      V{msg.level}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground truncate">
                        {msg.user}
                      </span>
                      <span className="text-xs text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground break-words">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
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
                  onKeyPress={handleKeyPress}
                  placeholder="Your message..."
                  className="flex-1 bg-transparent border-none p-0 h-auto text-sm focus-visible:ring-0"
                />
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
