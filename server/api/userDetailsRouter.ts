import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
// import { connectToDb } from '../db/connectToDb'
import { UserModel } from '../db/models/user.model'
import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'
import { verifyToken } from '../middleware/verifyToken'

export const userDetailsRouter = express.Router()
userDetailsRouter.get('/', verifyToken, async (req: any, res: ResType, next: NextType) => {
  // const accessJwtToken = req.headers.auth as string
  try {
    // const decoded = jwt.verify(accessJwtToken, process.env.JWT_ACCESS_SECRET as string) as JwtPayload
    // console.log('decoded', decoded)
    // const { email } = decoded
    const { email } = req
    // await connectToDb()
    const user = await UserModel.findOne({ email })
    console.log('user', user)
    res.json({ status: 'ok', message: 'email is returned', email: user?.email })
  } catch (error: any) {
    next(error)
  }
})
