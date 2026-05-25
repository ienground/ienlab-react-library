import { useTranslation } from "react-i18next"
import {
  DefaultCancelButton, DefaultConfirmButton,
  DefaultDialogContent,
  DefaultDialogDescription, DefaultDialogFooter,
  DefaultDialogHeader,
  DefaultDialogRoot,
  DefaultDialogTitle
} from "../../types"
import type AlertDialogProps from "./AlertDialogProps.ts"

export default function DeleteAlertDialog(props: AlertDialogProps) {
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
      <AlertDialogContent role="alertdialog" aria-modal="true">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("libs:delete_dialog_title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("libs:delete_dialog_desc")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <CancelButton onClick={() => props.onVisibleChange(false)}>
            {t("libs:cancel")}
          </CancelButton>
          <ConfirmButton onClick={props.onConfirm}>
            {t("libs:confirm")}
          </ConfirmButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}