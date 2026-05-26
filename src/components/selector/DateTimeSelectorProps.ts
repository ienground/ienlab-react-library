import type {DateTimeSelectorInjectedComponents} from "../../types"

export default interface DateTimeSelectorProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  components?: DateTimeSelectorInjectedComponents
}