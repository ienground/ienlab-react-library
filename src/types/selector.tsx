import type {ComponentType, InputHTMLAttributes, LabelHTMLAttributes, ReactNode} from "react"
import type {FieldProps, IconProps} from "./image.tsx"


type CalendarProps = {
  mode?: "single"
  captionLayout?: "dropdown"
  defaultMonth?: Date
  selected?: Date
  onSelect?: (date: Date | undefined) => void
}

type FieldGroupProps = {
  children: ReactNode
  className?: string
}

type InputGroupProps = {
  children: ReactNode
  className?: string
}

type InputGroupInputProps = InputHTMLAttributes<HTMLInputElement>

type InputGroupAddonProps = {
  children: ReactNode
  className?: string
}

export type DateTimeSelectorInjectedComponents = {
  Calendar?: ComponentType<CalendarProps>
  Field?: ComponentType<FieldProps>
  FieldLabel?: ComponentType<LabelHTMLAttributes<HTMLLabelElement>>
  FieldGroup?: ComponentType<FieldGroupProps>
  InputGroup?: ComponentType<InputGroupProps>
  InputGroupInput?: ComponentType<InputGroupInputProps>
  InputGroupAddon?: ComponentType<InputGroupAddonProps>
  TimeIcon?: ComponentType<IconProps>
}

export const DefaultCalendar = (_props: CalendarProps) => {
  return <div>Calendar</div>
}

export const DefaultFieldGroup = (props: FieldGroupProps) => {
  return <div className={props.className}>{props.children}</div>
}

export const DefaultInputGroup = (props: InputGroupProps) => {
  return <div className={props.className}>{props.children}</div>
}

export const DefaultInputGroupInput = (props: InputGroupInputProps) => {
  return <input {...props} />
}

export const DefaultInputGroupAddon = (props: InputGroupAddonProps) => {
  return <div className={props.className}>{props.children}</div>
}

export const DefaultTimeIcon = ({ className }: IconProps) => (
  <span className={className}>🕔</span>
)