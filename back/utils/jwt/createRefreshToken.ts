import jwt from 'jsonwebtoken'
import { getEnvVarOrThrow } from '../getEnvVar'
import type { JwtPayloadExtended } from './types'
import { thirtyDaysInSec } from './const'

export const createRefreshToken = (
  payload: JwtPayloadExtended,
): string | undefined => {
  const salt = getEnvVarOrThrow('JWT_REFRESH_SECRET')

  const token = jwt.sign(payload, salt, {
    expiresIn: thirtyDaysInSec,
  })

  return token
}
