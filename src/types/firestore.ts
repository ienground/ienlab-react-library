import type { DocumentReference, DocumentSnapshot, Timestamp } from "firebase/firestore"

export interface BaseFirestoreItem {
  id: string,
  ref: DocumentReference | null,
  createAt: Timestamp,
  updateAt: Timestamp,
}

/** @deprecated 기존 boolean 기반 삭제 필드를 사용하는 레거시 인터페이스입니다. */
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
