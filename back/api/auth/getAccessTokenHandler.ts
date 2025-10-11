import { getUserFromRefreshTokenOrNull, UserModel } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import {
  getShouldNotTrace,
  removeRefreshTokenCookie,
} from '@back/shared/headers'
import { generateAccessToken } from '@back/shared/lib/json-webtoken'
import type { User } from '@entities/user/type'
import type { NextFunction, Request, Response } from 'express'

export type ResBody = {
  message: 'issued access token'
  email?: User['email']
  accessJwtToken?: string
  accessJwtTokenExpiresOn?: string
  roles?: User['roles']
  jwtRefreshTokenExpirationDays: number
}

export type ErrorResBody = {
  message: ErrorMessageCommon | 'Not logged in'
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const getAccessTokenHandler: RouterHandler = async (req, res, _next) => {
  const userDataPerviouslyLoggedIn = getUserFromRefreshTokenOrNull({ req })

  if (userDataPerviouslyLoggedIn === null) {
    res.status(httpStatus.unauthorized_401).json({ message: 'Not logged in' })

    return
  }

  const { email, roles, refreshJwtToken, jwtRefreshTokenExpirationDays } =
    userDataPerviouslyLoggedIn

  const shouldNotTrace = getShouldNotTrace({ req })

  const user =
    shouldNotTrace === true
      ? await UserModel.findOne({ email, refreshJwtToken })
      : await UserModel.findOneAndUpdate(
          { email, refreshJwtToken },
          { loggedAt: Date.now() },
          { new: true },
        )

  if (user === null) {
    removeRefreshTokenCookie({ res })
    res.status(httpStatus.unauthorized_401).json({ message: 'Not logged in' })

    return
  }

  const { accessJwtToken, accessJwtTokenExpiresOn } = generateAccessToken({
    email,
    roles,
  })

  res.status(httpStatus.success_200).json({
    message: 'issued access token',
    accessJwtToken,
    accessJwtTokenExpiresOn,
    roles,
    email,
    jwtRefreshTokenExpirationDays,
  })
}
