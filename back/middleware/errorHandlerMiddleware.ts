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
  req,
  res,
  next,
) => {
  console.error(error)
  const { message, name, stack } = error

  // todo: make some logger to db or text file or maybe there are proven solutions for it

  if (message === errorMessageCommon.notLoggedIn) {
    res
      .status(httpStatus.unauthorized_401)
      .json({ message: errorMessageCommon.notLoggedIn })

    return
  }

  res.status(httpStatus.serverError_500).json({
    message: errorMessageCommon.internalError,
    errorAsString: JSON.stringify({ name, message, stack }),
  })
}
