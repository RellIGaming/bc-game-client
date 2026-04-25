// stores/authStore.ts
import { create } from "zustand";
import * as api from "../services/api"; // import your api.ts functions

// ------------------ Types ------------------
export interface User {
  id: number;
  username: string;
  email?: string;
  phone?: string;
  role: string;
  balance?: number;
  promoCode: string;
  profileImage?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;

  signup: (data: { username: string; email: string; password: string; promoCode?: string; role?: string }) => Promise<void>;
  signin: (data: { identifier: string; password: string }) => Promise<void>;
  otpLogin: (data: { identifier: string; otp: string }) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: { username?: string; email?: string; phone?: string, file?: File }) => Promise<void>;
}

// ------------------ Zustand Store ------------------
const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  signup: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.signup(data);
      set({ user: res.user, token: res.token, loading: false });
      localStorage.setItem("token", res.token);
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  signin: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.signin(data);
      set({ user: res.user, token: res.token, loading: false });
      localStorage.setItem("token", res.token);
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  otpLogin: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.otpLogin(data);
      set({ user: res.user, token: res.token, loading: false });
      localStorage.setItem("token", res.token);
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
  },
  forgotPassword: async (email) => {
    set({ loading: true, error: null });
    try {
      await api.forgotPassword(email);
      set({ loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  resetPassword: async (token, password) => {
    set({ loading: true, error: null });
    try {
      await api.resetPassword(token, password);
      set({ loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  fetchProfile: async () => {
    const token = get().token;
    if (!token) return;

    set({ loading: true });

    try {
      const res = await api.getProfile();

      set({
        user: res, // ✅ backend already returns correct shape
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  updateProfile: async (data) => {
    const token = get().token;
    if (!token) return;

    set({ loading: true });

    try {
      const res = await api.updateProfile(data);

      set({
        user: res, // ✅ FIX (not res.user)
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useAuthStore;