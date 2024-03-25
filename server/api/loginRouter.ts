import bcrypt from 'bcryptjs'
import express from 'express'
import { UserModel } from '../db/models/userModel'
import { getNewAccessToken, getNewRefreshToken, thirtyDaysInSec } from '../services/jwt'
import type { Next, Req, Res } from '../types'

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

export const loginRouter = express.Router()

loginRouter.post('/', async (req: Req, res: Res, next: Next) => {
  try {
    const password = (req.body as ReqBody).password
    let email = (req.body as ReqBody).email
    email = email.toLowerCase()

    // check email & password
    const user = await UserModel.findOne({ email })

    if (!user) {
      res.json({ status: 'error', message: 'no user data' })
      return
    }

    const passwordFromDB = user.password

    if (!passwordFromDB) {
      res.json({ status: 'error', message: 'no password' })
      return
    }

    const isPasswordValid = await bcrypt.compare(password, passwordFromDB)

    if (!isPasswordValid) {
      res.status(401).json({
        status: 'error',
        message: 'invalid credentials',
        accessJwtToken: 'no access token',
        email: 'no email',
        roles: ['no role'],
      })
      return
    }

    // check if account is activated
    if (!user.isActivated) {
      // todo: send email with activation link
      res.json({
        status: 'error',
        message: 'account is not activated',
        accessJwtToken: 'no access token',
        email: 'no email',
        roles: ['no role'],
      })
      return
    }

    // generate jwt tokens
    const { roles } = user
    const accessJwtToken = getNewAccessToken({ email, roles })
    const refreshJwtToken = getNewRefreshToken({ email, roles })

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
    const response = {
      status: 'ok',
      message: `user with email: ${email} logged in and tokens are refreshed`,
      accessJwtToken,
      email,
      roles,
    }

    res.json(response)
  } catch (error) {
    next(error)
  }
})
