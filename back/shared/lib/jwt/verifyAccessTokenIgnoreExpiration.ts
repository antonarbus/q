import jwt from 'jsonwebtoken'
import { getEnvVarOrThrow } from '../../utils/getEnvVar'
import type { JwtPayloadExtended } from './types'

export const verifyAccessTokenIgnoreExpiration = (
  accessJwtToken: string,
): JwtPayloadExtended => {
  const salt = getEnvVarOrThrow('JWT_ACCESS_SECRET')

  const jwtPayload = jwt.verify(accessJwtToken, salt, {
    ignoreExpiration: true,
  })

  if (typeof jwtPayload === 'string') {
    throw new Error('JWT payload is wrong, it is a string')
  }

  if (!('email' in jwtPayload)) {
    throw new Error(
      'JWT payload is wrong, it exists and valid, but there is no "email"',
    )
  }

  if (!('roles' in jwtPayload)) {
    throw new Error(
      'JWT payload is wrong, it exists and valid, but there is no "roles"',
    )
  }

  return jwtPayload as JwtPayloadExtended
}
