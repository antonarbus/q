import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { UserModel } from '../db/models/user.model'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { getAccessJwtToken, getRefreshJwtToken, refreshJwtTokenExpirationSeconds, verifyRefreshJwtToken } from '../services/jwt/jwt'

export const refreshRouter = express.Router()
refreshRouter.get('/', async (req: ReqType, res: ResType, next: NextType) => {
  try {
    // get refresh token from cookie
    let { refreshJwtToken } = req.cookies
    if (!refreshJwtToken) res.json({ status: 'error', message: 'no refresh token found in cookies during token refresh, probably not authorized' })

    // check if token is ok
    const { email } = verifyRefreshJwtToken(refreshJwtToken)
    if (!email) res.json({ status: 'error', message: 'no user found during token refresh, probably not authorized' })

    // find token in db
    const user = await UserModel.findOne({ refreshJwtToken })
    if (!user) return res.json({ status: 'error', message: 'no user find with such refresh token' })

    // generate refresh token and save in db
    refreshJwtToken = getRefreshJwtToken({ email })
    res.cookie('refreshJwtToken', refreshJwtToken, { maxAge: refreshJwtTokenExpirationSeconds * 1000, httpOnly: true })
    await UserModel.findOneAndUpdate({ email }, { refreshJwtToken })

    // generate access token and send to client
    const accessJwtToken = getAccessJwtToken({ email })

    // send response
    res.json({ status: 'ok', message: `refresh token for email: ${email} is refreshed`, accessJwtToken })
  } catch (error) {
    next(error)
  }
})
