import jwt from 'jsonwebtoken'
import type { JwtPayloadExtended } from './types'
import { getEnvVarOrThrow } from '../dot-env/getEnvVar'
import { FIFTEEN_MIN_IN_SEC } from './const'

type Res = {
  accessJwtToken: string
  accessJwtTokenExpiresOn: string
}

export const generateAccessToken = (payload: JwtPayloadExtended): Res => {
  const salt = getEnvVarOrThrow('JWT_ACCESS_SECRET')

  const accessJwtToken = jwt.sign(payload, salt, {
    expiresIn: FIFTEEN_MIN_IN_SEC,
  })

  const accessJwtTokenExpiresOn = new Date(
    new Date().getTime() + FIFTEEN_MIN_IN_SEC * 1000,
  ).toISOString()

  return {
    accessJwtToken,
    accessJwtTokenExpiresOn,
  }
}
