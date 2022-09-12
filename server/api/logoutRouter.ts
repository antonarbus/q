// logoutRouter.ts
import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { UserModel } from '../db/models/user.model'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

export const logoutRouter = express.Router()
logoutRouter.get('/', async (req: ReqType, res: ResType, next: NextType) => {
  try {
    console.log(1)
    // check refresh token
    const { refreshJwtToken } = req.cookies
    if (!refreshJwtToken) res.json({ status: 'error', message: 'no refresh token in cookies' })
    console.log(2)

    // get email from refresh token
    const { email }: { email: string } = jwt_decode(refreshJwtToken)
    if (!email) res.json({ status: 'error', message: 'no email in refresh token' })
    console.log('email from token', email)

    // delete refreshJwtToken from cookie
    res.clearCookie('refreshJwtToken')
    console.log(4)

    // delete token from db
    const user = await UserModel.findOne({ refreshJwtToken })
    console.log('user found by refresh token')
    console.log(user)
    if (!user) return res.json({ status: 'error', message: 'no user with such refresh token' })
    user.refreshJwtToken = undefined
    await user.save()
    console.log('refresh token is deleted')
    console.log(user)

    // send response
    res.json({ status: 'ok', message: `user with email: ${email} logged out`, email })
    console.log('sending response, should contain email')
    console.log(email)
  } catch (error) {
    next(error)
  }
})
