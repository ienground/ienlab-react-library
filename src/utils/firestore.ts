import {collection, documentId, getDoc, getDocs, query,
  where, type DocumentData, type DocumentReference, type DocumentSnapshot, type QueryDocumentSnapshot, type Firestore} from "firebase/firestore";
import type {FirestoreItem} from "../types";

export function snapshotToData(snapshot: QueryDocumentSnapshot | DocumentSnapshot): DocumentData {
  return {
    ...(snapshot.data() as DocumentData),
    id: snapshot.id,
  };
}

export async function fetchItems<T extends FirestoreItem>(
  firestore: Firestore,
  colName: string,
  changeMethod: ((snapshot: QueryDocumentSnapshot | DocumentSnapshot) => T),
  cache: Map<string, T>,
  referenceArray: (DocumentReference | undefined | null)[] // 💡 DocumentReference 배열
) {
  const missingRefs = referenceArray.filter((ref): ref is DocumentReference => Boolean(ref && !cache.has(ref.path)));
  const chunkSize = 30;
  for (let i = 0; i < missingRefs.length; i += chunkSize) {
    const chunk = missingRefs.slice(i, i + chunkSize);
    const q = query(
      collection(firestore, colName),
      where(documentId(), 'in', chunk.map(ref => ref.id))
    );
    const docs = await getDocs(q);
    docs.forEach(snapshot => {
      const item = changeMethod(snapshot as QueryDocumentSnapshot);
      cache.set(snapshot.ref.path, item);
    });
  }
}

export async function fetchItemsByOne<T extends FirestoreItem>(
  changeMethod: ((snapshot: QueryDocumentSnapshot | DocumentSnapshot) => T),
  cache: Map<string, T>,
  referenceArray: (DocumentReference | undefined | null)[] // 💡 DocumentReference 배열
) {
  const missingRefs = referenceArray.filter((ref): ref is DocumentReference => Boolean(ref && !cache.has(ref.path)));
  await Promise.all(missingRefs.map(async (ref) => {
    const snapshot = await getDoc(ref);
    const item = changeMethod(snapshot);
    cache.set(ref.path, item);
  }));
}