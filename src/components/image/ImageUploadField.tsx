import {useTranslation} from "react-i18next"
import {
  DefaultButton,
  DefaultCloseIcon,
  DefaultField,
  DefaultFieldDescription,
  DefaultFieldLabel,
  DefaultInput,
  type ButtonLikeProps,
  type DescriptionProps,
  type FieldProps,
  type IconProps,
} from "../../types/image"
import {
  type ComponentType,
  type CSSProperties,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  useState,
} from "react"
import {FileUploadItem} from "../../types"
import {CrossfadeImage} from "./CrossfadeImage"
import {
  validateUpload,
  hasValidation,
  type ImageValidationOptions,
  type ImageValidationError,
} from "../../utils"

type InjectedComponents = {
  Input?: ComponentType<InputHTMLAttributes<HTMLInputElement>>
  Field?: ComponentType<FieldProps>
  FieldLabel?: ComponentType<LabelHTMLAttributes<HTMLLabelElement>>
  FieldDescription?: ComponentType<DescriptionProps>
  Button?: ComponentType<ButtonLikeProps>
  CloseIcon?: ComponentType<IconProps>
}

type ImageUploadFieldProps = {
  id: string
  label: string
  uploadHintText: string
  descriptionText: string
  value: FileUploadItem
  onChange: (value: FileUploadItem) => void
  aspectRatio?: string
  accept?: string
  components?: InjectedComponents
  requiredSize?: string
  maxSize?: string
  maxFileSizeMB?: number
  requiredAspectRatio?: boolean
  className?: string
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
    borderRadius: "1.5rem"
  } satisfies CSSProperties,

  card: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "1.5rem",
    border: "1px solid var(--border)",
    backgroundColor: "var(--card)",
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
    color: "var(--muted-foreground)",
    textAlign: "center",
    padding: "1rem",
    boxSizing: "border-box",
  } satisfies CSSProperties,

  badge: {
    borderRadius: "1rem",
    backgroundColor: "var(--secondary)",
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    lineHeight: 1.2,
    color: "var(--secondary-foreground)",
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

  error: {
    color: "var(--destructive)",
    fontSize: "0.875rem",
    lineHeight: 1.4,
  } satisfies CSSProperties,

  removeButton: {
    position: "absolute",
    right: "1rem",
    bottom: "1rem",
    borderRadius: "9999px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)",
  } satisfies CSSProperties,
} as const

/**
 * 단일 이미지 업로드 필드 컴포넌트.
 * 클릭 또는 드래그 앤 드롭으로 이미지를 업로드하며, 업로드 전 유효성 검사를 수행합니다.
 *
 * @param id - input 요소의 id (label htmlFor 연결)
 * @param label - 필드 레이블 텍스트
 * @param uploadHintText - 업로드 영역에 표시할 힌트 텍스트
 * @param descriptionText - 필드 설명 텍스트
 * @param value - 현재 업로드된 이미지 아이템
 * @param onChange - 이미지 변경 시 호출되는 콜백
 * @param aspectRatio - 이미지 표시 영역의 종횡비 (기본값 "1 / 1")
 * @param accept - 허용할 파일 MIME 타입 (기본값 "image/*")
 * @param requiredSize - 필수 이미지 크기 (예: "1920x1080")
 * @param maxSize - 최대 이미지 크기 (예: "3840x2160")
 * @param maxFileSizeMB - 최대 파일 크기 (MB 단위)
 * @param requiredAspectRatio - 종횡비 검증 활성화 여부
 * @param components - 주입 가능한 커스텀 컴포넌트
 * @param className - 컴포넌트에 적용할 CSS 클래스명
 */
export function ImageUploadField({
                                    id,
                                    label,
                                    uploadHintText,
                                    descriptionText,
                                    value,
                                    onChange,
                                    aspectRatio = "1 / 1",
                                    accept = "image/*",
                                    requiredSize,
                                    maxSize,
                                    maxFileSizeMB,
                                    requiredAspectRatio,
                                    components,
                                    className
                                  }: ImageUploadFieldProps) {
  const {t} = useTranslation()

  const Field = components?.Field ?? DefaultField
  const FieldLabel = components?.FieldLabel ?? DefaultFieldLabel
  const FieldDescription =
    components?.FieldDescription ?? DefaultFieldDescription
  const Input = components?.Input ?? DefaultInput
  const Button = components?.Button ?? DefaultButton
  const CloseIcon = components?.CloseIcon ?? DefaultCloseIcon

  const validationOptions: ImageValidationOptions = {
    requiredSize,
    maxSize,
    maxFileSizeMB,
    requiredAspectRatio: requiredAspectRatio ? aspectRatio : undefined,
    acceptType: accept,
  }

  const imageBoxStyle: CSSProperties = {
    ...styles.imageBox,
    aspectRatio,
  }
  const [isHovered, setIsHovered] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  /** 유효성 검증 실패 결과를 다국어 문자열로 변환합니다 */
  const getErrorString = (result: Extract<ImageValidationError, {ok: false}>): string => {
    switch (result.type) {
      case "requiredSize":
        return t("libs:validation_image_required_size", {size: `${result.requiredWidth}x${result.requiredHeight}`})
      case "maxSize":
        return t("libs:validation_image_max_size", {size: `${result.maxWidth}x${result.maxHeight}`})
      case "maxFileSize":
        return t("libs:validation_image_oversize", {size: result.maxSizeMB})
      case "requiredAspectRatio":
        return t("libs:validation_image_aspect_ratio", {ratio: result.ratio})
      case "invalidType":
        return t("libs:validation_image_invalid_type", {accept: result.acceptType, type: result.fileType})
    }
  }

  /** 선택된 파일을 검증하고 유효하면 ImageUploadItem으로 변환하여 onChange로 전달합니다 */
  const acceptFile = async (file: File) => {
    setErrorMessage(null)
    const url = URL.createObjectURL(file)

    if (hasValidation(validationOptions)) {
      const result = await validateUpload(file, validationOptions)
      if (!result.ok) {
        URL.revokeObjectURL(url)
        setErrorMessage(getErrorString(result))
        return
      }
    }

    value.revokeIfNeeded()
    onChange(new FileUploadItem({file, url}))
  }

  /** 현재 업로드된 이미지를 제거하고 onChange로 빈 ImageUploadItem을 전달합니다 */
  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    value.revokeIfNeeded()
    onChange(new FileUploadItem())
  }

  /** 드래그 오버 시 기본 동작을 방지하고 isDragOver 상태를 true로 설정합니다 */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  /** 드래그 리브 시 기본 동작을 방지하고 isDragOver 상태를 false로 설정합니다 */
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  /** 드롭된 파일을 수락하고 검증 후 업로드합니다 */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    acceptFile(file)
  }

  return (
    <Field className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <div style={styles.wrapper}>
        <label
          htmlFor={id}
          style={{
            ...styles.trigger,
            backgroundColor: isHovered || isDragOver ? "var(--accent)" : "var(--card)",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
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

                  <Button
                    type="button"
                    style={styles.removeButton}
                    onClick={removeImage}
                  >
                    <CloseIcon />
                  </Button>
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
                boxShadow: isDragOver
                  ? "inset 0 0 0 2px rgba(59, 130, 246, 0.5)"
                  : isHovered
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
            acceptFile(file)
            e.currentTarget.value = ""
          }}
          style={{display: "none"}}
        />

        {errorMessage && (
          <div style={styles.error}>{errorMessage}</div>
        )}
        <FieldDescription>{descriptionText}</FieldDescription>
      </div>
    </Field>
  )
}