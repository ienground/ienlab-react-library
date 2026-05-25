import {useTranslation} from "react-i18next";
import type AlertDialogProps from "./AlertDialogProps.ts"
import {
  DefaultCancelButton, DefaultConfirmButton,
  DefaultDialogContent, DefaultDialogDescription, DefaultDialogFooter,
  DefaultDialogHeader,
  DefaultDialogRoot, DefaultDialogTitle
} from "../../types"

export default function RouterPromptAlertDialog(props: AlertDialogProps) {
  const { t } = useTranslation()

  const AlertDialog = props.components?.DialogRoot ?? DefaultDialogRoot
  const AlertDialogContent = props.components?.DialogContent ?? DefaultDialogContent
  const AlertDialogHeader = props.components?.DialogHeader ?? DefaultDialogHeader
  const AlertDialogTitle = props.components?.DialogTitle ?? DefaultDialogTitle
  const AlertDialogDescription =
    props.components?.DialogDescription ?? DefaultDialogDescription
  const AlertDialogFooter = props.components?.DialogFooter ?? DefaultDialogFooter
  const CancelButton = props.components?.CancelButton ?? DefaultCancelButton
  const ConfirmButton = props.components?.ConfirmButton ?? DefaultConfirmButton

  return (
    <AlertDialog open={props.visible} onOpenChange={props.onVisibleChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("libs:quit_warning_title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("libs:quite_warning_desc")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <CancelButton onClick={() => props.onVisibleChange(false)}>{t("libs:cancel")}</CancelButton>
          <ConfirmButton onClick={props.onConfirm}>{t("libs:confirm")}</ConfirmButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}