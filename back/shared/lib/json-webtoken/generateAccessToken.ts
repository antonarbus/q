import jwt from 'jsonwebtoken'
import { FIFTEEN_MIN_IN_SEC } from './const'
import type { JwtPayloadExtended } from './types'
import { getSecret } from '../secret-manager/getSecret'

type Res = {
  value: string
  expiresOn: string
}

export const generateAccessToken = async (payload: JwtPayloadExtended): Promise<Res> => {
  const JWT_ACCESS_SECRET = await getSecret('JWT_ACCESS_SECRET')

  const value = jwt.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: FIFTEEN_MIN_IN_SEC,
  })

  const expiresOn = new Date(Date.now() + FIFTEEN_MIN_IN_SEC * 1000).toISOString()

  const accessToken = {
    value,
    expiresOn,
  }

  return accessToken
}
