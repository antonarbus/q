import type { User } from '@entities/user'
import { errorMessageCommon } from '@shared/consts/errorMessageCommon'
import { headerName } from '@back/utils/headers/const'
import { verifyAccessToken } from '../jwt'
import type { Request } from 'express'

type Res = {
  email: User['email']
  roles: User['roles']
}

export const getUserFromAccessTokenOrThrowUnauthorized = (
  req: Request<unknown, unknown, unknown>,
): Res => {
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
