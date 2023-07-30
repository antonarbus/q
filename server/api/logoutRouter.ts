// logoutRouter.ts
import express, {
  Request as ReqType,
  Response as ResType,
  NextFunction as NextType,
} from 'express'
import { UserModel } from '../db/models/user.model'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

export const logoutRouter = express.Router()
logoutRouter.get('/', async (req: ReqType, res: ResType, next: NextType) => {
  try {
    // check refresh token
    const { refreshJwtToken } = req.cookies
    if (!refreshJwtToken)
      res.json({ status: 'error', message: 'no refresh token in cookies' })

    // get email from refresh token
    const { email }: { email: string } = jwt_decode(refreshJwtToken)
    if (!email)
      res.json({ status: 'error', message: 'no email in refresh token' })

    // delete refreshJwtToken from cookie
    res.clearCookie('refreshJwtToken')

    // delete token from db
    const user = await UserModel.findOne({ refreshJwtToken })
    if (!user)
      return res.json({
        status: 'error',
        message: 'no user with such refresh token',
      })
    user.refreshJwtToken = undefined
    await user.save()

    // send response
    res.json({
      status: 'ok',
      message: `user with email: ${email} logged out`,
      email,
    })
  } catch (error) {
    next(error)
  }
})
