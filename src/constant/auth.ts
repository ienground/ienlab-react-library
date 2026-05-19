export function getAuthErrorKey(errorCode?: string): string {
  switch (errorCode) {
    case "auth/user-not-found":
      return "libs:auth.errors.user_not_found"
    case "auth/wrong-password":
      return "libs:auth.errors.wrong_password"
    case "auth/invalid-credential":
      return "libs:auth.errors.invalid_credential"

    case "auth/invalid-email":
      return "libs:auth.errors.invalid_email"

    case "auth/user-disabled":
      return "libs:auth.errors.user_disabled"

    case "auth/too-many-requests":
      return "libs:auth.errors.too_many_requests"

    case "auth/network-request-failed":
      return "libs:auth.errors.network_failed"

    case "auth/email-already-in-use":
      return "libs:auth.errors.email_already_in_use"

    case "auth/weak-password":
      return "libs:auth.errors.weak_password"

    case "auth/requires-recent-login":
      return "libs:auth.errors.requires_recent_login"

    case "auth/user-token-expired":
      return "libs:auth.errors.user_token_expired"

    case "auth/popup-blocked":
      return "libs:auth.errors.popup_blocked"

    case "auth/popup-closed-by-user":
      return "libs:auth.errors.popup_closed_by_user"

    case "auth/operation-not-allowed":
      return "libs:auth.errors.operation_not_allowed"

    case "auth/web-storage-unsupported":
      return "libs:auth.errors.web_storage_unsupported"

    case "auth/unauthorized-domain":
      return "libs:auth.errors.unauthorized_domain"

    case "auth/internal-error":
    default:
      return "libs:auth.errors.default"
  }
}