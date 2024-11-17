import { Router, type Request, type Response, type NextFunction } from 'express'
import type { User } from '@entities/user'
import { httpStatus } from '../../consts/httpStatus'
import { UserModel } from '../../db/models/userModel'
import {
  createAccessToken,
  getJwtExpirationInDays,
  verifyRefreshToken,
} from '../../utils/jwt'
import { errorMessageCommon } from '@shared/consts/errorMessageCommon'

export type ResBody = {
  message: 'issued access token'
  email?: User['email']
  accessJwtToken?: string
  roles?: User['roles']
  jwtRefreshTokenExpirationDays: number
}

type Cookies = {
  refreshJwtToken?: string
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getAccessTokenRouter = Router()

const getAccessToken: RouterHandler = async (req, res, next) => {
  try {
    const refreshJwtToken = (req.cookies as Cookies).refreshJwtToken

    if (typeof refreshJwtToken !== 'string') {
      throw new Error(errorMessageCommon.notLoggedIn)
    }

    const jwtPayload = verifyRefreshToken(refreshJwtToken)

    if (jwtPayload === undefined) {
      res.clearCookie('refreshJwtToken')

      throw new Error(errorMessageCommon.notLoggedIn)
    }

    const daysUntilExpiration = getJwtExpirationInDays({
      token: refreshJwtToken,
    })

    /*
    todo: there should be device dedicated token which is automatically extended
    todo: now all devices will be logged out ones in 3 months

    // extend refresh token validity

    if (daysUntilExpiration < 5) {
      const extendedRefreshToken = createRefreshToken({
        email: jwtPayload.email,
        roles: jwtPayload.roles,
      })

      await UserModel.findOneAndUpdate(
        { email: jwtPayload.email, refreshJwtToken },
        {
          refreshJwtToken: extendedRefreshToken,
        },
      )

      res.cookie('refreshJwtToken', extendedRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: threeMonthsInSec * 1000,
      })
    }
    
    */

    const user = await UserModel.findOneAndUpdate(
      { email: jwtPayload.email, refreshJwtToken },
      { loggedAt: Date.now() },
      { new: true },
    )

    if (!user) {
      res.clearCookie('refreshJwtToken')

      throw new Error(errorMessageCommon.notLoggedIn)
    }

    const accessJwtToken = createAccessToken({
      email: jwtPayload.email,
      roles: jwtPayload.roles,
    })

    res.status(httpStatus.success_200).json({
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

getAccessTokenRouter.get('/', getAccessToken)
