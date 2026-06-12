import { deleteObject, type FirebaseStorage, ref } from "firebase/storage"
import { FileUploadItem } from "../../types"

type DeleteCandidate = {
  item: FileUploadItem
  url?: string | null
}

export async function deleteStorageItems(
  storage: FirebaseStorage,
  candidates: DeleteCandidate[],
): Promise<void> {
  const targets = [...new Set(
    candidates
      .filter(({ item, url }) => item.file === null && !!url)
      .map(({ url }) => url as string)
  )]

  await Promise.all(
    targets.map((url) =>
      deleteObject(ref(storage, url)).catch(() => {})
    )
  )
}