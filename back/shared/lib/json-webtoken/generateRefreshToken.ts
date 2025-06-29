import jwt from 'jsonwebtoken'
import { getEnvVarOrThrow } from '../dot-env/getEnvVar'
import type { JwtPayloadExtended } from './types'

export const generateRefreshToken = (payload: JwtPayloadExtended): string => {
  const salt = getEnvVarOrThrow('JWT_REFRESH_SECRET')
  const threeMonthsInSec = 3 * 30 * 24 * 60 * 60

  const token = jwt.sign(payload, salt, {
    expiresIn: threeMonthsInSec,
  })

  return token
}
