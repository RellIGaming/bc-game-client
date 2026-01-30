// store/betSlipStore.ts
import { create } from "zustand";

interface Bet {
  id: string;
   label: string; 
  value: number;
}

interface BetSlipState {
  bets: Bet[];
  expanded: boolean;
  quickBet: boolean;

  addBet: (bet: Bet) => void;
  removeBet: (id: string) => void;
  toggleExpanded: () => void;
  toggleQuickBet: () => void;
}

export const useBetSlipStore = create<BetSlipState>((set, get) => ({
  bets: [],
  expanded: true,
  quickBet: false,

  addBet: (bet) => {
    const exists = get().bets.find((b) => b.id === bet.id);
    if (exists) return;
    set({ bets: [...get().bets, bet] });
  },

  removeBet: (id) =>
    set({ bets: get().bets.filter((b) => b.id !== id) }),

  toggleExpanded: () =>
    set({ expanded: !get().expanded }),

  toggleQuickBet: () =>
    set({ quickBet: !get().quickBet }),
}));
