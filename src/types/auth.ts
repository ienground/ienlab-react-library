import type { UserCredential } from "firebase/auth";

export type SignInResult =
  | { ok: true; data: UserCredential }
  | { ok: false; errorKey: string; errorCode?: string }

export const authErrorKeyMap: Record<string, string> = {
  "auth/invalid-credential": "strings:auth.errors.invalid_credential",
  "auth/invalid-email": "strings:auth.errors.invalid_email",
  "auth/user-disabled": "strings:auth.errors.user_disabled",
  "auth/too-many-requests": "strings:auth.errors.too_many_requests",
  "auth/network-request-failed": "strings:auth.errors.network_failed",
}