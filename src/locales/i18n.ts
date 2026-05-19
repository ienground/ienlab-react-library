import ko from './ko/strings.json'
import en from './en/strings.json'

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
  if (!i18n.hasResourceBundle('ko', 'ienlab')) {
    i18n.addResourceBundle('ko', 'ienlab', ko, true, false)
  }

  if (!i18n.hasResourceBundle('en', 'ienlab')) {
    i18n.addResourceBundle('en', 'ienlab', en, true, false)
  }
}