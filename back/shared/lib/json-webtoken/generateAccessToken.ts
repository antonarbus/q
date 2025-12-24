import jwt from 'jsonwebtoken'
import { secret } from '@root/config/secrets'
import { FIFTEEN_MIN_IN_SEC } from './const'
import type { JwtPayloadExtended } from './types'

type Res = {
  value: string
  expiresOn: string
}

export const generateAccessToken = (payload: JwtPayloadExtended): Res => {
  const value = jwt.sign(payload, secret.JWT_ACCESS_SECRET, {
    expiresIn: FIFTEEN_MIN_IN_SEC,
  })

  const expiresOn = new Date(
    Date.now() + FIFTEEN_MIN_IN_SEC * 1000,
  ).toISOString()

  const accessToken = {
    value,
    expiresOn,
  }

  return accessToken
}
