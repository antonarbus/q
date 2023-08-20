import { UserModel } from '../db/models/user.model'
import jwt_decode from 'jwt-decode'
import type { Next, Req, Res } from '../types'
import { Router } from 'express'
import type { JwtPayloadExtended } from '../services/jwt'

export const logoutRouter = Router()

interface ReqWithCookies {
  cookies: {
    refreshJwtToken: string | undefined
  }
}

export interface LogoutApiRes {
  status: string
  message: string
  email?: string
}

logoutRouter.get('/', async (req: Req, res: Res, next: Next) => {
  try {

    const refreshJwtToken = (req as ReqWithCookies).cookies.refreshJwtToken

    if (!refreshJwtToken) {
      res.json({ status: 'error', message: 'no refresh token in cookies' })
      return
    }

    // get email from refresh token
    const { email } = jwt_decode<JwtPayloadExtended>(refreshJwtToken)

    if (!email) {
      res.json({
        status: 'error',
        message: 'no email in refresh token',
      })
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
