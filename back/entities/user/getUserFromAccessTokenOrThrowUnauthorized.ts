import type { User } from '@entities/user'
import { headerName } from '@back/shared/headers'
import type { Request, Response } from 'express'
import { verifyAccessToken } from '@back/shared/lib/json-webtoken'
import { httpStatus } from '@back/shared/const/httpStatus'

type Props = {
  req: Request<unknown, unknown, unknown, unknown>
  res: Response
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
  res,
}: Props): Res => {
  const accessJwtToken = req.headers[headerName.accessJwtToken]

  if (typeof accessJwtToken !== 'string') {
    res.status(httpStatus.unauthorized_401).json({ message: 'Not logged in' })

    throw new Error('Not logged in')
  }

  const jwtPayload = verifyAccessToken(accessJwtToken)

  if (jwtPayload === undefined) {
    res.status(httpStatus.unauthorized_401).json({ message: 'Not logged in' })

    throw new Error('Not logged in')
  }

  const { email, roles } = jwtPayload

  return { email, roles }
}
