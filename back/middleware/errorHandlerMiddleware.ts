import {
  type ErrorMessageCommon,
  errorMessageCommon,
} from '@shared/consts/errorMessageCommon'
import { httpStatus } from '../consts/httpStatus'
import type { Next, Req, ResWithBody } from '../types'

export type ErrorHandlerBody = {
  message: ErrorMessageCommon
  errorAsString?: string
}

export const errorHandlerMiddleware = (
  error: Error,
  req: Req,
  res: ResWithBody<ErrorHandlerBody>,
  next: Next,
): ResWithBody<ErrorHandlerBody> => {
  console.error(error)
  const { message, name, stack } = error

  // todo: make some logger to db or text file or maybe there are proven solutions for it

  if (message === errorMessageCommon.notLoggedIn) {
    return res
      .status(httpStatus.unauthorized_401)
      .json({ message: errorMessageCommon.notLoggedIn })
  }

  return res
    .status(httpStatus.serverError_500)
    .json({
      message: errorMessageCommon.internalError,
      errorAsString: JSON.stringify({ name, message, stack }),
    })
}
