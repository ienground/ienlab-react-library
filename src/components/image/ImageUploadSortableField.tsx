import { useTranslation } from "react-i18next"
import { Reorder } from "motion/react"
import type {
  ComponentType,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react"

import { ImageUploadItem } from "../../types"
import {
  type ButtonLikeProps,
  type CardProps,
  DefaultButton,
  DefaultCard,
  DefaultCloseIcon,
  DefaultField,
  DefaultFieldDescription,
  DefaultFieldLabel,
  DefaultInput,
  DefaultScrollArea,
  DefaultScrollBar,
  type DescriptionProps,
  type FieldProps,
  type IconProps,
  type ScrollAreaProps,
  type ScrollBarProps,
} from "../../types/image"
import { CrossfadeImage } from "./CrossfadeImage"

type InjectedComponents = {
  Input?: ComponentType<InputHTMLAttributes<HTMLInputElement>>
  Field?: ComponentType<FieldProps>
  FieldLabel?: ComponentType<LabelHTMLAttributes<HTMLLabelElement>>
  FieldDescription?: ComponentType<DescriptionProps>
  ScrollArea?: ComponentType<ScrollAreaProps>
  ScrollBar?: ComponentType<ScrollBarProps>
  Card?: ComponentType<CardProps>
  Button?: ComponentType<ButtonLikeProps>
  CloseIcon?: ComponentType<IconProps>
}

type ImageUploadSortableFieldProps = {
  id: string
  label: string
  descriptionText: string
  uploadHintText: string
  items: ImageUploadItem[]
  onChange: (items: ImageUploadItem[]) => void
  aspectRatio?: string
  accept?: string
  cardRounded?: string
  components?: InjectedComponents
}

export function ImageUploadSortableField({
                                           id,
                                           label,
                                           descriptionText,
                                           uploadHintText,
                                           items,
                                           onChange,
                                           aspectRatio = "1 / 1",
                                           accept = "image/*",
                                           cardRounded = "rounded-md",
                                           components,
                                         }: ImageUploadSortableFieldProps) {
  const { t } = useTranslation()

  const Field = components?.Field ?? DefaultField
  const FieldLabel = components?.FieldLabel ?? DefaultFieldLabel
  const FieldDescription =
    components?.FieldDescription ?? DefaultFieldDescription
  const Input = components?.Input ?? DefaultInput
  const ScrollArea = components?.ScrollArea ?? DefaultScrollArea
  const ScrollBar = components?.ScrollBar ?? DefaultScrollBar
  const Card = components?.Card ?? DefaultCard
  const Button = components?.Button ?? DefaultButton
  const CloseIcon = components?.CloseIcon ?? DefaultCloseIcon

  const removeItem = (target: ImageUploadItem) => {
    target.revokeIfNeeded()
    onChange(items.filter((item) => item !== target))
  }

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const nextItems = [
      ...items,
      ...Array.from(files).map(
        (file) =>
          new ImageUploadItem({
            file,
            url: URL.createObjectURL(file),
          }),
      ),
    ]

    onChange(nextItems)
  }

  return (
    <Field>
      <div className="space-y-3">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>

        <div className="rounded-3xl border border-border bg-background">
          <ScrollArea className="w-full whitespace-nowrap">
            <Reorder.Group
              axis="x"
              values={items}
              onReorder={onChange}
              layoutScroll
              className="flex w-max gap-4 p-4"
            >
              {items.map((item) => (
                <Reorder.Item
                  key={item.url}
                  value={item}
                  className="relative shrink-0"
                >
                  <Card
                    className={`w-60 overflow-hidden ${cardRounded} p-0`}
                    style={{ aspectRatio }}
                  >
                    <div className="relative h-full w-full">
                      <CrossfadeImage
                        src={item.url}
                        className="h-full w-full object-cover"
                        draggable={false}
                      />

                      <Button
                        type="button"
                        className="absolute bottom-4 right-4 rounded-full shadow-sm"
                        onClick={() => removeItem(item)}
                      >
                        <CloseIcon />
                      </Button>
                    </div>
                  </Card>
                </Reorder.Item>
              ))}

              <label htmlFor={id} className="block shrink-0 cursor-pointer">
                <Card
                  className={`w-60 overflow-hidden ${cardRounded} border-dashed p-0 transition-colors hover:bg-accent/30`}
                  style={{ aspectRatio }}
                >
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-muted-foreground">
                    <div className="rounded-2xl bg-muted px-4 py-3 text-sm">
                      {t("libs:add_assets")}
                    </div>
                    <p className="text-sm">{uploadHintText}</p>
                  </div>
                </Card>
              </label>
            </Reorder.Group>

            <ScrollBar orientation="horizontal" className="mx-4" />
          </ScrollArea>

          <Input
            id={id}
            type="file"
            accept={accept}
            multiple
            className="hidden"
            onChange={(e) => {
              handleFilesSelected(e.target.files)
              e.currentTarget.value = ""
            }}
          />
        </div>

        <FieldDescription>{descriptionText}</FieldDescription>
      </div>
    </Field>
  )
}