import {useTranslation} from "react-i18next"
import {useMemo} from "react"
import {formatBaseDateTime} from "./utils"
import type {Dayjs} from "dayjs"

export function useDateTimeFormatters() {
  const { t } = useTranslation()

  return useMemo(() => ({
    dateTimeFormat: (date: Date | Dayjs, showSec: boolean = false) => formatBaseDateTime(date, showSec ? t("libs:datetime.date_time_format.default.sec") : t("libs:datetime.date_time_format.default.no_sec")),
    dateTimeFormatShort: (date: Date | Dayjs, showSec: boolean = false) => formatBaseDateTime(date, showSec ? t("libs:datetime.date_time_format.short.sec") : t("libs:datetime.date_time_format.short.no_sec")),
    dateTimeFormatNoYear: (date: Date | Dayjs, showSec: boolean = false) => formatBaseDateTime(date, showSec ? t("libs:datetime.date_time_format.no_year.sec") : t("libs:datetime.date_time_format.no_year.no_sec")),
    dateTimeFormatNoYearShort: (date: Date | Dayjs, showSec: boolean = false) => formatBaseDateTime(date, showSec ? t("libs:datetime.date_time_format.no_year.short.sec") : t("libs:datetime.date_time_format.no_year.short.no_sec")),
  }), [t])
}