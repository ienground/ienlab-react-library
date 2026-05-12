import type {DocumentReference, DocumentSnapshot, Timestamp} from "firebase/firestore";

export interface FirestoreItem {
  id: string,
  ref: DocumentReference | null,
  createAt: Timestamp,
  updateAt: Timestamp,
  delete: boolean,
}

export interface InfScrollStateList<T> {
  itemList: Map<string, T>
  lastVisibleDocument: DocumentSnapshot | null
  isInitialized: boolean
  isLoading: boolean
  hasMore: boolean
}