const BASE_URL = "https://bc-game-server.onrender.com";
//const BASE_URL = "http://localhost:5000";

interface RequestConfig {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

const fetchWithAuth = async (
  endpoint: string,
  config: RequestConfig = {}
): Promise<any> => {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...config.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...config,
    headers,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || `HTTP error ${response.status}`);
  }

  return response.json();
};

/* =====================
   AUTH APIS
===================== */

export const signup = (data: {
  username: string;
  email: string;
  password: string;
  promocode?: string;
}) =>
  fetchWithAuth("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const signin = (data: {
  identifier: string;
  password: string;
}) =>
  fetchWithAuth("/api/auth/signin", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const otpLogin = (data: {
  identifier: string;
  otp: string;
}) =>
  fetchWithAuth("/api/auth/otp-login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const forgotPassword = (email: string) =>
  fetchWithAuth("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

export const resetPassword = (token: string, password: string) =>
  fetchWithAuth(`/api/auth/reset-password/${token}`, {
    method: "POST",
    body: JSON.stringify({ password }),
  });

export const getProfile = () =>
  fetchWithAuth("/api/auth/profile"); // ✅ FIXED

export const updateProfile = (data: {
  username?: string;
  email?: string;
  phone?: string;
  file?: File;
}) => {
  const formData = new FormData();

  if (data.username) formData.append("username", data.username);
  if (data.email) formData.append("email", data.email);
  if (data.phone) formData.append("phone", data.phone);
  if (data.file) formData.append("file", data.file);

  const token = localStorage.getItem("token");

  return fetch(`${BASE_URL}/api/auth/update-profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`, // ❗ NO Content-Type here
    },
    body: formData,
  }).then(res => res.json());
};
/* =====================
   WALLET APIS
===================== */

// ✅ get wallets
export const getBalance = () => {
  return fetchWithAuth("/api/wallet/balance");
};

export const requestDeposit = (data: {
  currency: string;
  amount: number;
  method: string;
  network?: string;
}) => {
  return fetchWithAuth("/api/deposit/request", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const requestWithdraw = (data: {
  currency: string;
  amount: number;
  method: string;
  account: string;
}) => {
  return fetchWithAuth("/api/withdraw/request", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// ✅ bet debit
export const betDebit = (amount: number, betId: number) => {
  return fetchWithAuth("/api/wallet/bet-debit", {
    method: "POST",
    body: JSON.stringify({ amount, betId }),
  });
};

// ✅ bet credit
export const betCredit = (amount: number, betId: number) => {
  return fetchWithAuth("/api/wallet/bet-credit", {
    method: "POST",
    body: JSON.stringify({ amount, betId }),
  });
};

// ✅ transactions
export const getTransactions = () => {
  return fetchWithAuth("/api/wallet/transactions");
};

// ✅ summary (optional but useful)
export const getWalletSummary = () => {
  return fetchWithAuth("/api/wallet/summary");
};
export const getUserNotifications = () =>
  fetchWithAuth("/api/notifications");
// 🔹 Get swap balances
export const getSwapBalances = () => {
  return fetchWithAuth("/api/swap/balance");
};
export const getSwapRate = (from: string, to: string) => {
  return fetchWithAuth(`/api/swap/rate?from=${from}&to=${to}`);
};
// 🔹 Execute swap
export const swapCrypto = (data: {
  from: string;
  to: string;
  amount: number;
  rate: number;
}) => {
  return fetchWithAuth("/api/swap/crypto", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getVault = () => {
  return fetchWithAuth("/api/vault");
};
export const getVaultInterest = (filter: string) => {
  return fetchWithAuth(`/api/vault/transactions?filter=${filter}`);
};
export const depositVault = (data: any) => {
  return fetchWithAuth("/api/vault/deposit", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const withdrawVault = (data: any) => {
  return fetchWithAuth("/api/vault/withdraw", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/* =====================
   REFERRAL APIS
===================== */

export const getReferralFriends = () =>
  fetchWithAuth("/api/referral/friends");

export const getReferralEarnings = () =>
  fetchWithAuth("/api/referral/earnings");

export const getReferralDashboard = () =>
  fetchWithAuth("/api/referral/dashboard");
// Summary (top cards)
export const getRewardsSummary = () =>
  fetchWithAuth("/api/referral/rewards/summary");

// Commission by Friends
export const getCommissionByFriends = (params?: any) => {
  const query = params
    ? "?" + new URLSearchParams(params).toString()
    : "";

  return fetchWithAuth(`/api/referral/rewards/friends${query}`);
};

// Commission by Currency
export const getCommissionByCurrency = () =>
  fetchWithAuth("/api/referral/rewards/currency");

// Level Rewards
export const getLevelUpRewards = () =>
  fetchWithAuth("/api/referral/rewards/level");

// Reward History
export const getRewardHistory = (type?: string) =>
  fetchWithAuth(`/api/referral/rewards/history?type=${type || ""}`);

/* =====================
   BONUS APIS
===================== */

// 🔹 Bonus summary (main dashboard)
export const getBonusSummary = () =>
  fetchWithAuth("/api/bonus/summary");

// 🔹 Monthly bonus
export const getMonthlyBonus = () =>
  fetchWithAuth("/api/bonus/monthly");

// 🔹 Claim daily bonus
export const claimDailyBonus = () =>
  fetchWithAuth("/api/bonus/daily/claim", {
    method: "POST",
  });

// 🔹 Claim rakeback
export const claimRakebackBonus = () =>
  fetchWithAuth("/api/bonus/rakeback/claim", {
    method: "POST",
  });

// 🔹 Redeem code
export const redeemBonusCode = (code: string) =>
  fetchWithAuth("/api/bonus/redeem", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
export const getBonusFull = () => {
  return fetchWithAuth("/api/bonus/full");
};

// 🔹 Monthly bonus only (optional separate call)
export const getTestBonusData = () => {
  return fetchWithAuth("/api/bonus/test-seed");
};
export const getVipLevels = () => {
  return fetchWithAuth("/api/bonus/vip-levels");
};
export const getVipClub = () => {
  return fetchWithAuth("/api/bonus/vip-club");
};

export const getVipBonusTable= () => {
  return fetchWithAuth("/api/bonus/vip-table");
}
/* =====================
   GAMES APIS
===================== */

export const getGames = (category?: string) => {
  const query = category ? `?category=${category}` : "";
  return fetchWithAuth(`/api/games${query}`);
};

/* =====================
   EXPORT
===================== */

export default {
  signup,
  signin,
  otpLogin,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
getVault,
  getBalance,
  requestDeposit,
  requestWithdraw,
  betDebit,
  betCredit,
  getTransactions,
  getWalletSummary,
 getReferralFriends,
  getReferralEarnings,
  getReferralDashboard,
  getGames,
  getBonusSummary,
  getMonthlyBonus,
  claimDailyBonus,
  claimRakebackBonus,
  redeemBonusCode,
  getVipBonusTable,
};