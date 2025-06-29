import type { User } from '@entities/user'
import { headerName } from '@back/shared/headers'
import type { Request } from 'express'
import { verifyAccessToken } from '@back/shared/lib/json-webtoken'

type Props = {
  req: Request<unknown>
}

type Res = {
  email: User['email']
  roles: User['roles']
} | null

/**
 * Used for routes which can be visited with or without authentication \
 * And we want to distinguish such visitors, for ex \
 * Public quotation can be visited by strangers with restricted data, \
 * But logged owner gets the same quotation in full access
 */
export const getUserFromAccessTokenOrNull = ({ req }: Props): Res => {
  const accessJwtToken = req.headers[headerName.accessJwtToken]

  if (typeof accessJwtToken !== 'string') {
    return null
  }

  const jwtPayload = verifyAccessToken(accessJwtToken)

  if (jwtPayload === undefined) {
    return null
  }

  const { email, roles } = jwtPayload

  return { email, roles }
}
