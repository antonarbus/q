import { Router } from 'express'
import { httpStatus } from '../../consts/httpStatus'
import type { Next, Req, ResWithBody } from '../../types'

export type ResBody = {
  message: 'logged out'
}

type RouterHandler = (
  req: Req,
  res: ResWithBody<ResBody>,
  next: Next,
) => ResWithBody<ResBody> | undefined

export const logOutRouter = Router()

const logOut: RouterHandler = (req, res, next) => {
  try {
    res.clearCookie('refreshJwtToken')

    return res.status(httpStatus.success_200).json({ message: 'logged out' })
  } catch (error) {
    next(error)
  }
}

logOutRouter.get('/', logOut)
