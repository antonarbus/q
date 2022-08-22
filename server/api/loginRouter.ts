import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
// import { connectToDb } from '../db/connectToDb'
import { UserModel } from '../db/models/user.model'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

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
    const refreshJwtTokenExpirationDays = 30
    const accessJwtToken = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '8h' })
    const refreshJwtToken = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: `${refreshJwtTokenExpirationDays}d` })

    // put refresh token in cookie
    res.cookie('refreshJwtToken', refreshJwtToken, { maxAge: refreshJwtTokenExpirationDays * 24 * 60 * 60 * 1000, httpOnly: true })

    // put refresh token in db (also update login date)
    const filter = { email }
    const update = { loggedAt: new Date(), refreshJwtToken }
    await UserModel.findOneAndUpdate(filter, update)

    // return access token to the client
    res.json({ status: 'ok', message: `user with email: ${email} logged in`, accessJwtToken })
  } catch (error: any) {
    next(error)
  }
})
