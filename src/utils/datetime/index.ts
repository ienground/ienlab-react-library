import i18n from "i18next"
import dayjs from "dayjs"

export * from "./date"
export * from "./datetime"
export * from "./time"
export * from "./utils"

const syncDayjsLocale = (lng?: string) => {
  const normalized = lng?.split('-')[0] === 'ko' ? 'ko' : 'en';
  dayjs.locale(normalized);
};

// 1) 앱 시작 시 최초 1회 동기화
if (i18n.isInitialized) {
  syncDayjsLocale(i18n.resolvedLanguage || i18n.language);
}

// 2) 이후 언어 변경 이벤트 동기화
i18n.on('languageChanged', syncDayjsLocale);

export default dayjs;