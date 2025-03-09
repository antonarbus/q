import type { User } from '@entities/user'
import { verifyRefreshToken } from '../../jwt'
import type { Request } from 'express'
import { cookieName } from '../const'
import { userRole } from '@back/consts/userRole'

type Res = {
  email: User['email']
  roles: User['roles']
}

type ReqWithCookies = {
  cookies?: {
    [cookieName.refreshJwtToken]?: string
  }
}

export const getUserFromRefreshToken = (
  req: Request<unknown, unknown, unknown>,
): Res => {
  const refreshJwtToken = (req as ReqWithCookies).cookies?.[
    cookieName.refreshJwtToken
  ]

  if (typeof refreshJwtToken !== 'string') {
    return {
      email: 'no email',
      roles: [userRole.user],
    }
  }

  const jwtPayload = verifyRefreshToken(refreshJwtToken)

  if (jwtPayload === undefined) {
    return {
      email: 'no email',
      roles: [userRole.user],
    }
  }

  const { email, roles } = jwtPayload

  if (typeof email !== 'string') {
    return {
      email: 'no email',
      roles: [userRole.user],
    }
  }

  return { email, roles }
}
