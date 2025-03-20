import { Router, type Request, type Response, type NextFunction } from 'express'
import { httpStatus } from '@back/shared/consts/httpStatus'
import {
  removeNoTraceCookie,
  removeRefreshTokenCookie,
} from '@back/shared/headers'
import { asyncHandler } from '@back/shared/utils/asyncHandler'

export type ResBody = {
  message: 'logged out'
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => void

export const logOutRouter = Router()

const logOut: RouterHandler = (req, res, next) => {
  removeNoTraceCookie({ res })
  removeRefreshTokenCookie({ res })
  res.status(httpStatus.success_200).json({ message: 'logged out' })
}

logOutRouter.get('/', asyncHandler(logOut))
