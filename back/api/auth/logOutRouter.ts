import { Router, type Request, type Response, type NextFunction } from 'express'
import { httpStatus } from '../../consts/httpStatus'

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
  try {
    res.clearCookie('refreshJwtToken')
    res.status(httpStatus.success_200).json({ message: 'logged out' })
  } catch (error) {
    next(error)
  }
}

logOutRouter.get('/', logOut)
