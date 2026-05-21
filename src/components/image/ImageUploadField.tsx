import {useTranslation} from "react-i18next"
import {
  DefaultField,
  DefaultFieldDescription,
  DefaultFieldLabel,
  DefaultInput,
  type DescriptionProps,
  type FieldProps,
} from "../../types/image"
import {
  type ComponentType,
  type CSSProperties,
  type InputHTMLAttributes,
  type LabelHTMLAttributes, useState,
} from "react"
import {ImageUploadItem} from "../../types";
import {CrossfadeImage} from "./CrossfadeImage.tsx";

type InjectedComponents = {
  Input?: ComponentType<InputHTMLAttributes<HTMLInputElement>>
  Field?: ComponentType<FieldProps>
  FieldLabel?: ComponentType<LabelHTMLAttributes<HTMLLabelElement>>
  FieldDescription?: ComponentType<DescriptionProps>
}

type ImageUploadFieldProps = {
  id: string
  label: string
  uploadHintText: string
  descriptionText: string
  value: ImageUploadItem
  onChange: (value: ImageUploadItem) => void
  aspectRatio?: string
  accept?: string
  components?: InjectedComponents
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  } satisfies CSSProperties,

  trigger: {
    display: "block",
    cursor: "pointer",
  } satisfies CSSProperties,

  card: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "1.5rem",
    border: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
    transition: "background-color 160ms ease, box-shadow 160ms ease",
  } satisfies CSSProperties,

  frame: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
  } satisfies CSSProperties,

  imageLayer: {
    position: "absolute",
    inset: 0,
    padding: "1.5rem",
  } satisfies CSSProperties,

  imageBox: {
    margin: "0 auto",
    maxWidth: "100%",
    maxHeight: "100%",
  } satisfies CSSProperties,

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  } satisfies CSSProperties,

  empty: {
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

  overlay: {
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    boxShadow: "inset 0 0 0 0 rgba(59, 130, 246, 0)",
    transition: "box-shadow 160ms ease",
  } satisfies CSSProperties,
} as const

export function ImageUploadField({
                                   id,
                                   label,
                                   uploadHintText,
                                   descriptionText,
                                   value,
                                   onChange,
                                   aspectRatio = "1 / 1",
                                   accept = "image/*",
                                   components,
                                 }: ImageUploadFieldProps) {
  const {t} = useTranslation()

  const Field = components?.Field ?? DefaultField
  const FieldLabel = components?.FieldLabel ?? DefaultFieldLabel
  const FieldDescription =
    components?.FieldDescription ?? DefaultFieldDescription
  const Input = components?.Input ?? DefaultInput

  const imageBoxStyle: CSSProperties = {
    ...styles.imageBox,
    aspectRatio,
  }
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <div style={styles.wrapper}>
        <label
          htmlFor={id}
          style={{
            ...styles.trigger,
            backgroundColor: isHovered ? "#f9fafb" : "#ffffff",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={styles.card}>
            <div style={styles.frame}>
              {value.url ? (
                <div style={styles.imageLayer}>
                  <div style={imageBoxStyle}>
                    <CrossfadeImage
                      src={value.url}
                      className=""
                      alt={label}
                      style={styles.image}
                    />
                  </div>
                </div>
              ) : (
                <div style={styles.empty}>
                  <div style={styles.badge}>{t("libs:add_assets")}</div>
                  <p style={styles.hint}>{uploadHintText}</p>
                </div>
              )}
            </div>

            <div
              style={{
                ...styles.overlay,
                boxShadow: isHovered
                  ? "inset 0 0 0 2px rgba(59, 130, 246, 0.16)"
                  : "inset 0 0 0 0 rgba(59, 130, 246, 0)",
              }}
            />
          </div>
        </label>
        <Input
          id={id}
          type="file"
          accept={accept}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return

            value.revokeIfNeeded()

            onChange(
              new ImageUploadItem({
                file,
                url: URL.createObjectURL(file),
              }),
            )

            e.currentTarget.value = ""
          }}
          style={{display: "none"}}
        />

        <FieldDescription>{descriptionText}</FieldDescription>
      </div>
    </Field>
  )
}