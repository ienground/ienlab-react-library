import { useTranslation } from "react-i18next"
import { Reorder } from "motion/react"
import type {
  ComponentType,
  CSSProperties,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react"
import { useRef, useState } from "react"

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
  requiredSize?: string
  maxSize?: string
  maxFileSizeMB?: number
  requiredAspectRatio?: boolean
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  } satisfies CSSProperties,

  outerBox: {
    borderRadius: "1.5rem",
    border: "1px solid var(--border)",
    backgroundColor: "var(--card)",
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
    backgroundColor: "var(--card)",
    border: "1px solid var(--border)",
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
    border: "1px dashed var(--border)",
    backgroundColor: "var(--card)",
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

  dropOverlay: {
    position: "absolute",
    inset: 0,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "inherit",
    backgroundColor: "rgba(59, 130, 246, 0.08)",
    backdropFilter: "blur(2px)",
  } satisfies CSSProperties,

  dropOverlayInner: {
    borderRadius: "1rem",
    backgroundColor: "var(--secondary)",
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    lineHeight: 1.2,
    color: "var(--secondary-foreground)",
  } satisfies CSSProperties,

  error: {
    color: "var(--destructive)",
    fontSize: "0.875rem",
    lineHeight: 1.4,
  } satisfies CSSProperties,
} as const

/**
 * 정렬 가능한 다중 이미지 업로드 필드 컴포넌트.
 * 드래그 앤 드롭으로 이미지를 업로드하고, Reorder를 통해 순서를 변경할 수 있습니다.
 *
 * @param id - input 요소의 id (label htmlFor 연결)
 * @param label - 필드 레이블 텍스트
 * @param descriptionText - 필드 설명 텍스트
 * @param uploadHintText - 업로드 영역에 표시할 힌트 텍스트
 * @param items - 현재 업로드된 이미지 아이템 배열
 * @param onChange - 이미지 목록 변경 시 호출되는 콜백
 * @param aspectRatio - 이미지 카드의 종횡비 (기본값 "1 / 1")
 * @param accept - 허용할 파일 MIME 타입 (기본값 "image/*")
 * @param requiredSize - 필수 이미지 크기 (예: "1920x1080")
 * @param maxSize - 최대 이미지 크기 (예: "3840x2160")
 * @param maxFileSizeMB - 최대 파일 크기 (MB 단위)
 * @param requiredAspectRatio - 종횡비 검증 활성화 여부
 * @param components - 주입 가능한 커스텀 컴포넌트
 */
export function ImageUploadSortableField({
                                            id,
                                            label,
                                            descriptionText,
                                            uploadHintText,
                                            items,
                                            onChange,
                                            aspectRatio = "1 / 1",
                                            accept = "image/*",
                                            requiredSize,
                                            maxSize,
                                            maxFileSizeMB,
                                            requiredAspectRatio,
                                            components,
                                          }: ImageUploadSortableFieldProps) {
  const { t } = useTranslation()

  const validationOptions: ImageValidationOptions = {
    requiredSize,
    maxSize,
    maxFileSizeMB,
    requiredAspectRatio: requiredAspectRatio ? aspectRatio : undefined,
  }

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

  const outerRef = useRef<HTMLDivElement>(null)
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
    }
  }

  /** target 아이템을 목록에서 제거하고 URL을 해제합니다 */
  const removeItem = (target: ImageUploadItem) => {
    target.revokeIfNeeded()
    onChange(items.filter((item) => item !== target))
  }

  /** 선택된 파일들을 검증하고 ImageUploadItem 배열로 변환하여 기존 목록에 추가합니다 */
  const handleFilesSelected = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setErrorMessage(null)

    const fileArray = Array.from(files)

    if (hasValidation(validationOptions)) {
      for (const file of fileArray) {
        const result = await validateUpload(file, validationOptions)
        if (!result.ok) {
          setErrorMessage(getErrorString(result))
          return
        }
      }
    }

    const nextItems = [
      ...items,
      ...fileArray.map(
        (file) =>
          new ImageUploadItem({
            file,
            url: URL.createObjectURL(file),
          }),
      ),
    ]

    onChange(nextItems)
  }

  /** 드래그 오버 시 기본 동작을 방지하고 isDragOver 상태를 true로 설정합니다 */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  /** 드래그 리브 시 기본 동작을 방지하고, 외부로 나간 경우에만 isDragOver를 false로 설정합니다 */
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (outerRef.current && !outerRef.current.contains(e.relatedTarget as Node)) {
      setIsDragOver(false)
    }
  }

  /** 드롭된 파일들을 수락하고 검증 후 목록에 추가합니다 */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    handleFilesSelected(e.dataTransfer.files)
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
        <div
          ref={outerRef}
          style={{...styles.outerBox, position: "relative"}}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isDragOver && (
            <div style={styles.dropOverlay}>
              <div style={styles.dropOverlayInner}>
                {t("libs:drop_to_upload")}
              </div>
            </div>
          )}
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
                        alt={label}
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
                    e.currentTarget.style.backgroundColor = "var(--accent)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--card)"
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

        {errorMessage && (
          <div style={styles.error}>{errorMessage}</div>
        )}
        <div style={styles.description}>
          <FieldDescription>{descriptionText}</FieldDescription>
        </div>
      </div>
    </Field>
  )
}