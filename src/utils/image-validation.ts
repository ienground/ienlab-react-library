export type ImageValidationOptions = {
  requiredSize?: string
  maxSize?: string
  maxFileSizeMB?: number
  requiredAspectRatio?: string
}

export type ImageValidationError =
  | { ok: false; type: "requiredSize"; width: number; height: number; requiredWidth: number; requiredHeight: number }
  | { ok: false; type: "maxSize"; width: number; height: number; maxWidth: number; maxHeight: number }
  | { ok: false; type: "maxFileSize"; fileSize: number; maxSizeMB: number }
  | { ok: false; type: "requiredAspectRatio"; width: number; height: number; ratio: string }
  | { ok: true }

/**
 * 이미지 파일을 업로드 전에 검증합니다.
 * 파일 크기, Required 크기, 최대 크기, Required 종횡비를 순차적으로 검사합니다.
 *
 * @param file - 검증할 이미지 파일
 * @param options - 검증 옵션 (requiredSize, maxSize, maxFileSizeMB, requiredAspectRatio)
 * @returns 검증 결과. 성공 시 { ok: true }, 실패 시 상세 오류 정보를 포함한 객체
 */
export async function validateUpload(
  file: File,
  options: ImageValidationOptions,
): Promise<ImageValidationError> {
  if (options.maxFileSizeMB != null) {
    const maxBytes = options.maxFileSizeMB * 1024 * 1024
    if (file.size > maxBytes) {
      return {
        ok: false,
        type: "maxFileSize",
        fileSize: file.size,
        maxSizeMB: options.maxFileSizeMB,
      }
    }
  }

  if (options.requiredSize || options.maxSize || options.requiredAspectRatio) {
    const url = URL.createObjectURL(file)
    try {
      const dimensions = await loadImageDimensions(url)
      if (!dimensions) return { ok: true }

      const { width, height } = dimensions

      if (options.requiredSize) {
        const [reqW, reqH] = options.requiredSize.split("x").map(Number)
        if (width !== reqW || height !== reqH) {
          return {
            ok: false,
            type: "requiredSize",
            width,
            height,
            requiredWidth: reqW,
            requiredHeight: reqH,
          }
        }
      }

      if (options.maxSize) {
        const [maxW, maxH] = options.maxSize.split("x").map(Number)
        if (width > maxW || height > maxH) {
          return {
            ok: false,
            type: "maxSize",
            width,
            height,
            maxWidth: maxW,
            maxHeight: maxH,
          }
        }
      }

      if (options.requiredAspectRatio) {
        const [num, den] = options.requiredAspectRatio.split("/").map(Number)
        const ratio = num / den
        if (Math.abs(width / height - ratio) > 0.01) {
          return {
            ok: false,
            type: "requiredAspectRatio",
            width,
            height,
            ratio: `${num}:${den}`,
          }
        }
      }
    } finally {
      URL.revokeObjectURL(url)
    }
  }

  return { ok: true }
}

/**
 * 이미지 URL로부터 이미지의 실제 너비와 높이를 로드합니다.
 *
 * @param url - 로드할 이미지의 Object URL
 * @returns 이미지 로드 성공 시 { width, height }, 실패 시 null
 */
function loadImageDimensions(
  url: string,
): Promise<{ width: number; height: number } | null> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
    img.onerror = () => resolve(null)
    img.src = url
  })
}

/**
 * 검증 옵션에 하나라도 유효한 조건이 설정되어 있는지 확인합니다.
 *
 * @param options - 검증 옵션 객체
 * @returns 검증 조건이 하나라도 존재하면 true, 그렇지 않으면 false
 */
export function hasValidation(options: ImageValidationOptions): boolean {
  return !!(options.requiredSize || options.maxSize || options.maxFileSizeMB != null || options.requiredAspectRatio)
}
