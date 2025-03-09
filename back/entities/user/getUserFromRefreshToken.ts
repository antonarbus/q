import type { User } from '@entities/user'
import type { Request } from 'express'
import { userRole } from '@back/shared/consts/userRole'
import { getRefreshTokenFromCookie } from '@back/shared/headers/tokens/getRefreshTokenFromCookie'
import { verifyRefreshToken } from '@back/shared/lib/jwt'

type Props = {
  req: Request<unknown>
}

type Res = {
  email: User['email']
  roles: User['roles']
}

export const getUserFromRefreshToken = ({ req }: Props): Res => {
  const refreshJwtToken = getRefreshTokenFromCookie({ req })

  if (refreshJwtToken === undefined) {
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
