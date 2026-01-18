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

export default { signup, signin, forgotPassword, resetPassword, getProfile, changeUserRole };
