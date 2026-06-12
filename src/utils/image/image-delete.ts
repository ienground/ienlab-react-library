import { deleteObject, type FirebaseStorage, ref } from "firebase/storage"
import { FileUploadItem } from "../../types"

type DeleteCandidate = {
  item: FileUploadItem
  url?: string | null
}

type DeleteCandidateGroup = DeleteCandidate | DeleteCandidate[]

/**
 * 삭제 후보 목록을 받아 Storage 파일을 삭제합니다.
 *
 * - item.file === null 인 항목만 삭제 대상으로 간주합니다.
 * - 단건 후보와 후보 배열을 함께 받을 수 있습니다.
 * - 중복 URL은 제거한 뒤 병렬로 삭제합니다.
 * - 개별 삭제 실패는 무시합니다.
 */
export async function deleteStorageItems(
  storage: FirebaseStorage,
  candidates: DeleteCandidateGroup[],
): Promise<void> {
  // 단건 후보와 후보 배열을 1단계 평탄화합니다.
  const flatCandidates = candidates.flat() as DeleteCandidate[]

  // 삭제 조건을 만족하는 URL만 추출하고, 중복 URL은 제거합니다.
  const targets = [...new Set(
    flatCandidates
      .filter(({ item, url }) => item.file === null && !!url)
      .map(({ url }) => url as string)
  )]

  // 대상이 없으면 바로 종료합니다.
  if (targets.length === 0) {
    return
  }

  // 모든 삭제를 병렬로 실행합니다.
  // 개별 파일 삭제 실패는 전체 흐름을 막지 않도록 무시합니다.
  await Promise.all(
    targets.map((url) =>
      deleteObject(ref(storage, url)).catch(() => {})
    )
  )
}