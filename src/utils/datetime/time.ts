import {useTranslation} from "react-i18next"
import {useMemo} from "react"
import {formatBaseDateTime} from "./utils.ts"
import type {Dayjs} from "dayjs"

export function useTimeFormatter() {
  const { t } = useTranslation()

  return useMemo(() => ({
    timeFormat24: (date: Date | Dayjs, showSec: boolean = false) => formatBaseDateTime(date, showSec ? t("libs:datetime.time_format.f24.sec") : t("libs:datetime.time_format.f24.no_sec")),
    timeFormat24Short: (date: Date | Dayjs, showSec: boolean = false) => formatBaseDateTime(date, showSec ? t("libs:datetime.time_format.f24_short.sec") : t("libs:datetime.time_format.f24_short.no_sec")),
    timeFormat12: (date: Date | Dayjs, showSec: boolean = false) => formatBaseDateTime(date, showSec ? t("libs:datetime.time_format.f12.sec") : t("libs:datetime.time_format.f12.no_sec")),
    timeFormat12NoApm: (date: Date | Dayjs, showSec: boolean = false) => formatBaseDateTime(date, showSec ? t("libs:datetime.time_format.f12_no_apm.sec") : t("libs:datetime.time_format.f12_no_apm.no_sec")),
    apmFormat: (date: Date | Dayjs) => formatBaseDateTime(date, t("libs:datetime.time_format.apm"))
  }), [t])
}
