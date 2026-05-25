import type {
  ButtonHTMLAttributes,
  ComponentType,
  HTMLAttributes,
} from "react"

export type DialogRootProps = HTMLAttributes<HTMLDivElement> & {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export type DialogContentProps = HTMLAttributes<HTMLDivElement>
export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>
export type DialogTitleProps = HTMLAttributes<HTMLHeadingElement>
export type DialogDescriptionProps = HTMLAttributes<HTMLParagraphElement>
export type DialogFooterProps = HTMLAttributes<HTMLDivElement>
export type DialogButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export type AlertDialogInjectedComponents = {
  DialogRoot?: ComponentType<DialogRootProps>
  DialogContent?: ComponentType<DialogContentProps>
  DialogHeader?: ComponentType<DialogHeaderProps>
  DialogTitle?: ComponentType<DialogTitleProps>
  DialogDescription?: ComponentType<DialogDescriptionProps>
  DialogFooter?: ComponentType<DialogFooterProps>
  CancelButton?: ComponentType<DialogButtonProps>
  ConfirmButton?: ComponentType<DialogButtonProps>
}

export const DefaultDialogRoot = ({ open, children }: DialogRootProps) => {
  if (!open) return null
  return <div>{children}</div>
}

export const DefaultDialogContent = (props: DialogContentProps) => <div {...props} />
export const DefaultDialogHeader = (props: DialogHeaderProps) => <div {...props} />
export const DefaultDialogTitle = (props: DialogTitleProps) => <h2 {...props} />
export const DefaultDialogDescription = (props: DialogDescriptionProps) => <p {...props} />
export const DefaultDialogFooter = (props: DialogFooterProps) => <div {...props} />
export const DefaultCancelButton = (props: DialogButtonProps) => <button type="button" {...props} />
export const DefaultConfirmButton = (props: DialogButtonProps) => <button type="button" {...props} />