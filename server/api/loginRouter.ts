import type { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import express from 'express'
import { UserModel } from '../db/models/user.model'
import bcrypt from 'bcryptjs'
import { refreshJwtTokenExpirationSeconds, token } from '../services/jwt'

export interface TLoginApiRes {
  status: string
  message: string
  accessJwtToken: string
  email: string
  roles: string[]
}

export const loginRouter = express.Router()

loginRouter.post('/', async (req: ReqType, res: ResType, next: NextType) => {
  try {
    // get mail & password from body
    interface IBody {
      email: string
      password: string
    }

    const password = (req.body as IBody).password
    let email = (req.body as IBody).email
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
      res.json({
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
    const accessJwtToken = token.new.access({ email, roles })
    const refreshJwtToken = token.new.refresh({ email, roles })

    // put refresh token in cookie
    res.cookie('refreshJwtToken', refreshJwtToken, {
      maxAge: refreshJwtTokenExpirationSeconds * 1000,
      httpOnly: true,
    })

    // put refresh token in db & update login date
    const filter = { email }
    const update = { loggedAt: new Date(), refreshJwtToken }
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
