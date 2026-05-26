import type {DateTimeSelectorInjectedComponents} from "../../types"

export interface DateTimeSelectorProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  components?: DateTimeSelectorInjectedComponents
}