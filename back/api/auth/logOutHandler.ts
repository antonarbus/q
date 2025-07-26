import type { Request, Response, NextFunction } from 'express'
import { httpStatus } from '@back/shared/const/httpStatus'
import {
  removeNoTraceMode,
  removeRefreshTokenCookie,
} from '@back/shared/headers'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'

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

export const logOutHandler: RouterHandler = (req, res, next) => {
  removeNoTraceMode({ res })
  removeRefreshTokenCookie({ res })
  res.status(httpStatus.success_200).json({ message: 'logged out' })
}
