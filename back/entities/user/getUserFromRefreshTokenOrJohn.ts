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

/**
 * Used only for dev purposes to access
 * dev apis directly under super-admin role at
 * https://sendmequotation.today/api/test
 * https://sendmequotation.today/api/set-bucket-cors
 * https://sendmequotation.today/api/get-bucket-cor
 */
export const getUserFromRefreshTokenOrJohn = ({ req }: Props): Res => {
  const refreshJwtToken = getRefreshTokenFromCookie({ req })

  const john = {
    email: 'john@gmail.com',
    roles: [userRole.user],
  }

  if (refreshJwtToken === undefined) {
    return john
  }

  const jwtPayload = verifyRefreshToken(refreshJwtToken)

  if (jwtPayload === undefined) {
    return john
  }

  const { email, roles } = jwtPayload

  if (typeof email !== 'string') {
    return john
  }

  return { email, roles }
}
