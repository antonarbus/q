
import express from 'express'
import { UserModel } from '../db/models/user.model'
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware'
import type { TNext, TReqWithBody, TRes } from '../types'

export const userEmailRouter = express.Router()

interface IBody {
  email: string | undefined
}

export interface TUserEmailRes {
  status: string
  message: string
  email: string | undefined
}

const getUserEmail = async (req: TReqWithBody<IBody>, res: TRes, next: TNext): Promise<void> => {
  try {
    const { email } = req.body
    console.log('🚀  req.body:', req.body)
    if (!email) {
      res.json({ status: 'ups', message: 'no email in req.body, probably not authorized' })
      return
    }
    const user = await UserModel.findOne({ email })
    console.log('user', user)
    const response = { status: 'ok', message: 'email is returned', email: user?.email }
    res.json(response)
  } catch (error) {
    next(error)
  }
}

userEmailRouter.get('/', verifyTokenMiddleware, getUserEmail)

