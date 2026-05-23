import type { DocumentReference, DocumentSnapshot, Timestamp } from "firebase/firestore"

export interface BaseFirestoreItem {
  id: string,
  ref: DocumentReference | null,
  createAt: Timestamp,
  updateAt: Timestamp,
}

export interface FirestoreItemLegacy extends BaseFirestoreItem {
  delete: boolean,
}

export interface FirestoreItem extends BaseFirestoreItem {
  deletedAt: Timestamp | null,
}

export interface InfScrollStateList<T> {
  itemList: Map<string, T>
  lastVisibleDocument: DocumentSnapshot | null
  isInitialized: boolean
  isLoading: boolean
  hasMore: boolean
}
