import jwt from 'jsonwebtoken'
import { getEnvVarOrThrow } from '../getEnvVar'
import type { JwtPayloadExtended } from './types'
import { threeMonthsInSec } from './const'

export const createRefreshToken = (payload: JwtPayloadExtended): string => {
  const salt = getEnvVarOrThrow('JWT_REFRESH_SECRET')

  const token = jwt.sign(payload, salt, {
    expiresIn: threeMonthsInSec,
  })

  return token
}
