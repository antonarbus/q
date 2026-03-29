import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { HttpError } from '@back/shared/errors/HttpError'
import { headerName } from '@back/shared/headers'
import { getPayloadFromAccessToken } from '@back/shared/lib/json-webtoken'
import type { Request } from 'express'
import type { SelectUser } from './db/usersTableSchema'

type Props = {
  req: Request<unknown>
}

type Res = {
  email: SelectUser['email']
  roles: SelectUser['roles']
}

/** Used to get a user details for all protected routes where a user should be logged in */
export const getUserFromAccessTokenOrThrowUnauthorized = async (props: Props): Promise<Res> => {
  const accessJwtToken = props.req.headers[headerName.accessJwtToken]

  if (typeof accessJwtToken !== 'string') {
    throw new HttpError({
      errorCode: 'UNAUTHORIZED',
      statusCode: httpStatusCode.unauthorized401,
      message: 'Not logged in',
    })
  }

  const payloadFromAccessToken = await getPayloadFromAccessToken(accessJwtToken)

  if (payloadFromAccessToken === undefined) {
    throw new HttpError({
      errorCode: 'UNAUTHORIZED',
      statusCode: httpStatusCode.unauthorized401,
      message: 'Not logged in',
    })
  }

  return {
    email: payloadFromAccessToken.email,
    roles: payloadFromAccessToken.roles,
  }
}
