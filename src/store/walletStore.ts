import { create } from "zustand";
import * as api from "../services/api";

interface Transaction {
  id: number;
  amount: number;
  type: string;
  createdAt: string;
}

interface WalletState {
  balance: number;
  wallets: any[]; // ✅ REQUIRED
  transactions: Transaction[];
  loading: boolean;
  error: string | null;

  fetchBalance: () => Promise<void>;
  placeBet: (amount: number, betId: number) => Promise<void>;
  winBet: (amount: number, betId: number) => Promise<void>;
  fetchTransactions: () => Promise<void>;
  requestDeposit: (data: any) => Promise<any>;
  requestWithdraw: (data: any) => Promise<any>;
}

const useWalletStore = create<WalletState>((set) => ({
  balance: 0,
  wallets: [], // ✅ FIX ADDED HERE
  transactions: [],
  loading: false,
  error: null,

  fetchBalance: async () => {
    set({ loading: true });

    try {
      const res = await api.getBalance();

      const wallets = res.data || [];

      const total = wallets.reduce(
        (sum: number, w: any) => sum + Number(w.balance || 0),
        0
      );

      set({
        wallets,
        balance: total,
        loading: false
      });

    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  placeBet: async (amount, betId) => {
    set({ loading: true });

    try {
      const res = await api.betDebit(amount, betId);
      set({ balance: res.balance, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  winBet: async (amount, betId) => {
    set({ loading: true });

    try {
      const res = await api.betCredit(amount, betId);
      set({ balance: res.balance, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchTransactions: async () => {
    try {
      const res = await api.getTransactions();
      set({ transactions: res });
    } catch (err: any) {
      set({ error: err.message });
    }
  },
  requestDeposit: async (data) => {
  set({ loading: true });

  try {
    const res = await api.requestDeposit(data);

    // optional: refresh balance after deposit request
    await useWalletStore.getState().fetchBalance();

    set({ loading: false });
    return res;

  } catch (err: any) {
    set({ error: err.message, loading: false });
    throw err;
  }
},

requestWithdraw: async (data) => {
  set({ loading: true });

  try {
    const res = await api.requestWithdraw(data);

    // refresh balance after withdraw request
    await useWalletStore.getState().fetchBalance();

    set({ loading: false });
    return res;

  } catch (err: any) {
    set({ error: err.message, loading: false });
    throw err;
  }
},
}));

export default useWalletStore;