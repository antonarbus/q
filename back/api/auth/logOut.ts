import type { Request, Response, NextFunction } from 'express'
import { httpStatus } from '@back/shared/consts/httpStatus'
import {
  removeNoTraceMode,
  removeRefreshTokenCookie,
} from '@back/shared/headers'

export type ResBody = {
  message: 'logged out'
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => void

export const logOut: RouterHandler = (req, res, next) => {
  removeNoTraceMode({ res })
  removeRefreshTokenCookie({ res })
  res.status(httpStatus.success_200).json({ message: 'logged out' })
}
