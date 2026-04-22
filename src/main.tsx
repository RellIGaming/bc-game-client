import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n";
import { initAutoTranslate } from "./i18n/autoTranslate";

const savedLang = (() => {
  try {
    const v = localStorage.getItem("app_lang");
    return v === "bn" ? "bn" : "en";
  } catch {
    return "en";
  }
})();

createRoot(document.getElementById("root")!).render(<App />);

// Kick off after first render so the DOM is populated.
requestAnimationFrame(() => initAutoTranslate(savedLang as "en" | "bn"));
