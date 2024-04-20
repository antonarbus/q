import express from 'express'
import { type User } from '@entities/user'
import { httpStatus } from '@shared/consts/httpStatus'
import { UserModel } from '../db/models/userModel'
import { createAccessToken, verifyRefreshToken } from '../services/jwt'
import type { Next, Req, ResWithBody } from '../types'

export type ResBody = {
  message:
  'no refresh token found in cookies, not authorized' |
  'refresh token is not validated, not authorized' |
  'no user found with such refresh token' |
  'something went wrong during access token creation' |
  'issued access token'
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
        .status(httpStatus.unauthorized_401)
        .json({ message: 'no refresh token found in cookies, not authorized' })
    }

    const jwtPayload = verifyRefreshToken(refreshJwtToken)

    const email = jwtPayload?.email

    if (typeof email !== 'string') {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ message: 'refresh token is not validated, not authorized' })
    }

    const user = await UserModel.findOne({ email, refreshJwtToken })

    if (!user) {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ message: 'no user found with such refresh token' })
    }

    const accessJwtToken = createAccessToken({ email, roles: user.roles })

    if (!accessJwtToken) {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ message: 'something went wrong during access token creation' })
    }

    return res
      .status(httpStatus.success_200)
      .json({
        message: 'issued access token',
        accessJwtToken,
        roles: user.roles,
        email,
      })
  } catch (error) {
    next(error)
  }
})
