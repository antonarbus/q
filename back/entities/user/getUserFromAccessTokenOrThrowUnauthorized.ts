import { httpStatusCode } from '@back/shared/const/httpCode'
import { HttpError } from '@back/shared/errors/HttpError'
import { headerName } from '@back/shared/headers'
import { verifyAccessToken } from '@back/shared/lib/json-webtoken'
import type { Request, Response } from 'express'
import type { SelectUser } from './usersTableSchema'

type Props = {
  req: Request
  res: Response
}

type Res = {
  email: SelectUser['email']
  roles: SelectUser['roles']
}

/** Used to get a user details for all protected routes where a user should be logged in */
export const getUserFromAccessTokenOrThrowUnauthorized = ({
  req,
  res,
}: Props): Res => {
  const accessJwtToken = req.headers[headerName.accessJwtToken]

  if (typeof accessJwtToken !== 'string') {
    throw new HttpError<'UNAUTHORIZED'>({
      errorCode: 'UNAUTHORIZED',
      statusCode: httpStatusCode.unauthorized401,
      message: 'Not logged in',
    })
  }

  const jwtPayload = verifyAccessToken(accessJwtToken)

  if (jwtPayload === undefined) {
    throw new HttpError<'UNAUTHORIZED'>({
      errorCode: 'UNAUTHORIZED',
      statusCode: httpStatusCode.unauthorized401,
      message: 'Not logged in',
    })
  }

  return {
    email: jwtPayload.email,
    roles: jwtPayload.roles,
  }
}
