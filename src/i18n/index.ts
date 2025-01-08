import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../lang/en.json";
import faTranslations from "../lang/fa.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    fa: { translation: faTranslations },
  },
  lng: "fa", // زبان پیش‌فرض
  fallbackLng: "en", // زبان پشتیبان
  interpolation: {
    escapeValue: false, // برای جلوگیری از XSS
  },
});

export default i18n;
