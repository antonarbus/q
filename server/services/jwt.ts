import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

const fifteenMinInSec = 15 * 60
export const thirtyDaysInSec = 30 * 24 * 60 * 60

export type JwtPayloadExtended = {
  email: string
  roles: string[]
}

export const createAccessToken = (payload: JwtPayloadExtended): string => {
  const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET ?? 'some fake secret to suppress ts error', {
    expiresIn: fifteenMinInSec,
  })

  return token
}

export const createRefreshToken = (payload: JwtPayloadExtended): string => {
  const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET ?? 'some fake secret to suppress ts error', {
    expiresIn: thirtyDaysInSec,
  })

  return token
}

export const verifyAccessToken = (accessJwtToken: string): JwtPayload | undefined => {
  if (typeof process.env.JWT_ACCESS_SECRET !== 'string') return undefined
  if (typeof accessJwtToken !== 'string') return undefined

  try {
    const jwtPayload = jwt.verify(accessJwtToken, process.env.JWT_ACCESS_SECRET)
    if (typeof jwtPayload === 'string') return undefined
    return jwtPayload
  } catch (error) {
    return undefined
  }
}

export const verifyRefreshToken = (refreshJwtToken: string): JwtPayload | undefined => {
  if (typeof process.env.JWT_REFRESH_SECRET !== 'string') return undefined
  if (typeof refreshJwtToken !== 'string') return undefined

  try {
    const jwtPayload = jwt.verify(refreshJwtToken, process.env.JWT_REFRESH_SECRET)
    if (typeof jwtPayload === 'string') return undefined
    return jwtPayload
  } catch (error) {
    return undefined
  }
}
