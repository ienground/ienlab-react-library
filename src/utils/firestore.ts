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
  referenceArray: (DocumentReference | undefined)[] // 💡 DocumentReference 배열
) {
  const cached: T[] = referenceArray
    .map(ref => cache.get(ref?.path ?? ""))
    .filter(Boolean) as T[];

  const cachedPaths = new Set(cached.map(item => item.id));
  const missingRefs = referenceArray.filter(ref => (ref && !cachedPaths.has(ref.path)));

  const chunkSize = 30;
  for (let i = 0; i < missingRefs.length; i += chunkSize) {
    const chunk = missingRefs.slice(i, i + chunkSize);

    // 💡 DocumentReference 청크를 'in' 쿼리에 직접 사용
    const q = query(
      collection(firestore, colName),
      where(documentId(), 'in', chunk) // 쿼리할 문서의 필드 이름으로 변경
    );

    const docs = await getDocs(q);

    docs.forEach(snapshot => {
      const item = changeMethod(snapshot as QueryDocumentSnapshot);
      cache.set(item.id, item);
    });
  }
}

export async function fetchItemsByOne<T extends FirestoreItem>(
  changeMethod: ((snapshot: QueryDocumentSnapshot | DocumentSnapshot) => T),
  cache: Map<string, T>,
  referenceArray: (DocumentReference | undefined)[] // 💡 DocumentReference 배열
) {
  const cached: T[] = referenceArray
    .map(ref => cache.get(ref?.path ?? ""))
    .filter(Boolean) as T[];

  const cachedPaths = new Set(cached.map(item => item.id));
  const missingRefs = referenceArray.filter(ref => (ref && !cachedPaths.has(ref.path)));

  for (const ref of missingRefs) {
    if (!ref) continue;
    const item = await getDoc(ref).then(changeMethod);
    cache.set(item.id, item);
  }
}