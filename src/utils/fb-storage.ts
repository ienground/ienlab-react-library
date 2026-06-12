import { getDownloadURL as getFbDownloadURL, type StorageReference, ref, uploadBytes, type FirebaseStorage } from "firebase/storage";
import {type ImageCompressionPolicy, FileUploadItem} from "../types";
import {getFileExtension} from "./file";
import {compressImage} from "./image"

/**
 * Firebase Storage에 파일을 업로드합니다.
 * item.file이 없으면 기존 item.url을 그대로 반환합니다.
 *
 * @param reference - Firebase Storage 또는 StorageReference 객체
 * @param path - 확장자를 제외한 파일 경로 및 이름
 * @param item - 업로드할 이미지 아이템
 * @returns 업로드된 파일의 다운로드 URL
 */
export async function uploadFile(reference: FirebaseStorage | StorageReference, path: string, item: FileUploadItem) {
  if (!item.file) return item.url
  try {
    const extension = getFileExtension(item.file.name)
    const imageRef = ref(reference, extension ? path + "." + extension : path)
    const result = await uploadBytes(imageRef, item.file, {
      contentType: item.file.type,
    })
    return await getFbDownloadURL(result.ref)
  } catch (error) {
    console.error("Firebase file upload failed:", error)
    throw error
  }
}

/**
 * 이미지를 압축한 후 Firebase Storage에 업로드합니다.
 * item.isEmpty가 true이면 빈 문자열을 반환합니다.
 *
 * @param reference - Firebase Storage 또는 StorageReference 객체
 * @param path - 확장자를 제외한 파일 경로 및 이름
 * @param item - 업로드할 이미지 아이템
 * @param policy - 이미지 압축 정책
 * @returns 업로드된 이미지의 다운로드 URL (빈 항목일 경우 빈 문자열)
 */
export async function uploadCompressedImage(reference: FirebaseStorage | StorageReference, path: string, item: FileUploadItem, policy: ImageCompressionPolicy) {
  if (item.isEmpty) return ""

  if (!item.file) {
    return item.url
  }

  const compressedFile = await compressImage(item.file, policy)
  const compressedItem = new FileUploadItem({ ...item, file: compressedFile })

  return await uploadFile(reference, path, compressedItem)
}