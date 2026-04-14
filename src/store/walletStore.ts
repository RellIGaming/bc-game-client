import { create } from "zustand";
import * as api from "../services/api";
import { toast } from "sonner";

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
  rewardsSummary: any;
  commissionByFriends: any[];
  commissionByCurrency: any[];
  levelRewards: any[];
  rewardHistory: any[];
  referralCodes: any;
  commissionRules: any;
  commissionResult: any;
  vipReferralLevels: any[];
  referralProgress: any;

  fetchCommissionRules: () => Promise<void>;
  calculateCommission: (payload: {
    wager: number;
    gameType: string;
  }) => Promise<void>;

  fetchVipReferralLevels: () => Promise<void>;
  fetchReferralProgress: () => Promise<void>;

  fetchReferralCodes: () => Promise<void>;
  createReferralCode: (name: string) => Promise<void>;
  fetchReferralFriends: () => Promise<void>;
  fetchReferralEarnings: () => Promise<void>;
  fetchReferralDashboard: () => Promise<void>;
  fetchRewardsSummary: () => Promise<void>;
  fetchCommissionByFriends: (params?: any) => Promise<void>;
  fetchCommissionByCurrency: () => Promise<void>;
  fetchLevelRewards: () => Promise<void>;
  fetchRewardHistory: (type?: string) => Promise<void>;
}
interface BonusState {
  bonusSummary: any;
  monthlyBonus: any;
  bonusLoading: boolean;
  bonusData: any;
  vipLevels: any[];
  vipClub: any;
  vipTable: any;

  fetchVipTable: () => Promise<void>;
  fetchVipClub: () => Promise<void>;
  fetchVipLevels: () => Promise<void>;
  fetchBonusSummary: () => Promise<void>;
  fetchMonthlyBonus: () => Promise<void>;
  claimDailyBonus: () => Promise<void>;
  claimRakebackBonus: () => Promise<void>;
  redeemBonusCode: (code: string) => Promise<void>;
  fetchBonusFull: () => Promise<void>;
}
export const useWalletStore = create<WalletState>((set) => ({
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
  referralCodes: null,

  rewardsSummary: null,
  commissionByFriends: [],
  commissionByCurrency: [],
  levelRewards: [],
  rewardHistory: [],
  commissionRules: null,
  commissionResult: null,
  vipReferralLevels: [],
  referralProgress: null,

  fetchCommissionRules: async () => {
    try {
      const res = await api.getCommissionRules();
      set({ commissionRules: res });
    } catch (err) {
      console.error("Commission Rules Error:", err);
    }
  },
  calculateCommission: async (payload) => {
    try {
      const res = await api.calculateCommission(payload);
      set({ commissionResult: res });
    } catch (err) {
      console.error("Commission Calc Error:", err);
    }
  },
  fetchVipReferralLevels: async () => {
    try {
      const res = await api.getVipLevels();
      set({ vipReferralLevels: res.levels || [] });
    } catch (err) {
      console.error("VIP Levels Error:", err);
    }
  },
  fetchReferralProgress: async () => {
    try {
      const res = await api.getReferralProgress();
      set({ referralProgress: res });
    } catch (err) {
      console.error("Referral Progress Error:", err);
    }
  },

  fetchReferralCodes: async () => {
    try {
      set({ referralLoading: true });

      const res = await api.getReferralCodes();

      set({
        referralCodes: res,
        referralLoading: false,
      });

    } catch (err) {
      console.error("Referral Codes Error:", err);
      set({ referralLoading: false });
    }
  },

  /* ================= CREATE ================= */
  createReferralCode: async (name: string) => {
    try {
      await api.createReferralCode(name);

      // 🔥 auto refresh after create
      const res = await api.getReferralCodes();

      set({
        referralCodes: res,
      });

    } catch (err) {
      console.error("Create Code Error:", err);
    }
  },
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

    } catch (err) { }
  },

  fetchReferralDashboard: async () => {
    try {
      const res = await api.getReferralDashboard();

      set({
        referralDashboard: res
      });

    } catch (err) { }
  },
  fetchRewardsSummary: async () => {
    try {
      const res = await api.getRewardsSummary();
      set({ rewardsSummary: res });
    } catch { }
  },

  fetchCommissionByFriends: async (params) => {
    try {
      const res = await api.getCommissionByFriends(params);
      set({ commissionByFriends: res || [] });
    } catch { }
  },

  fetchCommissionByCurrency: async () => {
    try {
      const res = await api.getCommissionByCurrency();
      set({ commissionByCurrency: res || [] });
    } catch { }
  },

  fetchLevelRewards: async () => {
    try {
      const res = await api.getLevelUpRewards();
      set({ levelRewards: res || [] });
    } catch { }
  },

  fetchRewardHistory: async (type) => {
    try {
      const res = await api.getRewardHistory(type);
      set({ rewardHistory: res || [] });
    } catch { }
  }
}));

export const useBonusStore = create<BonusState>((set) => ({
  bonusSummary: null,
  monthlyBonus: null,
  bonusLoading: false,
  bonusData: null,
  vipLevels: [],
  vipClub: null,
  vipTable: null,

  fetchVipTable: async () => {
    try {
      const res = await api.getVipBonusTable();

      set({
        vipTable: res
      });
    } catch (err) {
      console.error(err);
    }
  },

  fetchVipClub: async () => {
    try {
      const res = await api.getVipClub();

      set({
        vipClub: res,
      });
    } catch (err) {
      console.error("VIP Club Error:", err);
    }
  },
  fetchVipLevels: async () => {
    try {
      const res = await api.getVipLevels();

      set({
        vipLevels: res.vipLevels || [],
      });
    } catch (err) {
      console.error(err);
    }
  },
  fetchBonusFull: async () => {
    try {
      set({ bonusLoading: true });

      const res = await api.getBonusFull();

      set({
        bonusData: res,
        bonusLoading: false // ✅ FIXED (was wrong: loading)
      });

    } catch (err) {
      console.error("Bonus Full Error:", err);
      set({ bonusLoading: false });
    }
  },
  /* ================= SUMMARY ================= */
  fetchBonusSummary: async () => {
    try {
      set({ bonusLoading: true });

      const res = await api.getBonusSummary();

      set({
        bonusSummary: res,
        bonusLoading: false,
      });
    } catch {
      set({ bonusLoading: false });
    }
  },

  /* ================= MONTHLY ================= */
  fetchMonthlyBonus: async () => {
    try {
      const res = await api.getMonthlyBonus();

      set({
        monthlyBonus: res,
      });
    } catch { }
  },

  /* ================= DAILY CLAIM ================= */
  claimDailyBonus: async () => {
    try {
      await api.claimDailyBonus();

      // 🔥 refresh after claim
      const res = await api.getBonusSummary();

      set({ bonusSummary: res });
    } catch { }
  },

  /* ================= RAKEBACK ================= */
  claimRakebackBonus: async () => {
    try {
      await api.claimRakebackBonus();

      const res = await api.getBonusSummary();

      set({ bonusSummary: res });
    } catch { }
  },

  /* ================= REDEEM ================= */
  redeemBonusCode: async (code: string) => {
    try {
      await api.redeemBonusCode(code);

      const res = await api.getBonusSummary();

      set({ bonusSummary: res });
    } catch { }
  },
}));

interface PromotionState {
  depositTiers: any[];
  promotionTabs: string[];
  promotions: any[];
  bonusTerms: any;
  loading: boolean;

  fetchDepositTiers: () => Promise<void>;
  fetchPromotionTabs: () => Promise<void>;
  fetchPromotions: (params?: any) => Promise<void>;
  fetchBonusTerms: () => Promise<void>;
}
export const usePromotionStore = create<PromotionState>((set) => ({
  depositTiers: [],
  promotionTabs: [],
  promotions: [],
  bonusTerms: null,
  loading: false,

  fetchDepositTiers: async () => {
    try {
      const res = await api.getDepositTiers();
      set({ depositTiers: res.tiers || [] });
    } catch (err) {
      console.error("Deposit Tiers Error:", err);
    }
  },

  fetchPromotionTabs: async () => {
    try {
      const res = await api.getPromotionTabs();
      set({ promotionTabs: res || [] });
    } catch (err) { }
  },

  fetchPromotions: async (params) => {
    try {
      set({ loading: true });
      const res = await api.getPromotions(params);
      set({ promotions: res || [], loading: false });
    } catch (err) {
      set({ loading: false });
    }
  },

  fetchBonusTerms: async () => {
    try {
      const res = await api.getBonusTerms();
      set({ bonusTerms: res });
    } catch (err) { }
  },
}));

interface ContestState {
  contest: any;
  leaderboard: any[];
  history: any[];
  rules: any[];
  currencies: any[];
  myPosition: any;
  loading: boolean;
  prizePool: 0,
  startDate: "",
  endDate: "",
  userStats: {
    rank: "50+",
    wager: 0,
    wagerToTop10: 0
  },

  fetchContest: () => Promise<void>;
  fetchDailyContest: () => Promise<void>;
  fetchLeaderboard: (contestId: number) => Promise<void>;
  fetchHistory: () => Promise<void>;
  fetchRules: () => Promise<void>;
  fetchMyPosition: () => Promise<void>;
}

export const useContestStore = create<ContestState>((set) => ({
  contest: null,
  leaderboard: [],
  history: [],
  rules: [],
  currencies: [],
  myPosition: null,
  loading: false,
  prizePool: 0,
  startDate: "",
  endDate: "",
  userStats: {
    rank: "50+",
    wager: 0,
    wagerToTop10: 0
  },
  // ================= ACTIVE CONTEST =================
  fetchContest: async () => {
    try {
      set({ loading: true });

      const res = await api.getActiveContest();

      set({
        contest: res,
        leaderboard: res?.leaderboard || [],
        loading: false
      });
    } catch (err) {
      console.error("Contest Error:", err);
      set({ loading: false });
    }
  },

  // ================= LEADERBOARD =================
  fetchLeaderboard: async (contestId) => {
    try {
      const res = await api.getLeaderboard(contestId);

      set({
        leaderboard: res || []
      });
    } catch (err) {
      console.error("Leaderboard Error:", err);
    }
  },

  // ================= HISTORY =================
  fetchHistory: async () => {
    try {
      const res = await api.getContestHistory();

      set({
        history: res || []
      });
    } catch (err) {
      console.error("History Error:", err);
    }
  },

  // ================= RULES =================
  fetchRules: async () => {
    try {
      const res = await api.getContestRules();

      set({
        rules: res?.rules || [],
        currencies: res?.currencies || []
      });
    } catch (err) {
      console.error("Rules Error:", err);
    }
  },

  // ================= MY POSITION =================
  fetchMyPosition: async () => {
    try {
      const res = await api.getMyContestPosition();

      set({
        myPosition: res
      });
    } catch (err) {
      console.error("My Position Error:", err);
    }
  },
  fetchDailyContest: async () => {
    const res = await api.getDailyContest();

    set({
      prizePool: res.prizePool,
      leaderboard: res.leaderboard,
      startDate: res.startDate,
      endDate: res.endDate,
      userStats: res.userStats
    });
  }
}));

type RaffleState = {
  currentRound: string;
  prizePool: number;
  totalTickets: number;
  timeLeft: any;

  myTickets: any[];
  stats: {
    total: number;
    winnings: number;
    prize: number;
  };

  winners: any[];
  totalPages: number;

  rules: any[];

  loading: boolean;

  fetchCurrentRaffle: () => Promise<void>;
  fetchMyTickets: (tab: string) => Promise<void>;
  fetchWinners: (roundId: string, page?: number) => Promise<void>;
  fetchRules: () => Promise<void>;
};

export const useRaffleStore = create<RaffleState>((set) => ({
  currentRound: "",
  prizePool: 0,
  totalTickets: 0,
  timeLeft: null,

  myTickets: [],
  stats: {
    total: 0,
    winnings: 0,
    prize: 0,
  },

  winners: [],
  totalPages: 1,

  rules: [],

  loading: false,

  // ✅ FETCH CURRENT ROUND
  fetchCurrentRaffle: async () => {
    set({ loading: true });
    try {
      const res = await api.getCurrentRaffle();

      set({
        currentRound: res.roundId,
        prizePool: res.prizePool,
        totalTickets: res.totalTickets,
        timeLeft: res.timeLeft,
      });
    } catch (err) {
      console.error("raffle error:", err);
    } finally {
      set({ loading: false });
    }
  },

  // ✅ MY TICKETS
  fetchMyTickets: async (tab) => {
    set({ loading: true });
    try {
      const res = await api.getMyTickets(tab);

      set({
        myTickets: res.tickets,
        stats: res.stats,
      });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  // ✅ WINNERS
  fetchWinners: async (roundId, page = 1) => {
    set({ loading: true });
    try {
      const res = await api.getWinners(roundId, page);

      set({
        winners: res.data,
        totalPages: res.totalPages,
      });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  // ✅ RULES
  fetchRules: async () => {
    try {
      const res = await api.getRaffleRules();
      set({ rules: res });
    } catch (err) {
      console.error(err);
    }
  },
}));