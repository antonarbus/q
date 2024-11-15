import { getEnvVarOrThrow } from '@back/utils/getEnvVar'
import { jsonParseSafe } from '@back/utils/jsonParseSafe'
import type { User } from '@entities/user'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { errorMessageCommon } from '@shared/consts/errorMessageCommon'
import type { ReqWithBody } from '../types'

const fifteenMinInSec = 15 * 60
export const thirtyDaysInSec = 30 * 24 * 60 * 60

export type JwtPayloadExtended = JwtPayload & {
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
): JwtPayloadExtended | undefined => {
  try {
    const salt = getEnvVarOrThrow('JWT_ACCESS_SECRET')

    const jwtPayload = jwt.verify(accessJwtToken, salt)

    if (typeof jwtPayload === 'string') {
      return undefined
    }

    if (!('email' in jwtPayload)) {
      return undefined
    }

    if (!('roles' in jwtPayload)) {
      return undefined
    }

    return jwtPayload as JwtPayloadExtended
  } catch {
    return undefined // if token is expired it will result in error
  }
}

export const verifyRefreshToken = (
  refreshJwtToken: string,
): JwtPayloadExtended | undefined => {
  try {
    const salt = getEnvVarOrThrow('JWT_REFRESH_SECRET')

    const jwtPayload = jwt.verify(refreshJwtToken, salt)

    if (typeof jwtPayload === 'string') {
      return undefined
    }

    if (!('email' in jwtPayload)) {
      return undefined
    }

    if (!('roles' in jwtPayload)) {
      return undefined
    }

    return jwtPayload as JwtPayloadExtended
  } catch {
    return undefined // if token is expired it will result in error
  }
}

export const getJwtExpirationInDays = ({
  token,
}: {
  token: string
}): number => {
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
  const expirationDate = new Date(expirationInMs).getTime()
  const currentDate = new Date().getTime()
  const timeDifference = expirationDate - currentDate
  const daysUntilExpiration = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  return daysUntilExpiration
}

export const getUserFromRefreshTokenOrThrowUnauthorized = (
  req: ReqWithBody,
): {
  email: User['email']
  roles: User['roles']
} => {
  type ReqWithCookies = {
    cookies?: {
      refreshJwtToken?: string
    }
  }

  const refreshJwtToken = (req as ReqWithCookies).cookies?.refreshJwtToken

  if (typeof refreshJwtToken !== 'string') {
    throw new Error(errorMessageCommon.notLoggedIn)
  }

  try {
    const jwtPayload = verifyRefreshToken(refreshJwtToken)

    if (jwtPayload === undefined) {
      throw new Error(errorMessageCommon.notLoggedIn)
    }

    return { email: jwtPayload.email, roles: jwtPayload.roles }
  } catch {
    throw new Error(errorMessageCommon.notLoggedIn)
  }
}

export const getUserFromRefreshToken = (
  req: ReqWithBody,
): {
  email: User['email']
  roles: User['roles']
} => {
  type ReqWithCookies = {
    cookies?: {
      refreshJwtToken?: string
    }
  }

  const refreshJwtToken = (req as ReqWithCookies).cookies?.refreshJwtToken

  if (typeof refreshJwtToken !== 'string') {
    return {
      email: 'no email',
      roles: ['user'],
    }
  }

  try {
    const jwtPayload = verifyRefreshToken(refreshJwtToken)

    if (jwtPayload === undefined) {
      return {
        email: 'no email',
        roles: ['user'],
      }
    }

    const { email, roles } = jwtPayload

    if (typeof email !== 'string') {
      return {
        email: 'no email',
        roles: ['user'],
      }
    }

    return { email, roles }
  } catch {
    return {
      email: 'no email',
      roles: ['user'],
    }
  }
}
