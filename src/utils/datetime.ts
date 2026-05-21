import {useTranslation} from "react-i18next";
import dayjs from "dayjs";
import {useMemo} from 'react';
import i18n, {type TFunction} from "i18next";

function formatBaseDateTime(date: Date, formatKey: string, t: TFunction): string {
  const d = dayjs(date);
  if (!date || !d.isValid()) {
    return '';
  }
  return d.format(t(formatKey));
}

export function useDateTimeFormatters() {
  const { t } = useTranslation(); // 💡 Hook은 여기서 한 번만 호출됩니다.

  return useMemo(() => ({
    basicDateTimeFormat: (date: Date, formatKey: string) => formatBaseDateTime(date, formatKey, t),
    dateTimeFormat: (date: Date) => formatBaseDateTime(date, "libs:datetime.date_time_format", t),
    dateFormat: (date: Date) => formatBaseDateTime(date, "libs:datetime.date_format", t),
    timeFormat: (date: Date) => formatBaseDateTime(date, "libs:datetime.time_format", t),
  }), [t]);
}

export function dateIdFormat(date: Date): string {
  const d = dayjs(date);
  return d.isValid() ? d.format("YYYYMMDD") : "";
}

export function time24Format(date: Date): string {
  const d = dayjs(date);
  return d.isValid() ? d.format("HH:mm") : "";
}

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