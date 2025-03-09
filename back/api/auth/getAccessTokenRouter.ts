import { Router, type Request, type Response, type NextFunction } from 'express'
import type { User } from '@entities/user'
import { httpStatus } from '@back/consts/httpStatus'
import { UserModel } from '@back/db/models/userModel'
import { errorMessageCommon } from '@shared/consts/errorMessageCommon'
import {
  createAccessToken,
  getJwtExpirationInDays,
  verifyRefreshToken,
} from '@back/utils/jwt'
import {
  getRefreshTokenFromCookie,
  isNoTraceCookie,
  removeRefreshTokenCookie,
} from '@back/utils/headers'

export type ResBody = {
  message: 'issued access token'
  email?: User['email']
  accessJwtToken?: string
  roles?: User['roles']
  jwtRefreshTokenExpirationDays: number
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getAccessTokenRouter = Router()

const getAccessToken: RouterHandler = async (req, res, next) => {
  try {
    const refreshJwtToken = getRefreshTokenFromCookie({ req })

    if (refreshJwtToken === undefined) {
      throw new Error(errorMessageCommon.notLoggedIn)
    }

    const jwtPayload = verifyRefreshToken(refreshJwtToken)

    if (jwtPayload === undefined) {
      removeRefreshTokenCookie({ res })

      throw new Error(errorMessageCommon.notLoggedIn)
    }

    const daysUntilExpiration = getJwtExpirationInDays({
      token: refreshJwtToken,
    })

    const shouldNotTrace = isNoTraceCookie(req)

    const user = shouldNotTrace
      ? await UserModel.findOne({ email: jwtPayload.email, refreshJwtToken })
      : await UserModel.findOneAndUpdate(
          { email: jwtPayload.email, refreshJwtToken },
          { loggedAt: Date.now() },
          { new: true },
        )

    if (!user) {
      removeRefreshTokenCookie({ res })

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
