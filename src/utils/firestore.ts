import type {DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from "firebase/firestore";

export function snapshotToData(snapshot: QueryDocumentSnapshot | DocumentSnapshot): DocumentData {
  return {
    ...(snapshot.data() as DocumentData),
    id: snapshot.id,
  };
}