import express from 'express'
import { type User } from '@entities/user'
import { UserModel } from '../db/models/userModel'
import type { JwtPayloadExtended } from '../services/jwt'
import { createAccessToken, verifyRefreshToken } from '../services/jwt'
import type { Next, Req, ResWithBody } from '../types'

export type ResBody = {
  message: string
  email?: User['email']
  accessJwtToken?: string
  roles?: User['roles']
}

export const getAccessTokenRouter = express.Router()

getAccessTokenRouter.get('/', async (req: Req, res: ResWithBody<ResBody>, next: Next) => {
  try {
    const refreshJwtToken = req.cookies.refreshJwtToken

    if (typeof refreshJwtToken !== 'string') {
      return res
        .status(401)
        .json({
          message: 'no refresh token found in cookies, not authorized',
        })
    }

    const { email } = verifyRefreshToken(refreshJwtToken) as JwtPayloadExtended

    if (!email) {
      return res
        .status(401)
        .json({
          message: 'refresh token is not validated, not authorized',
        })
    }

    const user = await UserModel.findOne({ refreshJwtToken })

    if (user === null) {
      return res
        .status(401)
        .json({
          message: 'no user found with such refresh token',
        })
    }

    const accessJwtToken = createAccessToken({ email, roles: user.roles })

    if (!accessJwtToken) {
      return res
        .status(401)
        .json({
          message: 'something wend wrong during access token creation',
        })
    }

    return res
      .status(200)
      .json({
        message: `issued access token for email: ${email}`,
        accessJwtToken,
        roles: user.roles,
        email,
      })
  } catch (error) {
    next(error)
  }
})
