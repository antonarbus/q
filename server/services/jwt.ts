import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

const fifteenMinInSec = 15 * 60
export const thirtyDaysInSec = 30 * 24 * 60 * 60

export type JwtPayloadExtended = {
  email: string
  roles: string[]
}

export const createAccessToken = (payload: JwtPayloadExtended): string =>
  jwt.sign(payload, process.env.JWT_ACCESS_SECRET ?? 'some fake secret to suppress ts error', {
    expiresIn: fifteenMinInSec,
  })

export const createRefreshToken = (payload: JwtPayloadExtended): string =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET ?? 'some fake secret to suppress ts error', {
    expiresIn: thirtyDaysInSec,
  })

export const verifyAccessToken = (accessJwtToken: string): JwtPayload | string =>
  jwt.verify(
    accessJwtToken,
    process.env.JWT_ACCESS_SECRET ?? 'some fake secret to suppress ts error',
  )

export const verifyRefreshToken = (refreshJwtToken: string): JwtPayload | string =>
  jwt.verify(
    refreshJwtToken,
    process.env.JWT_REFRESH_SECRET ?? 'some fake secret to suppress ts error',
  )
