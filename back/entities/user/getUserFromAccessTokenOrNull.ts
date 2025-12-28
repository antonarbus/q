import { headerName } from '@back/shared/headers'
import { verifyAccessToken } from '@back/shared/lib/json-webtoken'
import type { Request } from 'express'
import type { SelectUser } from './usersTableSchema'

type Props = {
  req: Request
}

type Res = {
  email: SelectUser['email']
  roles: SelectUser['roles']
} | null

/**
 * Used for routes which can be visited with or without authentication \
 * And we want to distinguish such visitors, for ex \
 * Public quotation can be visited by strangers with restricted data, \
 * But logged owner gets the same quotation in full access
 */
export const getUserFromAccessTokenOrNull = (props: Props): Res => {
  const accessJwtToken = props.req.headers[headerName.accessJwtToken]

  if (typeof accessJwtToken !== 'string') {
    return null
  }

  const jwtPayload = verifyAccessToken(accessJwtToken)

  if (jwtPayload === undefined) {
    return null
  }

  return {
    email: jwtPayload.email,
    roles: jwtPayload.roles,
  }
}
