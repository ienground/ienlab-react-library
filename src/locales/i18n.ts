import ko from './ko/libs.json'
import en from './en/libs.json'

type I18nResourceApi = {
  hasResourceBundle: (lng: string, ns: string) => boolean
  addResourceBundle: (
    lng: string,
    ns: string,
    resources: object,
    deep?: boolean,
    overwrite?: boolean
  ) => unknown
}

export function initIenlabI18n(i18n: I18nResourceApi) {
  if (!i18n.hasResourceBundle('ko', 'libs')) {
    i18n.addResourceBundle('ko', 'libs', ko, true, false)
  }

  if (!i18n.hasResourceBundle('en', 'libs')) {
    i18n.addResourceBundle('en', 'libs', en, true, false)
  }
}