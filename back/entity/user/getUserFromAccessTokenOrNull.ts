import { headerName } from '@back/shared/headers'
import { getPayloadFromAccessToken } from '@back/entity/user/lib/json-webtoken'
import type { Request } from 'express'
import type { SelectUser } from './db/usersTableSchema'

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
export const getUserFromAccessTokenOrNull = async (props: Props): Promise<Res> => {
  const accessJwtToken = props.req.headers[headerName.accessJwtToken]

  if (typeof accessJwtToken !== 'string') {
    return null
  }

  const payloadFromAccessToken = await getPayloadFromAccessToken(accessJwtToken)

  if (payloadFromAccessToken === undefined) {
    return null
  }

  return {
    email: payloadFromAccessToken.email,
    roles: payloadFromAccessToken.roles,
  }
}
