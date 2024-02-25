import express from 'express'
import { UserModel } from '../db/models/userModel'
import type { JwtPayloadExtended } from '../services/jwt'
import { getNewAccessToken, getNewRefreshToken, refreshJwtTokenExpirationSeconds, verifyRefreshToken } from '../services/jwt'
import type { Next, Req, ResWithBody } from '../types'

export type ResBody = {
  status: string
  message: string
  email: string
  accessJwtToken: string
  roles: string[]
}

export const refreshRouter = express.Router()

refreshRouter.get('/', async (req: Req, res: ResWithBody<ResBody>, next: Next) => {
  try {
    // get refresh token from cookie

    type Props = {
      'refreshJwtToken': string | undefined
    }
    const refreshJwtToken = (req.cookies as Props).refreshJwtToken

    if (!refreshJwtToken) {
      res.json({
        status: 'error',
        message: 'no refresh token found in cookies during token refresh, probably not authorized',
        email: 'no email',
        accessJwtToken: 'no access token',
        roles: ['no role'],
      })
      return
    }

    // check if token is ok
    const { email } = verifyRefreshToken(refreshJwtToken) as JwtPayloadExtended

    if (!email) {
      res.json({
        status: 'error',
        message: 'refresh token is not validated, probably not authorized',
        email: 'no email',
        accessJwtToken: 'no access token',
        roles: ['no role'],
      })
      return
    }

    // find token in db
    const user = await UserModel.findOne({ refreshJwtToken })
    if (!user) {
      res.json({
        status: 'error',
        message: 'no user found with such refresh token in db',
        email: 'no email',
        accessJwtToken: 'no access token',
        roles: ['no role'],
      })
      return
    }

    // generate refresh token and save in db
    const updatedRefreshJwtToken = getNewRefreshToken({ email, roles: [''] })
    res.cookie('refreshJwtToken', updatedRefreshJwtToken, {
      maxAge: refreshJwtTokenExpirationSeconds * 1000,
      httpOnly: true,
    })

    const filter = { email }
    const update = { refreshJwtToken: updatedRefreshJwtToken }

    await UserModel.findOneAndUpdate(filter, update)

    // generate access token and send to client
    const { roles } = user
    const accessJwtToken = getNewAccessToken({ email, roles })

    // send response
    res.json({
      status: 'ok',
      message: `refresh token for email: ${email} is refreshed`,
      accessJwtToken,
      roles,
      email,
    })
  } catch (error) {
    next(error)
  }
})
