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

  export namespace Send {
    export type Params = {
      phoneNumber: string
      uid: string
    }

    export type Result = {
      code: PhoneVerify.Result
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
