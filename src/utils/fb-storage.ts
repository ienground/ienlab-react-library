import {getDownloadURL as getFbDownloadURL, ref, uploadBytes, type FirebaseStorage } from "firebase/storage";
import {ImageUploadItem} from "../types";
import {getFileExtension} from "./file";

/**
 * @param storage Firebase Storage 객체
 * @param path 확장자를 제외한 파일 경로 및 이름
 * @param item 업로드할 이미지
 * @return 업로드된 이미지의 URL
 */
export async function getDownloadURL(storage: FirebaseStorage, path: string, item: ImageUploadItem) {
  if (!item.file) return item.url
  const imageRef = ref(storage, `${path}.${getFileExtension(item.file.name)}`)
  return await uploadBytes(imageRef, item.file).then(result => getFbDownloadURL(result.ref))
}