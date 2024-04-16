import bcrypt from 'bcryptjs'
import express from 'express'
import { httpStatus } from '@shared/consts/httpStatus'
import { UserModel } from '../db/models/userModel'
import { createAccessToken, createRefreshToken, thirtyDaysInSec } from '../services/jwt'
import type { Next, ReqWithBody, ResWithBody } from '../types'

export type ReqBody = {
  email: string
  password: string
}

export type ResBody = {
  message: 'no user data' | 'no password' | 'bad password' | 'not activated' | 'good password'
  accessJwtToken?: string
  email?: string
  roles?: string[]
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const logInRouter = express.Router()

const checkCredentials: RouterHandler = async (req, res, next) => {
  try {
    const password = req.body.password
    const email = req.body.email.toLowerCase()

    const user = await UserModel.findOne({ email })

    if (!user) {
      return res
        .status(httpStatus.badRequest_400)
        .json({ message: 'no user data' })
    }

    const passwordFromDB = user.password

    if (!user.password) {
      return res
        .status(httpStatus.badRequest_400)
        .json({ message: 'no password' })
    }

    const isPasswordValid = await bcrypt.compare(password, passwordFromDB)

    if (!isPasswordValid) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'bad password' })
    }

    if (!user.isActivated) {
      // todo: send email with activation link
      return res
        .status(httpStatus.created_201)
        .json({ message: 'not activated' })
    }

    const accessJwtToken = createAccessToken({ email, roles: user.roles })
    // todo: no need to create new refresh token, if already exists and not expired, it will log you off from other devices
    const refreshJwtToken = createRefreshToken({ email, roles: user.roles })

    res.cookie('refreshJwtToken', refreshJwtToken, {
      maxAge: thirtyDaysInSec * 1000,
      httpOnly: true,
    })

    const document = await UserModel.findOneAndUpdate(
      { email },
      { refreshJwtToken },
      { new: true },
    )

    return res
      .status(httpStatus.success_200)
      .json({
        message: 'good password',
        accessJwtToken,
        email: document?.email,
        roles: document?.roles,
      })
  } catch (error) {
    next(error)
  }
}

logInRouter.post('/', checkCredentials)
