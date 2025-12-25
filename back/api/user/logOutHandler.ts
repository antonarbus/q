import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import {
  removeNoTraceMode,
  removeRefreshTokenCookie,
} from '@back/shared/headers'
import type { NextFunction, Request, Response } from 'express'

export type ResBody = {
  message: 'logged out'
}

export type ErrorResBody = {
  message: ErrorMessageCommon
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => void

export const logOutHandler: RouterHandler = (_req, res, _next) => {
  removeNoTraceMode({ res })
  removeRefreshTokenCookie({ res })
  res.status(httpStatusCode.success200).json({ message: 'logged out' })
}
