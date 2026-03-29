import { HttpError } from '@back/shared/errors/HttpError'
import type { NextFunction, Request, Response } from 'express'
import { httpStatusCode } from '../const/httpStatusCode'
import { errorCode } from '@back/shared/const/errorCode'

type ErrorResBody = {
  errorCode: string
  message: string
}

type RouterHandler = (
  error: Error,
  req: Request,
  res: Response<ErrorResBody>,
  next: NextFunction,
) => void

export const errorHandlerMiddleware: RouterHandler = (error, _req, res, _next) => {
  // Handle our custom AppError
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      errorCode: String(error.errorCode),
      message: error.message,
    })

    return
  }

  // Handle unknown errors
  // oxlint-disable-next-line no-console
  console.error(error)

  res.status(httpStatusCode.serverError500).json({
    errorCode: errorCode.internalError,
    message: 'Internal error',
  })
}
