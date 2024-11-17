import type { User } from '@entities/user'
import { errorMessageCommon } from '@shared/consts/errorMessageCommon'
import { headerName } from '@back/consts/headerName'
import { verifyAccessToken } from './verifyAccessToken'
import type { ReqWithBody } from '@back/types'

type Res = {
  email: User['email']
  roles: User['roles']
}

export const getUserFromAccessTokenOrThrowUnauthorized = (
  req: ReqWithBody,
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
