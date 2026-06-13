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
  }
}