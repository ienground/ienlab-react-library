
/**
 * 이미지 압축 정책을 정의합니다.
 * maxSizeMB - 최대 파일 크기 (MB)
 * maxWidthOrHeight - 최대 너비 또는 높이 (픽셀)
 */
export type ImageCompressionPolicy = {
  maxSizeMB?: number
  maxWidthOrHeight?: number
}