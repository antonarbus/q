import { httpStatus } from '@server/consts/httpStatus'
import bcrypt from 'bcryptjs'
import express from 'express'
import { UserModel } from '../db/models/userModel'
import { getNewAccessToken, getNewRefreshToken, thirtyDaysInSec } from '../services/jwt'
import type { Next, ReqWithBody, ResWithBody } from '../types'

export type ReqBody = {
  email: string
  password: string
}

export type ResBody = {
  status: string
  message: string
  accessJwtToken: string
  email: string
  roles: string[]
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const loginRouter = express.Router()

const checkCredentials: RouterHandler = async (req, res, next) => {
  try {
    const password = req.body.password
    const email = req.body.email.toLowerCase()

    const user = await UserModel.findOne({ email })

    if (!user) {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ status: 'error', message: 'no user data' })
    }

    const passwordFromDB = user.password

    if (!passwordFromDB) {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ status: 'error', message: 'no password' })
    }

    const isPasswordValid = await bcrypt.compare(password, passwordFromDB)

    if (!isPasswordValid) {
      return res
        .status(httpStatus.unauthorized_401)
        .json({
          status: 'error',
          message: 'invalid credentials',
          accessJwtToken: 'no access token',
          email: 'no email',
          roles: ['no role'],
        })
    }

    // check if account is activated
    if (!user.isActivated) {
      // todo: send email with activation link
      return res
        .status(httpStatus.created_201)
        .json({
          status: 'error',
          message: 'account is not activated',
          accessJwtToken: 'no access token',
          email: 'no email',
          roles: ['no role'],
        })
    }

    // generate jwt tokens
    const accessJwtToken = getNewAccessToken({ email, roles: user.roles })
    const refreshJwtToken = getNewRefreshToken({ email, roles: user.roles })

    // put refresh token in cookie
    res.cookie('refreshJwtToken', refreshJwtToken, {
      maxAge: thirtyDaysInSec * 1000,
      httpOnly: true,
    })

    // put refresh token in db & update login date
    const filter = { email }
    const update = { refreshJwtToken }
    await UserModel.findOneAndUpdate(filter, update)

    // return data to the client
    return res
      .status(httpStatus.success_200)
      .json({
        status: 'ok',
        message: `user with email: ${email} logged in and tokens are refreshed`,
        accessJwtToken,
        email,
        roles: user.roles,
      })
  } catch (error) {
    next(error)
  }
}

loginRouter.post('/', checkCredentials)
