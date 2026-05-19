import i18n from 'i18next'
import {initReactI18next} from "react-i18next"

import en from "./en/strings.json"
import ko from "./ko/strings.json"
import {initIenlabI18n} from "@ienlab/react-library";

i18n
  .use(initReactI18next)
  .init({
  resources: {
    en: { strings: en },
    ko: { strings: ko }
  },
  lng: 'ko',
  fallbackLng: 'ko',
  interpolation: { escapeValue: false }
})

initIenlabI18n(i18n)

export default i18n