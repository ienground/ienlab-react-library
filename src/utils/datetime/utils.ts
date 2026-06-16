import i18n from "i18next"
import dayjs, {Dayjs} from "dayjs"

export function formatBaseDateTime(date: Date | Dayjs, formatStr: string): string {
  const d = date instanceof Date ? dayjs(date) : date;
  if (!date || !d.isValid()) {
    return '';
  }
  const locale = i18n.language?.split('-')[0] === 'ko' ? 'ko' : 'en';
  return d.locale(locale).format(formatStr);
}