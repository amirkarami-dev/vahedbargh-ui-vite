import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import fa from '@/locales/fa/translation.json'
import eng from '@/locales/eng/translation.json'

// fa is default/primary; eng exists too. Persist choice in localStorage I18N_LANGUAGE.
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fa: { translation: fa },
      eng: { translation: eng },
    },
    fallbackLng: 'fa',
    keySeparator: '.',
    detection: {
      order: ['localStorage'],
      lookupLocalStorage: 'I18N_LANGUAGE',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  })

export default i18n
