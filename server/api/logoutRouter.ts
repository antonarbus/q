import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { UserModel } from '../db/models/user.model'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const logoutRouter = express.Router()
logoutRouter.get('/', async (req: ReqType, res: ResType, next: NextType) => {
  try {
    const { refreshJwtToken } = req.cookies
    if (!refreshJwtToken) res.json({ status: 'error', message: 'no refresh token in cookies, probably already logged out' })
    const { email } = jwt.verify(refreshJwtToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload
    if (!email) res.json({ status: 'error', message: 'can not retrieve email from refresh token' })

    // clear refreshJwtToken from cookie
    res.clearCookie('refreshJwtToken')

    // delete token from db
    const user = await UserModel.findOne({ refreshJwtToken })
    if (!user) return res.json({ status: 'error', message: 'no user find with such refresh token' })
    user.refreshJwtToken = undefined
    await user.save()

    // send response
    res.json({ status: 'ok', message: `user with email: ${email} logged out` })
  } catch (error) {
    next(error)
  }
})
