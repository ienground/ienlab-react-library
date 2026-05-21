import { useTranslation } from "react-i18next"
import { Reorder } from "motion/react"
import type {
  ComponentType,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  CSSProperties,
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
import "./image-upload.css"

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

  const cardStyle: CSSProperties = {
    aspectRatio,
  }

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <div className="iusf-field">
        <div className="iusf-container">
          <ScrollArea className="iusf-scroll-area">
            <Reorder.Group
              axis="x"
              values={items}
              onReorder={onChange}
              layoutScroll
              className="iusf-list"
            >
              {items.map((item) => (
                <Reorder.Item
                  key={item.url}
                  value={item}
                  className="iusf-item"
                >
                  <Card
                    className="iusf-card"
                    style={cardStyle}
                  >
                    <div className="iusf-card-inner">
                      <CrossfadeImage
                        src={item.url}
                        className="iusf-image"
                        draggable={false}
                        alt={label}
                      />

                      <Button
                        type="button"
                        className="iusf-remove-button"
                        onClick={() => removeItem(item)}
                      >
                        <CloseIcon />
                      </Button>
                    </div>
                  </Card>
                </Reorder.Item>
              ))}

              <label htmlFor={id} className="iusf-upload-trigger">
                <Card
                  className="iusf-upload-card"
                  style={cardStyle}
                >
                  <div className="iusf-upload-inner">
                    <div className="iu-badge">{t("libs:add_assets")}</div>
                    <p className="iu-hint">{uploadHintText}</p>
                  </div>
                </Card>
              </label>
            </Reorder.Group>

            <ScrollBar
              orientation="horizontal"
              className="iusf-scrollbar"
            />
          </ScrollArea>

          <Input
            id={id}
            type="file"
            accept={accept}
            multiple
            className="iu-hidden-input"
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