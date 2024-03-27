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

export const enum Message {
  noUserData = 'no user data',
  noPassword = 'no password',
  badPassword = 'bad password',
  goodPassword = 'good password',
  notActivated = 'not activated'
}

export type ResBody = {
  message: Message
  accessJwtToken?: string
  email?: string
  roles?: string[]
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
        .status(httpStatus.badRequest_400)
        .json({ message: Message.noUserData })
    }

    const passwordFromDB = user.password

    if (!user.password) {
      return res
        .status(httpStatus.badRequest_400)
        .json({ message: Message.noPassword })
    }

    const isPasswordValid = await bcrypt.compare(password, passwordFromDB)

    if (!isPasswordValid) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: Message.badPassword })
    }

    // todo: send email with activation link
    if (!user.isActivated) {
      return res
        .status(httpStatus.created_201)
        .json({ message: Message.notActivated })
    }

    const accessJwtToken = createAccessToken({ email, roles: user.roles })
    const refreshJwtToken = createRefreshToken({ email, roles: user.roles })

    res.cookie('refreshJwtToken', refreshJwtToken, {
      maxAge: thirtyDaysInSec * 1000,
      httpOnly: true,
    })

    const filter = { email }
    const update = { refreshJwtToken }
    await UserModel.findOneAndUpdate(filter, update)

    return res
      .status(httpStatus.success_200)
      .json({ message: Message.goodPassword, accessJwtToken, email, roles: user.roles })
  } catch (error) {
    next(error)
  }
}

loginRouter.post('/', checkCredentials)
