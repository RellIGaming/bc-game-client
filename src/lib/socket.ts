import { io } from "socket.io-client";

const socket = io("https://bc-game-server.onrender.com", {
  transports: ["websocket", "polling"],
  autoConnect: true,
});

socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket error:", err.message);
});

socket.on("disconnect", () => {
  console.log("⚠️ Socket disconnected");
});

export default socket;