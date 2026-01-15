import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Smile, Gift, ChevronDown, Shield, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LiveChatProps {
  isOpen: boolean;
  onClose: () => void;
}

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
];

const LiveChat = ({ isOpen, onClose }: LiveChatProps) => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("Global");

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
            className="fixed right-0 top-14 lg:top-16 h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-4rem)] w-full sm:w-80 lg:w-72 xl:w-80 bg-chat-bg border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-border">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 text-sm font-medium text-foreground">
                  {room}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded hover:bg-secondary">
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-1.5 rounded hover:bg-secondary">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                </button>
                <button onClick={onClose} className="p-1.5 rounded hover:bg-secondary">
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
                <button className="ml-auto text-xs text-primary">Show More</button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hide">
              {mockMessages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-2">
                  <div className="relative">
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

              {/* New Messages Indicator */}
              <button className="w-full py-2 rounded-lg bg-primary/20 text-primary text-sm font-medium">
                5 new messages ↓
              </button>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border">
              <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message..."
                  className="flex-1 bg-transparent border-none p-0 h-auto text-sm focus-visible:ring-0"
                />
                <button className="text-muted-foreground hover:text-foreground">
                  <Gift className="w-5 h-5" />
                </button>
                <button className="text-muted-foreground hover:text-foreground">
                  <Smile className="w-5 h-5" />
                </button>
                <button className="text-primary hover:text-primary/80">
                  <Send className="w-5 h-5" />
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
