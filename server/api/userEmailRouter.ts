import express from 'express'
import { UserModel } from '../db/models/userModel'
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware'
import type { Next, ReqWithBody, Res, ResWithBody } from '../types'

export const userEmailRouter = express.Router()

type ReqBody = {
  email: string | undefined
}

export type ResBody = {
  status: string
  message: string
  email?: string | undefined
}

const getUserEmail = async (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next): Promise<void> => {
  try {
    const { email } = req.body
    console.info('🚀  req.body:', req.body)
    if (!email) {
      res.json({ status: 'ups', message: 'no email in req.body, probably not authorized' })
      return
    }
    const user = await UserModel.findOne({ email })
    console.info('user', user)
    const response = { status: 'ok', message: 'email is returned', email: user?.email }
    res.json(response)
  } catch (error) {
    next(error)
  }
}

userEmailRouter.get('/', verifyTokenMiddleware, getUserEmail)
