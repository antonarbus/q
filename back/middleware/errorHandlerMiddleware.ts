import type { Request, Response, NextFunction } from 'express'
import { httpStatus } from '../shared/const/httpStatus'
import {
  type ErrorMessageCommon,
  errorMessageCommon,
} from '@shared/const/errorMessageCommon'

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
