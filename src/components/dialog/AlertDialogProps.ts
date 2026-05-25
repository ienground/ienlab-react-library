import type {AlertDialogInjectedComponents} from "../../types"

export default interface AlertDialogProps {
  visible: boolean
  onVisibleChange: (visible: boolean) => void
  onConfirm: () => void
  components?: AlertDialogInjectedComponents
}