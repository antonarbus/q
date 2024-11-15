import express from 'express'
import type { User } from '@entities/user'
import { httpStatus } from '../../consts/httpStatus'
import { UserModel } from '../../db/models/userModel'
import {
  createAccessToken,
  createRefreshToken,
  getJwtExpirationInDays,
  thirtyDaysInSec,
  verifyRefreshToken,
} from '../../utils/jwt'
import type { Next, ReqExtended, ResWithBody } from '../../types'
import { errorMessageCommon } from '@shared/consts/errorMessageCommon'

export type ResBody = {
  message: 'issued access token'
  email?: User['email']
  accessJwtToken?: string
  roles?: User['roles']
  jwtRefreshTokenExpirationDays: number
}

export const getAccessTokenRouter = express.Router()

const getAccessToken = async (
  req: ReqExtended<{
    cookies: {
      refreshJwtToken?: string
    }
  }>,
  res: ResWithBody<ResBody>,
  next: Next,
): Promise<ResWithBody<ResBody> | undefined> => {
  try {
    const refreshJwtToken = req.cookies.refreshJwtToken

    if (typeof refreshJwtToken !== 'string') {
      throw new Error(errorMessageCommon.notLoggedIn)
    }

    const jwtPayload = verifyRefreshToken(refreshJwtToken)

    if (jwtPayload === undefined) {
      res.clearCookie('refreshJwtToken')

      throw new Error(errorMessageCommon.notLoggedIn)
    }

    if (jwtPayload.exp === undefined) {
      res.clearCookie('refreshJwtToken')

      throw new Error(errorMessageCommon.notLoggedIn)
    }

    const daysUntilExpiration = getJwtExpirationInDays({
      token: refreshJwtToken,
    })

    const user = await UserModel.findOneAndUpdate(
      { email: jwtPayload.email, refreshJwtToken },
      { loggedAt: Date.now() },
    )

    if (daysUntilExpiration < 5) {
      const extendedRefreshToken = createRefreshToken({
        email: jwtPayload.email,
        roles: jwtPayload.roles,
      })

      // do not await, no need to block execution, not important
      UserModel.findOneAndUpdate(
        { email: jwtPayload.email, refreshJwtToken },
        {
          refreshJwtToken: extendedRefreshToken,
        },
      )

      res.cookie('refreshJwtToken', extendedRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: thirtyDaysInSec * 1000,
      })
    }

    if (!user) {
      res.clearCookie('refreshJwtToken')

      throw new Error(errorMessageCommon.notLoggedIn)
    }

    const accessJwtToken = createAccessToken({
      email: jwtPayload.email,
      roles: jwtPayload.roles,
    })

    if (accessJwtToken === undefined) {
      throw new Error(errorMessageCommon.notLoggedIn)
    }

    return res.status(httpStatus.success_200).json({
      message: 'issued access token',
      accessJwtToken,
      roles: jwtPayload.roles,
      email: jwtPayload.email,
      jwtRefreshTokenExpirationDays: daysUntilExpiration,
    })
  } catch (error) {
    next(error)
  }
}

getAccessTokenRouter.get('/', (req, res, next) => {
  void getAccessToken(req, res, next)
})
