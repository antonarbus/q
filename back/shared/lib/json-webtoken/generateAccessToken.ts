import jwt from 'jsonwebtoken'
import { env } from '../dot-env'
import { FIFTEEN_MIN_IN_SEC } from './const'
import type { JwtPayloadExtended } from './types'

type Res = {
  accessJwtToken: string
  accessJwtTokenExpiresOn: string
}

export const generateAccessToken = (payload: JwtPayloadExtended): Res => {
  const accessJwtToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: FIFTEEN_MIN_IN_SEC,
  })

  const accessJwtTokenExpiresOn = new Date(
    Date.now() + FIFTEEN_MIN_IN_SEC * 1000,
  ).toISOString()

  return {
    accessJwtToken,
    accessJwtTokenExpiresOn,
  }
}
