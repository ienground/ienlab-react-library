import dayjs, {Dayjs} from "dayjs"

export function formatBaseDateTime(date: Date | Dayjs, formatStr: string): string {
  const d = date instanceof Date ? dayjs(date) : date;
  if (!date || !d.isValid()) {
    return '';
  }
  return d.format(formatStr);
}