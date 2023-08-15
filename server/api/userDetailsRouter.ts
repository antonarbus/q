
import express from 'express'
import { UserModel } from '../db/models/user.model'
import { verifyToken } from '../middleware/verifyToken'
import type { Response, NextFunction } from 'express'
import type { TypedRequestBody } from '../types'

export const userDetailsRouter = express.Router()

const routeHandler = async (req: TypedRequestBody<{ email: string | undefined }>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body
    if (!email) {
      res.json({ status: 'ups', message: 'no email in req.body' })
      return
    }
    const user = await UserModel.findOne({ email })
    console.log('user', user)
    res.json({ status: 'ok', message: 'email is returned', email: user?.email })

  } catch (error) {
    next(error)
  }
}

userDetailsRouter.get('/', verifyToken, routeHandler)

