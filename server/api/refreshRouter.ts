import express from 'express'
import { UserModel } from '../db/models/userModel'
import type { JwtPayloadExtended } from '../services/jwt'
import { getNewAccessToken, getNewRefreshToken, thirtyDaysInSec, verifyRefreshToken } from '../services/jwt'
import type { Next, Req, ResWithBody } from '../types'

export type ResBody = {
  message: string
  email: string
  accessJwtToken: string
  roles: string[]
}

export const refreshRouter = express.Router()

refreshRouter.get('/', async (req: Req, res: ResWithBody<ResBody>, next: Next) => {
  try {
    const refreshJwtToken = req.cookies.refreshJwtToken

    if (typeof refreshJwtToken !== 'string') {
      return res.status(401).json({
        message: 'no refresh token found in cookies, not authorized',
        email: 'no email',
        accessJwtToken: 'no access token',
        roles: ['no role'],
      })
    }

    // check if token is ok
    const { email } = verifyRefreshToken(refreshJwtToken) as JwtPayloadExtended

    if (!email) {
      return res.status(401).json({
        message: 'refresh token is not validated, not authorized',
        email: 'no email',
        accessJwtToken: 'no access token',
        roles: ['no role'],
      })
    }

    const user = await UserModel.findOne({ refreshJwtToken })
    if (!user) {
      return res.status(401).json({
        message: 'no user found with such refresh token',
        email: 'no email',
        accessJwtToken: 'no access token',
        roles: ['no role'],
      })
    }

    // generate refresh token and save in db
    const updatedRefreshJwtToken = getNewRefreshToken({ email, roles: [''] })
    res.cookie('refreshJwtToken', updatedRefreshJwtToken, {
      maxAge: thirtyDaysInSec * 1000,
      httpOnly: true,
    })

    const filter = { email }
    const update = { refreshJwtToken: updatedRefreshJwtToken }

    await UserModel.findOneAndUpdate(filter, update)

    // generate access token and send to client
    const { roles } = user
    const accessJwtToken = getNewAccessToken({ email, roles })

    // send response
    return res.status(200).json({
      message: `updated refresh token for email: ${email} is refreshed`,
      accessJwtToken,
      roles,
      email,
    })
  } catch (error) {
    next(error)
  }
})
