import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { UserModel } from '../db/models/user.model'
import bcrypt from 'bcryptjs'
import { getAccessJwtToken, getRefreshJwtToken, refreshJwtTokenExpirationSeconds } from '../services/jwt/jwt'

export const loginRouter = express.Router()
loginRouter.post('/', async (req: ReqType, res: ResType, next: NextType) => {
  try {
    // get mail & password from body
    let { email, password } = req.body
    email = email.toLowerCase()

    // check email & password
    const user = await UserModel.findOne({ email })
    const isPasswordValid = user && await bcrypt.compare(password, user.password)
    if (!user || !isPasswordValid) return res.json({ status: 'error', message: 'invalid credentials' })

    // check if account is activated
    if (!user.isActivated) return res.json({ status: 'error', message: 'account is not activated' })

    // generate jwt tokens
    // const refreshJwtTokenExpirationDays = 30
    // const accessJwtToken = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '8h' })
    const accessJwtToken = getAccessJwtToken({ email })
    // const refreshJwtToken = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: `${refreshJwtTokenExpirationDays}d` })
    const refreshJwtToken = getRefreshJwtToken({ email })

    // put refresh token in cookie
    res.cookie('refreshJwtToken', refreshJwtToken, { maxAge: refreshJwtTokenExpirationSeconds * 1000, httpOnly: true })

    // put refresh token in db (also update login date)
    const filter = { email }
    const update = { loggedAt: new Date(), refreshJwtToken }
    await UserModel.findOneAndUpdate(filter, update)

    // return access token to the client
    res.json({ status: 'ok', message: `user with email: ${email} logged in and tokens are refreshedddddd`, accessJwtToken })
  } catch (error: any) {
    next(error)
  }
})
