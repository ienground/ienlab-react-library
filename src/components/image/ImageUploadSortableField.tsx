import { useTranslation } from "react-i18next"
import { Reorder } from "motion/react"
import type {
  ComponentType,
  CSSProperties,
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
  components?: InjectedComponents
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  } satisfies CSSProperties,

  outerBox: {
    borderRadius: "1.5rem",
    border: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
    overflow: "hidden",
  } satisfies CSSProperties,

  scrollArea: {
    width: "100%",
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,

  list: {
    display: "flex",
    width: "max-content",
    gap: "1rem",
    padding: "1rem",
  } satisfies CSSProperties,

  item: {
    position: "relative",
    flexShrink: 0,
  } satisfies CSSProperties,

  card: {
    position: "relative",
    width: "15rem",
    overflow: "hidden",
    borderRadius: "0.75rem",
    padding: 0,
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    boxSizing: "border-box",
  } satisfies CSSProperties,

  cardInner: {
    position: "relative",
    width: "100%",
    height: "100%",
  } satisfies CSSProperties,

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  } satisfies CSSProperties,

  removeButton: {
    position: "absolute",
    right: "1rem",
    bottom: "1rem",
    borderRadius: "9999px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)",
  } satisfies CSSProperties,

  uploadLabel: {
    display: "block",
    flexShrink: 0,
    cursor: "pointer",
  } satisfies CSSProperties,

  uploadCard: {
    width: "15rem",
    overflow: "hidden",
    borderRadius: "0.75rem",
    padding: 0,
    border: "1px dashed #d1d5db",
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
    transition: "background-color 160ms ease",
  } satisfies CSSProperties,

  uploadCardInner: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    color: "#6b7280",
    textAlign: "center",
    padding: "1rem",
    boxSizing: "border-box",
  } satisfies CSSProperties,

  badge: {
    borderRadius: "1rem",
    backgroundColor: "#f3f4f6",
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    lineHeight: 1.2,
    color: "#111827",
  } satisfies CSSProperties,

  hint: {
    margin: 0,
    fontSize: "0.875rem",
    lineHeight: 1.4,
  } satisfies CSSProperties,

  description: {
    marginTop: "0.25rem",
  } satisfies CSSProperties,

  hiddenInput: {
    display: "none",
  } satisfies CSSProperties,

  scrollBar: {
    marginLeft: "1rem",
    marginRight: "1rem",
  } satisfies CSSProperties,
} as const

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
    ...styles.card,
    aspectRatio,
  }

  const uploadCardStyle: CSSProperties = {
    ...styles.uploadCard,
    aspectRatio,
  }

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <div style={styles.wrapper}>
        <div style={styles.outerBox}>
          <ScrollArea style={styles.scrollArea}>
            <Reorder.Group
              axis="x"
              values={items}
              onReorder={onChange}
              layoutScroll
              style={styles.list}
            >
              {items.map((item) => (
                <Reorder.Item
                  key={item.url}
                  value={item}
                  style={styles.item}
                >
                  <Card style={cardStyle}>
                    <div style={styles.cardInner}>
                      <CrossfadeImage
                        src={item.url}
                        className=""
                        style={styles.image}
                        draggable={false}
                      />

                      <Button
                        type="button"
                        style={styles.removeButton}
                        onClick={() => removeItem(item)}
                      >
                        <CloseIcon />
                      </Button>
                    </div>
                  </Card>
                </Reorder.Item>
              ))}

              <label htmlFor={id} style={styles.uploadLabel}>
                <Card
                  style={uploadCardStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f9fafb"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffffff"
                  }}
                >
                  <div style={styles.uploadCardInner}>
                    <div style={styles.badge}>{t("libs:add_assets")}</div>
                    <p style={styles.hint}>{uploadHintText}</p>
                  </div>
                </Card>
              </label>
            </Reorder.Group>

            <ScrollBar orientation="horizontal" style={styles.scrollBar} />
          </ScrollArea>

          <Input
            id={id}
            type="file"
            accept={accept}
            multiple
            onChange={(e) => {
              handleFilesSelected(e.target.files)
              e.currentTarget.value = ""
            }}
            style={styles.hiddenInput}
          />
        </div>

        <div style={styles.description}>
          <FieldDescription>{descriptionText}</FieldDescription>
        </div>
      </div>
    </Field>
  )
}