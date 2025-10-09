import jwt from 'jsonwebtoken'
import { getEnvVarOrThrow } from '../dot-env/getEnvVar'
import { THREE_MONTHS_IN_SEC } from './const'
import { getJwtExpirationInDays } from './getJwtExpirationInDays'
import type { JwtPayloadExtended } from './types'

type Res = {
  refreshJwtToken: string
  refreshJwtTokenExpiresOn: string
  jwtExpirationInDays: number
}

export const generateRefreshToken = (payload: JwtPayloadExtended): Res => {
  const salt = getEnvVarOrThrow('JWT_REFRESH_SECRET')

  const refreshJwtToken = jwt.sign(payload, salt, {
    expiresIn: THREE_MONTHS_IN_SEC,
  })

  const refreshJwtTokenExpiresOn = new Date(
    new Date().getTime() + THREE_MONTHS_IN_SEC * 1000,
  ).toISOString()

  const jwtExpirationInDays = getJwtExpirationInDays({ token: refreshJwtToken })

  return {
    refreshJwtToken,
    refreshJwtTokenExpiresOn,
    jwtExpirationInDays,
  }
}
