import jwt from 'jsonwebtoken'
import { secret } from '../../../../config/secrets'
import { isJwtPayloadExtended, type JwtPayloadExtended } from './types'

export const verifyAccessToken = (
  accessJwtToken: string,
): JwtPayloadExtended | undefined => {
  try {
    const jwtPayload = jwt.verify(accessJwtToken, secret.JWT_ACCESS_SECRET)

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
