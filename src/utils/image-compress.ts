import imageCompression from "browser-image-compression"
import type {ImageCompressionPolicy} from "../types"

/**
 * browser-image-compression 라이브러리를 사용하여 이미지 파일을 압축합니다.
 * 이미지가 아닌 파일은 원본 그대로 반환합니다.
 *
 * @param file - 압축할 원본 이미지 파일
 * @param policy - 압축 정책 (maxSizeMB, maxWidthOrHeight)
 * @returns 압축된 File 객체. 이미지가 아닌 경우 원본 파일을 그대로 반환
 */
export async function compressImage(
  file: File,
  policy: ImageCompressionPolicy
): Promise<File> {
  if (!file.type.startsWith("image/")) return file

  const compressed = await imageCompression(file, {
    ...(policy.maxSizeMB != null && {maxSizeMB: policy.maxSizeMB}),
    ...(policy.maxWidthOrHeight != null && {maxWidthOrHeight: policy.maxWidthOrHeight}),
    useWebWorker: true,
  })

  return new File([compressed], file.name, {
    type: compressed.type || file.type,
    lastModified: Date.now(),
  })
}