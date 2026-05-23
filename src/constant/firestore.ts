import { serverTimestamp } from "firebase/firestore"

export const delItemLegacy = () => ({
  updateAt: serverTimestamp(),
  delete: true
})

export const undelItemLegacy = () => ({
  updateAt: serverTimestamp(),
  delete: false
})

export const delItem = () => ({
  updateAt: serverTimestamp(),
  deleteAt: serverTimestamp()
})

export const undelItem = () => ({
  updateAt: serverTimestamp(),
  deleteAt: null
})
