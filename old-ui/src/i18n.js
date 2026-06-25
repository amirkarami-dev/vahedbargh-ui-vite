import i18n from "i18next"
import detector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import translationFa from "./locales/fa/translation.json"
import translationENG from "./locales/eng/translation.json"

// the translations
const resources = {
  fa: {
    translation: translationFa,
  },
  eng: {
    translation: translationENG,
  },
}

const language = localStorage.getItem("I18N_LANGUAGE")
console.log("language",language);
if (!language) {
  localStorage.setItem("I18N_LANGUAGE", "fa")
}

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("I18N_LANGUAGE") || "en",
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: ".", // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
