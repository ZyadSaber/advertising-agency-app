// /i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // Use the HTTP backend to load translations from your API
  .use(HttpBackend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // Initialize i18next
  .init({
    fallbackLng: "en", // Use 'en' if detected language is not available
    defaultNS: "common",
    debug: process.env.NODE_ENV === "development", // Enable debug output in development

    interpolation: {
      escapeValue: false, // React already safes from xss
    },

    backend: {
      // Path to your API endpoint
      // {{lng}} will be replaced by the language code (e.g., 'en')
      // {{ns}} will be replaced by the namespace (e.g., 'common')
      loadPath: "/api/locales/{{lng}}",
    },
  });

export default i18n;
