import jwt from 'jsonwebtoken'
import { THREE_MONTHS_IN_SEC } from './const'
import { getJwtExpirationInDays } from '@back/shared/lib/json-webtoken/getJwtExpirationInDays'
import type { JwtPayloadExtended } from './types'
import { getSecret } from '@back/shared/lib/secret-manager/getSecret'

type Res = {
  value: string
  expiresOn: string
  expiresInDays: number
}

export const generateRefreshToken = async (payload: JwtPayloadExtended): Promise<Res> => {
  const JWT_REFRESH_SECRET = await getSecret('JWT_REFRESH_SECRET')

  const jwtPayloadWithEmailAndRole = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: THREE_MONTHS_IN_SEC,
  })

  const expiresOn = new Date(Date.now() + THREE_MONTHS_IN_SEC * 1000).toISOString()

  const expiresInDays = getJwtExpirationInDays({ token: jwtPayloadWithEmailAndRole })

  const refreshJwtToken = {
    value: jwtPayloadWithEmailAndRole,
    expiresOn,
    expiresInDays,
  }

  return refreshJwtToken
}
