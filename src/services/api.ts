const BASE_URL = "https://bc-game-server.onrender.com";
// const BASE_URL = "http://localhost:5000";

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

  getBalance,
  requestDeposit,
  requestWithdraw,
  betDebit,
  betCredit,
  getTransactions,
  getWalletSummary,

  getGames,
};