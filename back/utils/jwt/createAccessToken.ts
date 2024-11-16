import jwt from 'jsonwebtoken'
import type { JwtPayloadExtended } from './types'
import { getEnvVarOrThrow } from '../getEnvVar'
import { fifteenMinInSec } from './const'

export const createAccessToken = (
  payload: JwtPayloadExtended,
): string | undefined => {
  const salt = getEnvVarOrThrow('JWT_ACCESS_SECRET')

  const token = jwt.sign(payload, salt, {
    expiresIn: fifteenMinInSec,
  })

  return token
}
