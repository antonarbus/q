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
import { isNoTraceModeEnabled } from '@back/utils/headers/noTraceMode'

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

    const isNoTraceMode = isNoTraceModeEnabled(req)

    const user = isNoTraceMode
      ? await UserModel.findOne({ email: jwtPayload.email, refreshJwtToken })
      : await UserModel.findOneAndUpdate(
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
