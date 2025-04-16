import type { Request, Response, NextFunction } from 'express'
import type { User } from '@entities/user'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { errorMessageCommon } from '@shared/consts/errorMessageCommon'
import { generateAccessToken } from '@back/shared/lib/jwt'
import { isNoTraceMode, removeRefreshTokenCookie } from '@back/shared/headers'
import { getUserFromRefreshTokenOrNull, UserModel } from '@back/entities/user'

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

export const getAccessToken: RouterHandler = async (req, res, next) => {
  const userDataPerviouslyLoggedIn = getUserFromRefreshTokenOrNull({ req })

  if (userDataPerviouslyLoggedIn === null) {
    throw new Error(errorMessageCommon.notLoggedIn)
  }

  const { email, roles, refreshJwtToken, jwtRefreshTokenExpirationDays } =
    userDataPerviouslyLoggedIn

  const shouldNotTrace = isNoTraceMode({ req })

  const user = shouldNotTrace
    ? await UserModel.findOne({ email, refreshJwtToken })
    : await UserModel.findOneAndUpdate(
        { email, refreshJwtToken },
        { loggedAt: Date.now() },
        { new: true },
      )

  if (!user) {
    removeRefreshTokenCookie({ res })

    throw new Error(errorMessageCommon.notLoggedIn)
  }

  const accessJwtToken = generateAccessToken({ email, roles })

  res.status(httpStatus.success_200).json({
    message: 'issued access token',
    accessJwtToken,
    roles,
    email,
    jwtRefreshTokenExpirationDays,
  })
}
