import { UserModel } from '../db/models/user.model'
import jwt_decode from 'jwt-decode'
import type { TNext, TReq, TRes } from '../types'
import { Router } from 'express'
import type { TJwtPayload } from '../services/jwt'

export const logoutRouter = Router()

interface TReqWithCookies {
  cookies: {
    refreshJwtToken: string | undefined
  }
}

logoutRouter.get('/', async (req: TReq, res: TRes, next: TNext) => {
  try {

    const refreshJwtToken = (req as TReqWithCookies).cookies.refreshJwtToken

    if (!refreshJwtToken) {
      res.json({ status: 'error', message: 'no refresh token in cookies' })
      return
    }

    // get email from refresh token
    const { email } = jwt_decode<TJwtPayload>(refreshJwtToken)

    if (!email) {
      res.json({ status: 'error', message: 'no email in refresh token' })
      return
    }

    // delete refreshJwtToken from cookie
    res.clearCookie('refreshJwtToken')

    // delete token from db
    const user = await UserModel.findOne({ refreshJwtToken })

    if (!user) {
      res.json({
        status: 'error',
        message: 'no user with such refresh token',
      })
      return
    }

    user.refreshJwtToken = undefined
    await user.save()

    res.json({
      status: 'ok',
      message: `user with email: ${email} logged out`,
      email,
    })
  } catch (error) {
    next(error)
  }
})
