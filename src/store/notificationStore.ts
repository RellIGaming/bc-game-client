import { create } from "zustand";
import * as api from "@/services/api";

interface Notification {
  id: number;
  message: string;
  type: string;
  read: boolean;
  createdAt:string;
}

interface NotificationState {
  notifications: Notification[];
  fetchNotifications: () => Promise<void>;
}

const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],

  fetchNotifications: async () => {
    try {
      const res = await api.getUserNotifications();
      set({ notifications: res });
    } catch (err) {
      console.error(err);
    }
  },
}));

export default useNotificationStore;