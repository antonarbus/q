import { errorMessageCommon } from '@shared/consts/errorMessageCommon'
import { verifyRefreshToken, type JwtPayloadExtended } from '../services/jwt'
import { type ReqWithBody } from '../types'

type ReqWithCookies = {
  cookies?: {
    refreshJwtToken?: string
  }
}

export const getEmailFromRefreshTokenOrThrowUnauthorized = (
  req: ReqWithBody,
): string => {
  const refreshJwtToken = (req as ReqWithCookies).cookies?.refreshJwtToken

  if (typeof refreshJwtToken !== 'string') {
    throw new Error(errorMessageCommon.notLoggedIn)
  }

  try {
    const jwtPayload = verifyRefreshToken(refreshJwtToken)

    const email = (jwtPayload as JwtPayloadExtended).email

    if (typeof email !== 'string') {
      throw new Error(errorMessageCommon.notLoggedIn)
    }

    return email
  } catch {
    throw new Error(errorMessageCommon.notLoggedIn)
  }
}
