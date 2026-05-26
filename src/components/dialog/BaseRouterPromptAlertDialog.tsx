import {useTranslation} from "react-i18next";
import {
  DefaultDialogContent, DefaultDialogDescription, DefaultDialogFooter,
  DefaultDialogHeader,
  DefaultDialogRoot, DefaultDialogTitle
} from "../../types"
import {DefaultButton} from "../../types/image"
import type {AlertDialogProps} from "./AlertDialogProps"

export function BaseRouterPromptAlertDialog(props: AlertDialogProps) {
  const { t } = useTranslation()

  const AlertDialog = props.components?.AlertDialog ?? DefaultDialogRoot
  const AlertDialogContent = props.components?.AlertDialogContent ?? DefaultDialogContent
  const AlertDialogHeader = props.components?.AlertDialogHeader ?? DefaultDialogHeader
  const AlertDialogTitle = props.components?.AlertDialogTitle ?? DefaultDialogTitle
  const AlertDialogDescription = props.components?.AlertDialogDescription ?? DefaultDialogDescription
  const AlertDialogFooter = props.components?.AlertDialogFooter ?? DefaultDialogFooter
  const Button = props.components?.Button ?? DefaultButton

  return (
    <AlertDialog open={props.visible} onOpenChange={props.onVisibleChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("libs:quit_warning_title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("libs:quite_warning_desc")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => props.onVisibleChange(false)}
          >
            {t("libs:cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={props.onConfirm}
          >
            {t("libs:confirm")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}