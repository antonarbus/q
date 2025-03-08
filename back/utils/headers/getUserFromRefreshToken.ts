import type { User } from '@entities/user'
import { verifyRefreshToken } from '../jwt/verifyRefreshToken'
import type { Request } from 'express'

type Res = {
  email: User['email']
  roles: User['roles']
}

export const getUserFromRefreshToken = (
  req: Request<unknown, unknown, unknown>,
): Res => {
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
}
