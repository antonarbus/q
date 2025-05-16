import jwt from 'jsonwebtoken'
import { getEnvVarOrThrow } from '../../utils/getEnvVar'
import type { JwtPayloadExtended } from './types'

export const verifyAccessToken = (
  accessJwtToken: string,
): JwtPayloadExtended | undefined => {
  try {
    const salt = getEnvVarOrThrow('JWT_ACCESS_SECRET')

    const jwtPayload = jwt.verify(accessJwtToken, salt)

    if (typeof jwtPayload === 'string') {
      return undefined
    }

    if ('email' in jwtPayload === false) {
      throw new Error(
        'JWT payload is wrong, it exists and valid, but there is no "email"',
      )
    }

    if ('roles' in jwtPayload === false) {
      throw new Error(
        'JWT payload is wrong, it exists and valid, but there is no "roles"',
      )
    }

    return jwtPayload as JwtPayloadExtended
  } catch {
    return undefined // if token is expired it will result in error
  }
}
