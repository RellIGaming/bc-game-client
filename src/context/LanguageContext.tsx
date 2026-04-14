import { createContext, useContext, useState, useEffect } from "react";

type Lang = "en" | "bn";

const translations = {
  en: {
    welcome: "Welcome",
    login: "Login",
  },
  bn: {
    welcome: "স্বাগতম",
    login: "লগইন",
  },
};

const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: any) => {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang;
    if (saved) setLang(saved);
  }, []);

  const changeLanguage = (l: Lang) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);