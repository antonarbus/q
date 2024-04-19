import { Router } from 'express'
import { httpStatus } from '@shared/consts/httpStatus'
import type { Next, Req, ResWithBody } from '../types'

export type ResBody = {
  message: 'logged out'
}

type RouterHandler = (req: Req, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const logOutRouter = Router()

const logOut: RouterHandler = async (req, res, next) => {
  try {
    res.clearCookie('refreshJwtToken')

    return res
      .status(httpStatus.success_200)
      .json({ message: 'logged out' })
  } catch (error) {
    next(error)
  }
}

logOutRouter.get('/', logOut)
