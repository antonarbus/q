import jwt from 'jsonwebtoken'
import type { JwtPayloadExtended } from './types'
import { getEnvVarOrThrow } from '../../utils/getEnvVar'

export const generateAccessToken = (payload: JwtPayloadExtended): string => {
  const salt = getEnvVarOrThrow('JWT_ACCESS_SECRET')
  const fifteenMinInSec = 15 * 60

  const token = jwt.sign(payload, salt, {
    expiresIn: fifteenMinInSec,
  })

  return token
}
