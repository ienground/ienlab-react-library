import i18next from 'i18next';
import ko from './ko/strings.json';
import en from './en/strings.json';

// 앱에서 한 번 호출해서 라이브러리 번역 등록
export function initIenlabI18n() {
  i18next.addResourceBundle('ko', 'ienlab', ko, true, false);
  i18next.addResourceBundle('en', 'ienlab', en, true, false);
}