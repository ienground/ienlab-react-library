import {getDownloadURL as getFbDownloadURL, ref, uploadBytes, type FirebaseStorage } from "firebase/storage";
import {ImageUploadItem} from "../types";
import {getFileExtension} from "./file";

/**
 * @param storage Firebase Storage 객체
 * @param path 확장자를 제외한 파일 경로 및 이름
 * @param item 업로드할 이미지
 * @return 업로드된 이미지의 URL
 */
export async function uploadImage(storage: FirebaseStorage, path: string, item: ImageUploadItem) {
  if (!item.file) return item.url
  try {
    const extension = getFileExtension(item.file.name)
    const imageRef = ref(storage, extension ? path + "." + extension : path)
    const result = await uploadBytes(imageRef, item.file)
    return await getFbDownloadURL(result.ref)
  } catch (error) {
    console.error("Firebase image upload failed:", error)
    throw error
  }
}