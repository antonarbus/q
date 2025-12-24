import jwt from 'jsonwebtoken'
import { secret } from '@root/config/secrets'
import { THREE_MONTHS_IN_SEC } from './const'
import { getJwtExpirationInDays } from './getJwtExpirationInDays'
import type { JwtPayloadExtended } from './types'

type Res = {
  value: string
  expiresOn: string
  expiresInDays: number
}

export const generateRefreshToken = (payload: JwtPayloadExtended): Res => {
  const value = jwt.sign(payload, secret.JWT_REFRESH_SECRET, {
    expiresIn: THREE_MONTHS_IN_SEC,
  })

  const expiresOn = new Date(
    Date.now() + THREE_MONTHS_IN_SEC * 1000,
  ).toISOString()

  const expiresInDays = getJwtExpirationInDays({ token: value })

  const refreshJwtToken = {
    value,
    expiresOn,
    expiresInDays,
  }

  return refreshJwtToken
}
