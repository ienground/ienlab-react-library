import { serverTimestamp } from "firebase/firestore";

export const deleteItem = () => ({
  "updateAt": serverTimestamp(),
  "delete": true
});

export const undeleteItem = () => ({
  "updateAt": serverTimestamp(),
  "delete": false
});