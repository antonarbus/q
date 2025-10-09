import { httpStatus } from '@back/shared/const/httpStatus'
import {
  removeNoTraceMode,
  removeRefreshTokenCookie,
} from '@back/shared/headers'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
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
  res.status(httpStatus.success_200).json({ message: 'logged out' })
}
