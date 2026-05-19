import type { UserCredential } from "firebase/auth";

export type SignInResult =
  | { ok: true; data: UserCredential }
  | { ok: false; errorKey: string; errorCode?: string }