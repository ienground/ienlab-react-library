import { useTranslation } from "react-i18next"
import {DefaultField, DefaultFieldLabel} from "../../types/image"
import {
  DefaultCalendar,
  DefaultFieldGroup, DefaultInputGroup,
  DefaultInputGroupAddon,
  DefaultInputGroupInput,
  DefaultTimeIcon
} from "../../types"
import type {DateTimeSelectorProps} from "./DateTimeSelectorProps"

export function BaseDateTimeSelector(props: DateTimeSelectorProps) {
  const { t } = useTranslation()

  const timeValue = props.date
    ? [String(props.date.getHours()).padStart(2, "0"), String(props.date.getMinutes()).padStart(2, "0"), String(props.date.getSeconds()).padStart(2, "0")].join(":")
    : "10:30:00"

  const handleDateSelect = (nextDate: Date | undefined) => {
    if (!nextDate) {
      props.setDate(undefined)
      return
    }

    if (!props.date) {
      props.setDate(nextDate)
      return
    }

    const merged = new Date(nextDate)
    merged.setHours(props.date.getHours(), props.date.getMinutes(), props.date.getSeconds(), props.date.getMilliseconds())
    props.setDate(merged)
  }

  const handleTimeChange = (value: string) => {
    const [hours = "0", minutes = "0", seconds = "0"] = value.split(":")

    const baseDate = props.date ? new Date(props.date) : new Date()
    baseDate.setHours(Number(hours), Number(minutes), Number(seconds), 0)

    props.setDate(baseDate)
  }

  const Calendar = props.components?.Calendar ?? DefaultCalendar
  const Field = props.components?.Field ?? DefaultField
  const FieldLabel = props.components?.FieldLabel ?? DefaultFieldLabel
  const FieldGroup = props.components?.FieldGroup ?? DefaultFieldGroup
  const InputGroup = props.components?.InputGroup ?? DefaultInputGroup
  const InputGroupInput = props.components?.InputGroupInput ?? DefaultInputGroupInput
  const InputGroupAddon = props.components?.InputGroupAddon ?? DefaultInputGroupAddon
  const TimeIcon = props.components?.TimeIcon ?? DefaultTimeIcon

  return (
    <div>
      <Calendar
        mode="single"
        captionLayout="dropdown"
        defaultMonth={props.date}
        selected={props.date}
        onSelect={handleDateSelect}
      />

      <FieldGroup className="border-t p-4">
        <Field>
          <FieldLabel htmlFor="time">{t("libs:time")}</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="time"
              type="time"
              step="1"
              value={timeValue}
              onChange={e => handleTimeChange(e.target.value)}
              className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
            <InputGroupAddon>
              <TimeIcon className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>
    </div>
  )
}