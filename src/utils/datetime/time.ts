import {useTranslation} from "react-i18next"
import {useMemo} from "react"
import {formatBaseDateTime} from "./utils"
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

export interface FormatMinutesOptions {
  style?: 'long' | 'short'
}

function splitTime(minutes: number) {
  const totalSeconds = Math.round(minutes * 60)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const mins = Math.floor((totalSeconds % 3600) / 60)
  const secs = totalSeconds % 60

  return { day: days, hour: hours, minute: mins, second: secs }
}

export function useDurationFormatter() {
  const {t} = useTranslation()

  return useMemo(() => ({
    minFormat: (minutes: number) => {
      const { day, hour, minute } = splitTime(minutes)
      const result: string[] = []

      if (day !== 0) result.push(t("libs:datetime.duration.day", { count: day }))
      if (hour !== 0) result.push(t("libs:datetime.duration.hour.default", { count: hour }))
      if (minute !== 0) result.push(t("libs:datetime.duration.minute.default", { count: minute }))
      if (result.length === 0) result.push(t("libs:datetime.duration.zero.default"))

      return result.join(" ")
    },
    minFormatShort: (minutes: number) => {
      const { day, hour, minute } = splitTime(minutes)
      const result: string[] = []

      if (day !== 0) result.push(t("libs:datetime.duration.day", { count: day }))
      if (hour !== 0) result.push(t("libs:datetime.duration.hour.short", { count: hour }))
      if (minute !== 0) result.push(t("libs:datetime.duration.minute.short", { count: minute }))
      if (result.length === 0) result.push(t("libs:datetime.duration.zero.short"))

      return result.join(" ")
    }
  }), [t])
}
