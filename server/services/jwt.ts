import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

export const thirtyDaysInSec = 30 * 24 * 60 * 60

export type JwtPayloadExtended = {
  email: string
  roles: string[]
}

export const createAccessToken = (payload: JwtPayloadExtended): string | undefined => {
  const sault = process.env.JWT_ACCESS_SECRET

  if (!sault) return undefined

  const fifteenMinInSec = 15 * 60

  const token = jwt.sign(payload, sault, {
    expiresIn: fifteenMinInSec,
  })

  return token
}

export const createRefreshToken = (payload: JwtPayloadExtended): string | undefined => {
  const sault = process.env.JWT_REFRESH_SECRET

  if (!sault) return undefined

  const token = jwt.sign(payload, sault, {
    expiresIn: thirtyDaysInSec,
  })

  return token
}

export const verifyAccessToken = (accessJwtToken: string): JwtPayload | undefined => {
  const sault = process.env.JWT_ACCESS_SECRET

  if (!sault) return undefined

  if (typeof accessJwtToken !== 'string') return undefined

  try {
    const jwtPayload = jwt.verify(accessJwtToken, sault)
    if (typeof jwtPayload === 'string') return undefined
    return jwtPayload
  } catch (error) {
    // if token is expired it will result in error
    return undefined
  }
}

export const verifyRefreshToken = (refreshJwtToken: string): JwtPayload | undefined => {
  const sault = process.env.JWT_REFRESH_SECRET

  if (!sault) return undefined

  if (typeof refreshJwtToken !== 'string') return undefined

  try {
    const jwtPayload = jwt.verify(refreshJwtToken, sault)
    if (typeof jwtPayload === 'string') return undefined
    return jwtPayload
  } catch (error) {
    // if token is expired it will result in error
    return undefined
  }
}
