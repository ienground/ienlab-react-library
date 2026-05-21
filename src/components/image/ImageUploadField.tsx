import { CrossfadeImage, ImageUploadItem } from "@ienlab/react-library"
import { useTranslation } from "react-i18next"
import {
  DefaultField,
  DefaultFieldDescription,
  DefaultFieldLabel,
  DefaultInput,
  type DescriptionProps,
  type FieldProps,
} from "../../types/image"
import type {
  ComponentType,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react"
import "./image-upload.css"

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
  const { t } = useTranslation()

  const Field = components?.Field ?? DefaultField
  const FieldLabel = components?.FieldLabel ?? DefaultFieldLabel
  const FieldDescription =
    components?.FieldDescription ?? DefaultFieldDescription
  const Input = components?.Input ?? DefaultInput

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <div className="iu-field">
        <label htmlFor={id} className="iu-trigger">
          <div className="iu-card">
            <div className="iu-frame">
              {value.url ? (
                <div className="iu-image-layer">
                  <div
                    className="iu-image-box"
                    style={{ aspectRatio }}
                  >
                    <CrossfadeImage
                      src={value.url}
                      className="iu-image"
                    />
                  </div>
                </div>
              ) : (
                <div className="iu-empty">
                  <div className="iu-badge">{t("libs:add_assets")}</div>
                  <p className="iu-hint">{uploadHintText}</p>
                </div>
              )}
            </div>

            <div className="iu-overlay" />
          </div>
        </label>

        <Input
          id={id}
          type="file"
          accept={accept}
          className="iu-hidden-input"
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
        />

        <FieldDescription>{descriptionText}</FieldDescription>
      </div>
    </Field>
  )
}