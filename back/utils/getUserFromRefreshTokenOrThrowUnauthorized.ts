import { errorMessageCommon } from '@shared/consts/errorMessageCommon'
import { verifyRefreshToken, type JwtPayloadExtended } from '../services/jwt'
import type { ReqWithBody } from '../types'
import type { User } from '@entities/user'

type ReqWithCookies = {
  cookies?: {
    refreshJwtToken?: string
  }
}

type Res = {
  email: User['email']
  roles: User['roles']
}

export const getUserFromRefreshTokenOrThrowUnauthorized = (
  req: ReqWithBody,
): Res => {
  const refreshJwtToken = (req as ReqWithCookies).cookies?.refreshJwtToken

  if (typeof refreshJwtToken !== 'string') {
    throw new Error(errorMessageCommon.notLoggedIn)
  }

  try {
    const jwtPayload = verifyRefreshToken(refreshJwtToken)

    const { email, roles } = jwtPayload as JwtPayloadExtended

    if (typeof email !== 'string') {
      throw new Error(errorMessageCommon.notLoggedIn)
    }

    return { email, roles }
  } catch {
    throw new Error(errorMessageCommon.notLoggedIn)
  }
}
