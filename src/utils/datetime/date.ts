import {useTranslation} from "react-i18next"
import {useMemo} from "react"
import {formatBaseDateTime} from "./utils"
import type {Dayjs} from "dayjs"

export function useDateFormatters() {
  const { t } = useTranslation()

  return useMemo(() => ({
    dateFormat: (date: Date | Dayjs) => formatBaseDateTime(date, t("libs:datetime.date_format.default")),
    dateFormatNoYear: (date: Date | Dayjs) => formatBaseDateTime(date, t("libs:datetime.date_format.no_year")),
    dateFormatShort: (date: Date | Dayjs) => formatBaseDateTime(date, t("libs:datetime.date_format.short")),
    dateFormatNoYearShort: (date: Date | Dayjs) => formatBaseDateTime(date, t("libs:datetime.date_format.no_year_short"))
  }), [t])
}