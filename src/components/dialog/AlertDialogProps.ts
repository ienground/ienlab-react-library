import type {AlertDialogInjectedComponents} from "../../types"

export interface AlertDialogProps {
  visible: boolean
  onVisibleChange: (visible: boolean) => void
  onConfirm: () => void
  components?: AlertDialogInjectedComponents
}