import { type ReqWithBody } from '@server/types'
import { errorMessageCommon } from '@shared/consts/errorMessageCommon'
import { verifyRefreshToken } from '../services/jwt'

export const getEmailFromRefreshTokenOrThrowUnauthorized = (
  req: ReqWithBody,
): string => {
  const refreshJwtToken = req.cookies.refreshJwtToken

  if (typeof refreshJwtToken !== 'string') {
    throw new Error(errorMessageCommon.notLoggedIn)
  }

  try {
    const jwtPayload = verifyRefreshToken(refreshJwtToken)

    const email = jwtPayload?.email

    if (typeof email !== 'string') {
      throw new Error(errorMessageCommon.notLoggedIn)
    }
    return email
  } catch (error) {
    throw new Error(errorMessageCommon.notLoggedIn)
  }
}
