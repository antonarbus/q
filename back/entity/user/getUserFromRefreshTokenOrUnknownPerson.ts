import { getRefreshTokenFromCookie } from '@back/shared/headers/token/getRefreshTokenFromCookie'
import { getPayloadFromRefreshToken } from '@back/shared/lib/json-webtoken'
import type { Request } from 'express'
import type { SelectUser } from './db/usersTableSchema'

type Props = {
  req: Request<any, any, any, any>
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
export const getUserFromRefreshTokenOrUnknownPerson = async (props: Props): Promise<Res> => {
  const refreshJwtToken = getRefreshTokenFromCookie({ req: props.req })

  const unknownPerson = {
    email: 'unknown@gmail.com',
    roles: ['user'] as ['user'],
  }

  if (refreshJwtToken === undefined) {
    return unknownPerson
  }

  const payloadFromRefreshToken = await getPayloadFromRefreshToken(refreshJwtToken)

  if (payloadFromRefreshToken === undefined) {
    return unknownPerson
  }

  if (typeof payloadFromRefreshToken.email !== 'string') {
    return unknownPerson
  }

  return {
    email: payloadFromRefreshToken.email,
    roles: payloadFromRefreshToken.roles,
  }
}
