import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

const accessJwtTokenExpirationSeconds = 15 * 60 // 15 min
export const refreshJwtTokenExpirationSeconds = 30 * 24 * 60 * 60 // 30 days

export interface JwtPayloadExtended {
  email: string
  roles: string[]
}

export const token = {
  new: {
    access: (payload: JwtPayloadExtended): string =>
      jwt.sign(payload, process.env.JWT_ACCESS_SECRET ?? 'some fake secret to suppress ts stupid error', {
        expiresIn: accessJwtTokenExpirationSeconds,
      }),
    refresh: (payload: JwtPayloadExtended): string =>
      jwt.sign(payload, process.env.JWT_REFRESH_SECRET ?? 'some fake secret to suppress ts stupid error', {
        expiresIn: refreshJwtTokenExpirationSeconds,
      }),
  },
  verify: {
    access: (accessJwtToken: string): JwtPayload | string =>
      jwt.verify(
        accessJwtToken,
        process.env.JWT_ACCESS_SECRET ?? 'some fake secret to suppress ts stupid error',
      ),
    refresh: (refreshJwtToken: string): JwtPayload | string =>
      jwt.verify(
        refreshJwtToken,
        process.env.JWT_REFRESH_SECRET ?? 'some fake secret to suppress ts stupid error',
      ),
  },
}
