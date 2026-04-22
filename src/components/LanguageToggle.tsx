import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { setAutoTranslateLanguage } from "@/i18n/autoTranslate";

interface LanguageToggleProps {
  className?: string;
  variant?: "light" | "dark";
}

const LanguageToggle = ({ className, variant = "dark" }: LanguageToggleProps) => {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith("bn") ? "bn" : "en";

  const setLang = (lng: "en" | "bn") => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem("app_lang", lng);
    } catch {}
    setAutoTranslateLanguage(lng);
  };

  const baseBtn =
    "px-2 py-0.5 text-xs font-semibold rounded transition-colors";
  const activeCls =
    variant === "light"
      ? "bg-white text-emerald-700"
      : "bg-primary text-primary-foreground";
  const inactiveCls =
    variant === "light"
      ? "text-white/80 hover:text-white"
      : "text-muted-foreground hover:text-foreground";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-md p-0.5",
        variant === "light" ? "bg-white/10" : "bg-secondary",
        className
      )}
    >
      <button
        onClick={() => setLang("en")}
        className={cn(baseBtn, current === "en" ? activeCls : inactiveCls)}
        aria-pressed={current === "en"}
      >
        EN
      </button>
      <button
        onClick={() => setLang("bn")}
        className={cn(baseBtn, current === "bn" ? activeCls : inactiveCls)}
        aria-pressed={current === "bn"}
      >
        বাং
      </button>
    </div>
  );
};

export default LanguageToggle;
