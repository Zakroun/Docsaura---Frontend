import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const { i18n } = useTranslation();
  const getInitialLang = () => {
    const savedLang = localStorage.getItem('lang');
    return savedLang || 'en';
  };

  const [lang, setLang] = useState(getInitialLang);

  const changeLanguage = useCallback((lng) => {
    setLang(lng);
    localStorage.setItem('lang', lng);
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  }, [i18n]);

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'en';
    i18n.changeLanguage(savedLang);
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLang;
    setLang(savedLang);
  }, [i18n]);

  return (
    <LangContext.Provider value={{ lang, changeLanguage }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);