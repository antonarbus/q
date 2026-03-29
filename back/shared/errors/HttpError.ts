import type { HttpStatusCode } from '@back/shared/const/httpStatusCode'

type HttpErrorParams<ErrorCode extends string = string> = {
  errorCode: ErrorCode
  statusCode: HttpStatusCode
  message: string
}

export class HttpError<ErrorCode extends string = string> extends Error {
  public readonly errorCode: ErrorCode

  public readonly statusCode: HttpStatusCode

  public constructor({ errorCode, statusCode, message }: HttpErrorParams<ErrorCode>) {
    super(message)
    this.errorCode = errorCode
    this.statusCode = statusCode
    this.name = 'HttpError'
  }
}
