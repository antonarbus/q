import {
  type ErrorMessageCommon,
  errorMessageCommon,
} from '@back/shared/const/errorMessageCommon'
import type { NextFunction, Request, Response } from 'express'
import { httpStatus } from '../shared/const/httpStatus'

type ErrorHandlerBody = {
  message: ErrorMessageCommon
  errorAsString?: string
}

type RouterHandler = (
  error: Error,
  req: Request,
  res: Response<ErrorHandlerBody>,
  next: NextFunction,
) => void

export const errorHandlerMiddleware: RouterHandler = (
  error,
  _req,
  res,
  _next,
) => {
  console.error(error)
  const { message, name, stack } = error

  res.status(httpStatus.serverError_500).json({
    message: errorMessageCommon.internalError,
    errorAsString: JSON.stringify({ name, message, stack }),
  })
}
