import type { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import express from 'express'
import { UserModel } from '../db/models/user.model'
import type { IJwtPayload } from '../services/jwt'
import { refreshJwtTokenExpirationSeconds, token } from '../services/jwt'

export const refreshRouter = express.Router()
// eslint-disable-next-line @typescript-eslint/no-misused-promises
refreshRouter.get('/', async (req: ReqType, res: ResType, next: NextType) => {
  try {
    // get refresh token from cookie

    interface IProps {
      'refreshJwtToken': string | undefined,
    }
    const refreshJwtToken = (req.cookies as IProps).refreshJwtToken

    if (!refreshJwtToken) {
      return res.json({
        status: 'error',
        message:
          'no refresh token found in cookies during token refresh, probably not authorized',
      })
    }

    // check if token is ok
    const { email } = token.verify.refresh(refreshJwtToken) as IJwtPayload

    if (!email) {
      return res.json({
        status: 'error',
        message: 'refresh token is not validated, probably not authorized',
      })
    }

    // find token in db
    const user = await UserModel.findOne({ refreshJwtToken })
    if (!user) {
      return res.json({
        status: 'error',
        message: 'no user found with such refresh token in db',
      })
    }

    // generate refresh token and save in db
    const updatedRefreshJwtToken = token.new.refresh({ email, roles: [''] })
    res.cookie('refreshJwtToken', updatedRefreshJwtToken, {
      maxAge: refreshJwtTokenExpirationSeconds * 1000,
      httpOnly: true,
    })
    await UserModel.findOneAndUpdate(
      { email },
      { refreshJwtToken: updatedRefreshJwtToken },
    )

    // generate access token and send to client
    const { roles } = user
    const accessJwtToken = token.new.access({ email, roles })

    // send response
    res.json({
      status: 'ok',
      message: `refresh token for email: ${email} is refreshed`,
      accessJwtToken,
      roles,
    })
  } catch (error) {
    next(error)
  }
})
