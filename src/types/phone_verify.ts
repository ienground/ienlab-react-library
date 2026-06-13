import type {TFunction} from "i18next"

export namespace PhoneVerify {
  export enum Request {
    IDLE = 0,
    REQUESTING = 1,
    SUCCESS = 200,
    FAILURE_OVER_LIMIT = 401,
    FAILURE_UNKNOWN = -1
  }

  export namespace Request {
    export const Default = Request.FAILURE_UNKNOWN
    export function getMessage(t: TFunction, value: Request) {
      switch (value) {
        case Request.FAILURE_OVER_LIMIT: return t("libs:phone_verify.errors.send_failure_over_limit")
        case Request.FAILURE_UNKNOWN: return t("libs:phone_verify.errors.send_failure_unknown")
        default: return ""
      }
    }
  }

  export enum Result {
    IDLE = 0,
    REQUESTING = 1,
    FAILURE_WRONG = 402,
    FAILURE_NO_SEND = 401,
    VERIFIED = 200,
    FAILURE_UNKNOWN = -1
  }

  export namespace Result {
    export const Default = Result.FAILURE_UNKNOWN
    export function getMessage(t: TFunction, value: Result) {
      switch (value) {
        case Result.FAILURE_WRONG: return t("libs:phone_verify.errors.verify_failure_wrong")
        case Result.FAILURE_NO_SEND: return t("libs:phone_verify.errors.verify_failure_no_send")
        case Result.FAILURE_UNKNOWN: return t("libs:phone_verify.errors.verify_failure_unknown")
        default: return ""
      }
    }
  }

  export namespace Send {
    export type Params = {
      phoneNumber: string
      uid: string
    }

    export type Result = {
      code: PhoneVerify.Request
    }
  }

  export namespace Verify {
    export type Params = {
      code: string
      phoneNumber: string
      uid: string
    }

    export type Result = {
      code: PhoneVerify.Result
    }
  }
}
