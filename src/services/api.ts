import axios from "axios";

const API = axios.create({
  baseURL: "https://bc-game-server.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

/* 🔐 Attach JWT Token */
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* =====================
   AUTH APIS
===================== */
export const signup = (data: {
  username: string;
  email: string;
  password: string;
}) => API.post("/auth/signup", data);

export const signin = (data: {
  email: string;
  password: string;
}) => API.post("/auth/signin", data);

export const forgotPassword = (email: string) =>
  API.post("/auth/forgot-password", { email });

export const resetPassword = (
  token: string,
  password: string
) =>
  API.post(`/auth/reset-password/${token}`, { password });

export const getProfile = () => API.get("/auth/profile");

/* =====================
   ADMIN APIS
===================== */
export const changeUserRole = (data: {
  userId: string;
  role: "user" | "affiliate" | "agent" | "admin";
}) => API.post("/admin/change-role", data);

export default API;
