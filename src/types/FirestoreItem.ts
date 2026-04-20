import type { DocumentReference, Timestamp } from "firebase/firestore";

export interface FirestoreItem {
  id: string,
  ref: DocumentReference | null,
  createAt: Timestamp,
  updateAt: Timestamp,
  delete: boolean,
}