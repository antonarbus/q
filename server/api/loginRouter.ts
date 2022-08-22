import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
// import { connectToDb } from '../db/connectToDb'
import { UserModel } from '../db/models/user.model'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const refreshTokenExpirationDays = 30

export const loginRouter = express.Router()
loginRouter.post('/', async (req: ReqType, res: ResType, next: NextType) => {
  console.log(req.body)
  let { email, password } = req.body
  try {
    // await connectToDb()
    email = email.toLowerCase()
    const user = await UserModel.findOne({ email })
    if (!user) return res.json({ status: 'error', message: 'invalid email' })
    if (!user.isActivated) return res.json({ status: 'error', message: 'account is not activated' })
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) return res.json({ status: 'error', message: 'invalid password' })
    // send token
    const accessJwtToken = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '8h' })
    const refreshJwtToken = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: `${refreshTokenExpirationDays}d` })
    // add refresh token into cookie
    res.cookie('refreshToken', refreshJwtToken, { maxAge: refreshTokenExpirationDays * 24 * 60 * 60 * 1000, httpOnly: true })
    res.json({ status: 'ok', message: `user with email: ${email} logged in`, accessJwtToken })
    // update logging date and refresh token
    const filter = { email }
    const update = { loggedAt: new Date(), refreshToken: refreshJwtToken }
    await UserModel.findOneAndUpdate(filter, update)
  } catch (error: any) {
    next(error)
  }
})
