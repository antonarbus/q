import type { User } from '@entities/user'
import type { ReqWithBody } from '../../types'
import { verifyRefreshToken } from './verifyRefreshToken'

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
