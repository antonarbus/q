import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { UserModel } from '../db/models/user.model'
import { verifyToken } from '../middleware/verifyToken'

// todo: delete, it is temp file not related to the projects
export const userDetailsRouter = express.Router()
userDetailsRouter.get('/', verifyToken, async (req: any, res: ResType, next: NextType) => {
  try {
    const { email } = req
    const user = await UserModel.findOne({ email })
    console.log('user', user)
    res.json({ status: 'ok', message: 'email is returned', email: user?.email })
  } catch (error: any) {
    next(error)
  }
})
