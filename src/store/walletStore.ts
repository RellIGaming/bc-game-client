// stores/walletStore.ts
import { create } from "zustand";
import useAuthStore from "./authStore";
import * as api from "../services/api";

// ------------------ Types ------------------
interface WalletState {
  balance: number;
  loading: boolean;
  error: string | null;

  fetchBalance: () => Promise<void>;
  deposit: (amount: number) => Promise<void>;
  withdraw: (amount: number) => Promise<void>;
}

// ------------------ Zustand Store ------------------
const useWalletStore = create<WalletState>((set) => ({
  balance: 0,
  loading: false,
  error: null,

  fetchBalance: async () => {
    const { token } = useAuthStore.getState();
    if (!token) return;
    set({ loading: true });
    try {
      const res = await api.getBalance(); // create getBalance() in api.ts
      set({ balance: res.balance, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  deposit: async (amount) => {
    const { token } = useAuthStore.getState();
    if (!token) return;
    set({ loading: true });
    try {
      const res = await api.deposit(amount); // create deposit() in api.ts
      set({ balance: res.balance, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  withdraw: async (amount) => {
    const { token } = useAuthStore.getState();
    if (!token) return;
    set({ loading: true });
    try {
      const res = await api.withdraw(amount); // create withdraw() in api.ts
      set({ balance: res.balance, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useWalletStore;