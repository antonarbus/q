import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { connectToDb } from '../db/connectToDb'
import { UserModel } from '../db/models/user.model'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const refreshRouter = express.Router()
refreshRouter.get('/', async (req: ReqType, res: ResType, next: NextType) => {
  try {
    // get refresh token from cookie
    let { refreshJwtToken } = req.cookies
    if (!refreshJwtToken) res.json({ status: 'error', message: 'no refresh token found in cookies during token refresh, probably not authorized' })

    // check if token is ok
    const { email } = jwt.verify(refreshJwtToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload
    if (!email) res.json({ status: 'error', message: 'no user found during token refresh, probably not authorized' })

    // find token in db
    const user = await UserModel.findOne({ refreshJwtToken })
    if (!user) return res.json({ status: 'error', message: 'no user find with such refresh token' })

    // generate refresh token and save in db
    const refreshJwtTokenExpirationDays = 30
    refreshJwtToken = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: `${refreshJwtTokenExpirationDays}d` })
    res.cookie('refreshJwtToken', refreshJwtToken, { maxAge: refreshJwtTokenExpirationDays * 24 * 60 * 60 * 1000, httpOnly: true })
    await UserModel.findOneAndUpdate({ email }, { refreshJwtToken })

    // generate access token and send to client
    const accessJwtToken = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '8h' })

    // send response
    res.json({ status: 'ok', message: `refresh token for email: ${email} is refreshed`, accessJwtToken })
  } catch (error) {
    next(error)
  }
})
