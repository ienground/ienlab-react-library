import { CrossfadeImage, ImageUploadItem } from "@ienlab/react-library"
import { useTranslation } from "react-i18next"
import {
  DefaultField,
  DefaultFieldDescription,
  DefaultFieldLabel,
  DefaultInput, type DescriptionProps, type FieldProps,
} from "../../types/image";
import type {ComponentType, InputHTMLAttributes, LabelHTMLAttributes} from "react";

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
                                   components
                                 }: ImageUploadFieldProps) {
  const { t } = useTranslation()
  const Field = components?.Field ?? DefaultField
  const FieldLabel = components?.FieldLabel ?? DefaultFieldLabel
  const FieldDescription = components?.FieldDescription ?? DefaultFieldDescription
  const Input = components?.Input ?? DefaultInput

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <div className="space-y-4">
        <label
          htmlFor={id}
          className="group block cursor-pointer"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border bg-background transition-colors hover:bg-accent/30">
            <div className="relative w-full aspect-21/9">
              {value.url ? (
                <div className="absolute inset-0 p-6 md:p-8">
                  <div
                    className="m-auto max-h-full max-w-full"
                    style={{ aspectRatio }}
                  >
                    <CrossfadeImage
                      className="h-full w-full object-cover"
                      src={value.url}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-muted-foreground">
                  <div className="rounded-2xl bg-muted px-4 py-3 text-sm">
                    {t("libs:add_assets")}
                  </div>
                  <p className="text-sm">{uploadHintText}</p>
                </div>
              )}
            </div>

            <div className="pointer-events-none absolute inset-0 ring-0 transition-all group-hover:ring-2 group-hover:ring-primary/20" />
          </div>
        </label>

        <Input
          id={id}
          type="file"
          accept={accept}
          className="hidden"
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
      </div>

      <FieldDescription>{descriptionText}</FieldDescription>
    </Field>
  )
}