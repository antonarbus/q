import type { User } from '@entities/user'
import { errorMessageCommon } from '@shared/consts/errorMessageCommon'
import { headerName } from '@back/shared/headers'
import type { Request } from 'express'
import { verifyAccessToken } from '@back/shared/libs/jwt'

type Props = {
  req: Request<unknown>
}

type Res = {
  email: User['email']
  roles: User['roles']
}

/**
 * Used to get a user details for all protected routes where a user should be logged in
 */
export const getUserFromAccessTokenOrThrowUnauthorized = ({
  req,
}: Props): Res => {
  const accessJwtToken = req.headers[headerName.accessJwtToken]

  if (typeof accessJwtToken !== 'string') {
    throw new Error(errorMessageCommon.notLoggedIn)
  }

  const jwtPayload = verifyAccessToken(accessJwtToken)

  if (jwtPayload === undefined) {
    throw new Error(errorMessageCommon.notLoggedIn)
  }

  const { email, roles } = jwtPayload

  return { email, roles }
}
