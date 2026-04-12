import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState('en');

  const changeLanguage = useCallback((lng) => {
    setLang(lng);
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  }, [i18n]);

  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
  }, []);

  return (
    <LangContext.Provider value={{ lang, changeLanguage }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
