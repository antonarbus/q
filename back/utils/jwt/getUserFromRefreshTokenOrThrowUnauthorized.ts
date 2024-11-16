import type { User } from '@entities/user'
import { errorMessageCommon } from '@shared/consts/errorMessageCommon'
import type { ReqWithBody } from '../../types'
import { verifyRefreshToken } from './verifyRefreshToken'

export const getUserFromRefreshTokenOrThrowUnauthorized = (
  req: ReqWithBody,
): {
  email: User['email']
  roles: User['roles']
} => {
  type ReqWithCookies = {
    cookies?: {
      refreshJwtToken?: string
    }
  }

  const refreshJwtToken = (req as ReqWithCookies).cookies?.refreshJwtToken

  if (typeof refreshJwtToken !== 'string') {
    throw new Error(errorMessageCommon.notLoggedIn)
  }

  try {
    const jwtPayload = verifyRefreshToken(refreshJwtToken)

    if (jwtPayload === undefined) {
      throw new Error(errorMessageCommon.notLoggedIn)
    }

    return { email: jwtPayload.email, roles: jwtPayload.roles }
  } catch {
    throw new Error(errorMessageCommon.notLoggedIn)
  }
}
