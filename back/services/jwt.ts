import { getEnvVarOrThrow } from '@back/utils/getEnvVar'
import { jsonParseSafe } from '@back/utils/jsonParseSafe'
import type { User } from '@entities/user'
import jwt, { type JwtPayload } from 'jsonwebtoken'

const fifteenMinInSec = 15 * 60
export const thirtyDaysInSec = 30 * 24 * 60 * 60

export type JwtPayloadExtended = {
  email: User['email']
  roles: User['roles']
}

export const createAccessToken = (
  payload: JwtPayloadExtended,
): string | undefined => {
  const salt = getEnvVarOrThrow('JWT_ACCESS_SECRET')

  const token = jwt.sign(payload, salt, {
    expiresIn: fifteenMinInSec,
  })

  return token
}

export const createRefreshToken = (
  payload: JwtPayloadExtended,
): string | undefined => {
  const salt = getEnvVarOrThrow('JWT_REFRESH_SECRET')

  const token = jwt.sign(payload, salt, {
    expiresIn: thirtyDaysInSec,
  })

  return token
}

export const verifyAccessToken = (
  accessJwtToken: string,
): JwtPayload | undefined => {
  try {
    const salt = getEnvVarOrThrow('JWT_ACCESS_SECRET')

    const jwtPayload = jwt.verify(accessJwtToken, salt)
    if (typeof jwtPayload === 'string') return undefined
    return jwtPayload
  } catch {
    return undefined // if token is expired it will result in error
  }
}

export const verifyRefreshToken = (
  refreshJwtToken: string,
): JwtPayload | undefined => {
  try {
    const salt = getEnvVarOrThrow('JWT_REFRESH_SECRET')

    const jwtPayload = jwt.verify(refreshJwtToken, salt)
    if (typeof jwtPayload === 'string') return undefined
    return jwtPayload
  } catch {
    return undefined // if token is expired it will result in error
  }
}

export const getJwtExpiration = ({ token }: { token: string }): Date => {
  // Split the token into three parts: header, payload, and signature
  const parts = token.split('.')

  if (parts.length !== 3) {
    throw new Error('Invalid JWT token format')
  }

  // Base64 decode the payload
  const payloadPart = parts[1]

  if (!payloadPart) {
    throw new Error('Invalid JWT token format')
  }

  const payloadString = atob(payloadPart)

  // Parse the payload JSON
  const payload = jsonParseSafe<JwtPayload>(payloadString)

  if (!payload) {
    throw new Error('Token does not have an expiration (exp) claim')
  }

  // Extract the expiration time (exp) from the payload
  const expiration = payload.exp

  // Check if expiration exists
  if (!expiration) {
    throw new Error('Token does not have an expiration (exp) claim')
  }

  // Convert expiration to milliseconds
  const expirationInMs = expiration * 1000

  // Create a new Date object from the expiration time in milliseconds
  const expirationDate = new Date(expirationInMs)

  return expirationDate
}
