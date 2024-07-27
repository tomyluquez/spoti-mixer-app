import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import esTranslations from "./es.json";
import enTranslations from "./en.json";

const defaultLanguage = localStorage.getItem("language") || "es";

const resources = {
  en: {
    translation: enTranslations,
  },
  es: {
    translation: esTranslations,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage, // Idioma por defecto
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
