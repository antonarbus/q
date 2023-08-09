// loginRouter.ts
import type {
  Request as ReqType,
  Response as ResType,
  NextFunction as NextType,
} from 'express'
import express from 'express'
import { UserModel } from '../db/models/user.model'
import bcrypt from 'bcryptjs'
import { refreshJwtTokenExpirationSeconds, token } from '../services/jwt'

export const loginRouter = express.Router()
loginRouter.post('/', async (req: ReqType, res: ResType, next: NextType) => {
  try {
    // get mail & password from body
    let { email, password } = req.body
    email = email.toLowerCase()

    // check email & password
    const user = await UserModel.findOne({ email })
    const isPasswordValid =
      user && (await bcrypt.compare(password, user.password!))
    if (!user || !isPasswordValid)
      return res.json({ status: 'error', message: 'invalid credentials' })

    // check if account is activated
    if (!user.isActivated) {
      // todo: send email with activation link
      return res.json({ status: 'error', message: 'account is not activated' })
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
    res.json({
      status: 'ok',
      message: `user with email: ${email} logged in and tokens are refreshed`,
      accessJwtToken,
      email,
      roles,
    })
  } catch (error: any) {
    next(error)
  }
})
