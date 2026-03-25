import jwt from 'jsonwebtoken'
import { isJwtPayloadExtended, type JwtPayloadExtended } from './types'
import { getSecret } from '../secret-manager/getSecret'

export const getPayloadFromRefreshToken = async (
  refreshJwtToken: unknown,
): Promise<JwtPayloadExtended | undefined> => {
  const JWT_REFRESH_SECRET = await getSecret('JWT_REFRESH_SECRET')

  try {
    if (typeof refreshJwtToken !== 'string') {
      throw new Error('JWT is not a string')
    }

    const jwtPayload = jwt.verify(refreshJwtToken, JWT_REFRESH_SECRET)

    if (typeof jwtPayload === 'string') {
      return undefined
    }

    if (isJwtPayloadExtended(jwtPayload) === false) {
      throw new Error(
        'JWT payload is wrong, it exists and valid, but there is no "email" or "role"',
      )
    }

    return jwtPayload
  } catch {
    return undefined // if token is expired it will result in error
  }
}
