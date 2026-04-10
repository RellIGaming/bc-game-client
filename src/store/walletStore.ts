import { create } from "zustand";
import * as api from "../services/api";

interface Transaction {
  id: number;
  amount: number;
  type: string;
  txId: string;
  createdAt: string;
  currency: string;
  status: string;
  balanceBefore: string | null;
  balanceAfter: string | null;
  referenceType: string;
}

interface WalletState {
  balance: number;
  balances: any[];
  wallets: any[]; 
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  swapRate: number;
  vaults: {
    currency: string;
    balance: number;
  }[];
  interestHistory: any[];
  fetchInterestHistory: (filter: string) => Promise<void>;
  fetchVault: () => Promise<void>;
  vaultDeposit: (data: { currency: string; amount: number }) => Promise<void>;
  vaultWithdraw: (data: { currency: string; amount: number }) => Promise<void>;
  fetchRate: (from: string, to: string) => Promise<number>;
  fetchBalance: () => Promise<void>;
  fetchSwapBalances: () => Promise<void>;
  doSwap: (payload: {
    from: string;
    to: string;
    amount: number;
    rate: number;
  }) => Promise<any>;
  placeBet: (amount: number, betId: number) => Promise<void>;
  winBet: (amount: number, betId: number) => Promise<void>;
  fetchTransactions: () => Promise<void>;
  requestDeposit: (data: any) => Promise<any>;
  requestWithdraw: (data: any) => Promise<any>;
}
interface ReferralState {
  referralFriends: any[];
  referralEarnings: any;
  referralDashboard: any;
  referralLoading: boolean;

  fetchReferralFriends: () => Promise<void>;
  fetchReferralEarnings: () => Promise<void>;
  fetchReferralDashboard: () => Promise<void>;
}

const useWalletStore = create<WalletState>((set) => ({
  balance: 0,
  balances: [],
  wallets: [],
  transactions: [],
  loading: false,
  error: null,
  swapRate: 0,
  vaults: [],
  interestHistory: [],

  fetchInterestHistory: async (filter: string) => {
    try {
      set({ loading: true });

      const res = await api.getVaultInterest(filter);

      set({
        interestHistory: res || [],
        loading: false
      });

    } catch (err: any) {
      set({
        error: err.message,
        loading: false
      });
    }
  },
  fetchVault: async () => {
    try {
      const res = await api.getVault();
      set({ vaults: res || [] });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  vaultDeposit: async (data) => {
    try {
      await api.depositVault(data);

      // refresh
      await useWalletStore.getState().fetchVault();
      await useWalletStore.getState().fetchSwapBalances();

    } catch (err: any) {
      set({ error: err.message });
    }
  },

  vaultWithdraw: async (data) => {
    try {
      await api.withdrawVault(data);

      // refresh
      await useWalletStore.getState().fetchVault();
      await useWalletStore.getState().fetchSwapBalances();

    } catch (err: any) {
      set({ error: err.message });
    }
  },
  fetchRate: async (from, to) => {
    try {
      const res = await api.getSwapRate(from, to);

      // assume API returns: { rate: 0.012 }
      set({ swapRate: res.rate });

      return res.rate;
    } catch (err: any) {
      set({ error: err.message });
      return 0;
    }
  },
  // 🔹 Fetch balances
  fetchSwapBalances: async () => {
    try {
      const res = await api.getSwapBalances();
      set({ balances: res.balances });
    } catch (err: any) {
      set({ error: err.message });
    }
  },
  // 🔹 Swap
  doSwap: async (payload) => {
    try {
      set({ loading: true });
      const res = await api.swapCrypto(payload);

      // refresh balances after swap
      const updated = await api.getSwapBalances();

      set({
        balances: updated.balances,
        loading: false,
      });

      return res;
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
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
export const useReferralStore = create<ReferralState>((set) => ({
  referralFriends: [],
  referralEarnings: null,
  referralDashboard: null,
  referralLoading: false,

  fetchReferralFriends: async () => {
    try {
      set({ referralLoading: true });

      const res = await api.getReferralFriends();

      set({
        referralFriends: res.friends || [],
        referralLoading: false
      });

    } catch (err: any) {
      set({
        referralLoading: false
      });
    }
  },

  fetchReferralEarnings: async () => {
    try {
      const res = await api.getReferralEarnings();

      set({
        referralEarnings: res
      });

    } catch (err) {}
  },

  fetchReferralDashboard: async () => {
    try {
      const res = await api.getReferralDashboard();

      set({
        referralDashboard: res
      });

    } catch (err) {}
  }
}));
export default useWalletStore;