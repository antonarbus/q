import jwt from 'jsonwebtoken'
import { secret } from '../../../../config/secrets'
import { THREE_MONTHS_IN_SEC } from './const'
import { getJwtExpirationInDays } from './getJwtExpirationInDays'
import type { JwtPayloadExtended } from './types'

type Res = {
  refreshJwtToken: string
  refreshJwtTokenExpiresOn: string
  jwtExpirationInDays: number
}

export const generateRefreshToken = (payload: JwtPayloadExtended): Res => {
  const refreshJwtToken = jwt.sign(payload, secret.JWT_REFRESH_SECRET, {
    expiresIn: THREE_MONTHS_IN_SEC,
  })

  const refreshJwtTokenExpiresOn = new Date(
    Date.now() + THREE_MONTHS_IN_SEC * 1000,
  ).toISOString()

  const jwtExpirationInDays = getJwtExpirationInDays({ token: refreshJwtToken })

  return {
    refreshJwtToken,
    refreshJwtTokenExpiresOn,
    jwtExpirationInDays,
  }
}
