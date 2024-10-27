import type { User } from '@entities/user'
import { verifyRefreshToken, type JwtPayloadExtended } from '../services/jwt'
import type { ReqWithBody } from '../types'

type ReqWithCookies = {
  cookies?: {
    refreshJwtToken?: string
  }
}

type Res = {
  email: User['email']
  roles: User['roles']
}

export const getUserFromRefreshToken = (req: ReqWithBody): Res => {
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

    const { email, roles } = jwtPayload as JwtPayloadExtended

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
