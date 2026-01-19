import { getRefreshTokenFromCookie } from '@back/shared/headers/token/getRefreshTokenFromCookie'
import { verifyRefreshToken } from '@back/shared/lib/json-webtoken'
import type { Request } from 'express'
import type { SelectUser } from './db/usersTableSchema'

type Props = {
  req: Request
}

type Res = {
  email: SelectUser['email']
  roles: SelectUser['roles']
}

/**
 * Used only for dev purposes to access
 * dev apis directly under super-admin role at
 *
 * https://sendmequotation.today/api/test
 * https://sendmequotation.today/api/set-bucket-cors
 * https://sendmequotation.today/api/get-bucket-cor
 */
export const getUserFromRefreshTokenOrUnknownPerson = async (
  props: Props,
): Promise<Res> => {
  const refreshJwtToken = getRefreshTokenFromCookie({ req: props.req })

  const unknownPerson = {
    email: 'unknown@gmail.com',
    roles: ['user'] as ['user'],
  }

  if (refreshJwtToken === undefined) {
    return unknownPerson
  }

  const jwtPayload = await verifyRefreshToken(refreshJwtToken)

  if (jwtPayload === undefined) {
    return unknownPerson
  }

  if (typeof jwtPayload.email !== 'string') {
    return unknownPerson
  }

  return {
    email: jwtPayload.email,
    roles: jwtPayload.roles,
  }
}
