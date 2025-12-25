import type { HttpStatusCode } from '@back/shared/const/HttpStatusCode'

type HttpErrorParams<TErrorCode extends string> = {
  errorCode: TErrorCode
  statusCode: HttpStatusCode
  message: string
}

export class HttpError<TErrorCode extends string> extends Error {
  public readonly errorCode: TErrorCode

  public readonly statusCode: HttpStatusCode

  public constructor({ errorCode, statusCode, message }: HttpErrorParams<TErrorCode>) {
    super(message)
    this.errorCode = errorCode
    this.statusCode = statusCode
    this.name = 'HttpError'

    Error.captureStackTrace(this, this.constructor)
  }
}
