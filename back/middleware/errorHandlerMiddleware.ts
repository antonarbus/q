import { HttpError } from '@back/shared/errors/HttpError'
import type { NextFunction, Request, Response } from 'express'
import { httpStatusCode } from '../shared/const/httpStatusCode'
import { errorCodeCommon } from '@back/shared/const/errorCodeCommon'

type ErrorResBody = {
  errorCode: string
  message: string
  errorAsString: string
}

type RouterHandler = (
  error: Error,
  req: Request,
  res: Response<ErrorResBody>,
  next: NextFunction,
) => void

export const errorHandlerMiddleware: RouterHandler = (
  error,
  _req,
  res,
  _next,
) => {
  console.error(error)

  // Handle our custom AppError
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      errorCode: String(error.errorCode),
      message: error.message,
      errorAsString: JSON.stringify({
        name: error.name,
        message: error.message,
        stack: error.stack,
      }),
    })

    return
  }

  // Handle unknown errors
  res.status(httpStatusCode.serverError500).json({
    errorCode: errorCodeCommon.internalError,
    message: 'Internal error',
    errorAsString: JSON.stringify({
      name: error.name,
      message: error.message,
      stack: error.stack,
    }),
  })
}
