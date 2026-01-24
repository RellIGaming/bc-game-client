// API service without axios dependency
//const BASE_URL = "https://bc-game-server.onrender.com";
const BASE_URL = "http://localhost:5000";

interface RequestConfig {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

const fetchWithAuth = async (endpoint: string, config: RequestConfig = {}) => {
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
    throw new Error(`HTTP error! status: ${response.status}`);
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
  promocode: string;
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


export const forgotPassword = (email: string) =>
  fetchWithAuth("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

export const resetPassword = (token: string, password: string) =>
  fetchWithAuth(`api/auth/reset-password/${token}`, {
    method: "POST",
    body: JSON.stringify({ password }),
  });

export const getProfile = () => fetchWithAuth("/auth/profile");

/* =====================
   ADMIN APIS
===================== */
export const changeUserRole = (data: {
  userId: string;
  role: "user" | "affiliate" | "agent" | "admin";
}) => fetchWithAuth("/admin/change-role", {
  method: "POST",
  body: JSON.stringify(data),
});


/* =====================
   GAMES APIS
===================== */

// get games by category
export const getGames = (category?: string) => {
  const query = category ? `?category=${category}` : "";
  return fetchWithAuth(`/api/games${query}`);
};

// admin create game
export const createGame = (data: {
  name: string;
  slug: string;
  image: string;
  multiplier?: string | null;
  players?: number;
  category?: string;
}) =>
  fetchWithAuth("/api/admin/games", {
    method: "POST",
    body: JSON.stringify(data),
  });

// admin update game
export const updateGame = (id: string, data: any) =>
  fetchWithAuth(`/api/admin/games/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

// admin delete game
export const deleteGame = (id: string) =>
  fetchWithAuth(`/api/admin/games/${id}`, {
    method: "DELETE",
  });





export default {
  signup, signin, forgotPassword,
  resetPassword,
  getProfile,
  changeUserRole,
  getGames, updateGame,
  createGame, deleteGame
};
