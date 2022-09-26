// jwt.ts
import jwt, { JwtPayload } from 'jsonwebtoken'

const accessJwtTokenExpirationSeconds = 15 * 60 // 15 min
export const refreshJwtTokenExpirationSeconds = 30 * 24 * 60 * 60 // 30 days

export const generateAccessJwtToken = (payload: string | object) => jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: accessJwtTokenExpirationSeconds })
export const generateRefreshJwtToken = (payload: string | object) => jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: refreshJwtTokenExpirationSeconds })
export const verifyAccessJwtToken = (accessJwtToken: string) => jwt.verify(accessJwtToken, process.env.JWT_ACCESS_SECRET as string) as JwtPayload
export const verifyRefreshJwtToken = (refreshJwtToken: string) => jwt.verify(refreshJwtToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload
