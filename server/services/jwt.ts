import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

const accessJwtTokenExpirationSeconds = 15 * 60 // 15 min
export const refreshJwtTokenExpirationSeconds = 30 * 24 * 60 * 60 // 30 days

export const token = {
  new: {
    access: (payload: object | string) =>
      jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
        expiresIn: accessJwtTokenExpirationSeconds,
      }),
    refresh: (payload: object | string) =>
      jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
        expiresIn: refreshJwtTokenExpirationSeconds,
      }),
  },
  verify: {
    access: (accessJwtToken: string) =>
      jwt.verify(
        accessJwtToken,
        process.env.JWT_ACCESS_SECRET!,
      ) as JwtPayload,
    refresh: (refreshJwtToken: string) =>
      jwt.verify(
        refreshJwtToken,
        process.env.JWT_REFRESH_SECRET!,
      ) as JwtPayload,
  },
}
