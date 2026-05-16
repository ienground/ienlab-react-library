import {documentId, getDoc, getDocs, query, type CollectionReference,
  where, type DocumentData, type DocumentReference, type DocumentSnapshot, type QueryDocumentSnapshot,
  type Unsubscribe,
  onSnapshot,
  type FirestoreError
} from "firebase/firestore"
import type {FirestoreItem} from "../types"

export function snapshotToData(snapshot: QueryDocumentSnapshot | DocumentSnapshot): DocumentData {
  return {
    ...(snapshot.data() as DocumentData),
    id: snapshot.id,
  }
}

export async function fetchItems<T extends FirestoreItem>(
  collection: CollectionReference,
  changeMethod: ((snapshot: QueryDocumentSnapshot | DocumentSnapshot) => T),
  cache: Map<string, T>,
  referenceArray: (DocumentReference | undefined | null)[] // 💡 DocumentReference 배열
) {
  const missingRefs = referenceArray.filter((ref): ref is DocumentReference => Boolean(ref && !cache.has(ref.path)))
  const chunkSize = 30
  for (let i = 0; i < missingRefs.length; i += chunkSize) {
    const chunk = missingRefs.slice(i, i + chunkSize)
    const q = query(
      collection,
      where(documentId(), 'in', chunk.map(ref => ref.id))
    )
    const docs = await getDocs(q)
    docs.forEach(snapshot => {
      const item = changeMethod(snapshot as QueryDocumentSnapshot)
      cache.set(snapshot.ref.path, item)
    })
  }
}

export async function fetchItemsByOne<T extends FirestoreItem>(
  changeMethod: ((snapshot: QueryDocumentSnapshot | DocumentSnapshot) => T),
  cache: Map<string, T>,
  referenceArray: (DocumentReference | undefined | null)[] // 💡 DocumentReference 배열
) {
  const missingRefs = referenceArray.filter((ref): ref is DocumentReference => Boolean(ref && !cache.has(ref.path)))
  await Promise.all(missingRefs.map(async (ref) => {
    const snapshot = await getDoc(ref)
    const item = changeMethod(snapshot)
    cache.set(ref.path, item)
  }))
}

export function getSnapshots(
  ref: DocumentReference,
  callback: (snapshot: DocumentSnapshot) => void,
  options: { cache?: boolean; onError?: (error: FirestoreError) => void } = {}
): Unsubscribe {
  const { cache = true, onError } = options
  return onSnapshot(
    ref,
    { includeMetadataChanges: !cache },
    (snapshot) => {
      if (cache || !snapshot.metadata.fromCache) {
        callback(snapshot)
      }
    },
    onError
  )
}