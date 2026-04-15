import { create } from "zustand";
import { fetchMessages, deleteMessageAPI } from "../services/api";
import socket from "@/lib/socket";


interface Message {
  id: string;
  userId?: string | number;
  username: string;
  message: string;
  room: string;
  isDeleted?: boolean;
  isAdmin?: boolean;
  replyTo?: {
    id: string;
    username: string;
    message: string;
  };
  createdAt: string;
}

interface ChatState {
  messages: Message[];
  room: string;
  socket: any;
  nextCursor: string | null;
  loading: boolean;

  initSocket: () => void;
  joinRoom: (room: string) => void;
  loadMessages: () => Promise<void>;
  loadMore: () => Promise<void>;
  sendMessage: (data: {
    message: string;
    room: string;
    userId: number;
  }) => void;
  deleteMessage: (id: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  room: "global",
  socket: null,
  nextCursor: null,
  loading: false,

  /* ================= SOCKET ================= */
  initSocket: () => {
    const existing = get().socket;
    if (existing) return;

    socket.on("receive-message", (msg: Message) => {
      set((state) => {
        const exists = state.messages.some((m) => m.id === msg.id);
        if (exists) return state;

        return {
          messages: [...state.messages, msg],
        };
      });
    });

    socket.on("message-deleted", ({ id }: { id: string }) => {
      set((state) => ({
        messages: state.messages.map((m) =>
          m.id === id
            ? { ...m, isDeleted: true, message: "Deleted by admin" }
            : m
        ),
      }));
    });

    set({ socket });
  },

  /* ================= ROOM ================= */
  joinRoom: (room) => {
    const socket = get().socket;
    if (!socket) return;

    const normalized = room.toLowerCase();

    socket.emit("join-room", normalized);

    set({
      room: normalized,
      messages: [],
      nextCursor: null,
    });
  },

  /* ================= LOAD ================= */
  loadMessages: async () => {
    const { room } = get();

    set({ loading: true });

    try {
      const res = await fetchMessages(room);

      set({
        messages: res.messages,
        nextCursor: res.nextCursor,
      });
    } catch (err) {
      console.error("chat load error:", err);
    } finally {
      set({ loading: false });
    }
  },

  /* ================= PAGINATION ================= */
  loadMore: async () => {
    const { room, nextCursor, messages } = get();
    if (!nextCursor) return;

    try {
      const res = await fetchMessages(room, undefined, nextCursor);

      set({
        messages: [...res.messages, ...messages],
        nextCursor: res.nextCursor,
      });
    } catch (err) {
      console.error("load more error:", err);
    }
  },

sendMessage: (data) => {
  const socket = get().socket;

  console.log("👉 socket:", socket);
  console.log("👉 sending:", data);

  if (!socket) {
    console.log("❌ Socket not initialized");
    return;
  }

  if (!socket.connected) {
    console.log("❌ Socket NOT connected");
    return;
  }

  socket.emit("send-message", data);
},
  /* ================= DELETE ================= */
  deleteMessage: async (id) => {
    try {
      await deleteMessageAPI(id);

      // optimistic update
      set((state) => ({
        messages: state.messages.map((m) =>
          m.id === id
            ? { ...m, isDeleted: true, message: "Deleted" }
            : m
        ),
      }));
    } catch (err) {
      console.error("delete failed:", err);
    }
  },
}));