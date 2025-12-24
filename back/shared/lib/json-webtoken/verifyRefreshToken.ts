import jwt from 'jsonwebtoken'
import { secret } from '@root/config/secrets'
import { isJwtPayloadExtended, type JwtPayloadExtended } from './types'

export const verifyRefreshToken = (
  refreshJwtToken: unknown,
): JwtPayloadExtended | undefined => {
  try {
    if (typeof refreshJwtToken !== 'string') {
      throw new Error('JWT is not a string')
    }

    const jwtPayload = jwt.verify(refreshJwtToken, secret.JWT_REFRESH_SECRET)

    if (typeof jwtPayload === 'string') {
      return undefined
    }

    if (isJwtPayloadExtended(jwtPayload) === false) {
      throw new Error(
        'JWT payload is wrong, it exists and valid, but there is no "email" or "role"',
      )
    }

    return jwtPayload
  } catch {
    return undefined // if token is expired it will result in error
  }
}
