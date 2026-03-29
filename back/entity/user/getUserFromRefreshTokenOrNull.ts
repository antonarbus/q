import { getRefreshTokenFromCookie } from '@back/shared/headers/token/getRefreshTokenFromCookie'
import { getJwtExpirationInDays, getPayloadFromRefreshToken } from '@back/shared/lib/json-webtoken'
import type { Request } from 'express'
import type { SelectUser } from './db/usersTableSchema'

type Props = {
  req: Request<any, any, any, any>
}

type Res = {
  email: SelectUser['email']
  roles: SelectUser['roles']
  refreshJwtToken: string
  jwtRefreshTokenExpirationDays: number
} | null

/** Used only to get short lived access token. */
export const getUserFromRefreshTokenOrNull = async (props: Props): Promise<Res> => {
  const refreshJwtToken = getRefreshTokenFromCookie({ req: props.req })

  if (refreshJwtToken === undefined) {
    return null
  }

  const payloadFromRefreshToken = await getPayloadFromRefreshToken(refreshJwtToken)

  if (payloadFromRefreshToken === undefined) {
    return null
  }

  if (typeof payloadFromRefreshToken.email !== 'string') {
    return null
  }

  const jwtRefreshTokenExpirationDays = getJwtExpirationInDays({
    token: refreshJwtToken,
  })

  return {
    email: payloadFromRefreshToken.email,
    roles: payloadFromRefreshToken.roles,
    refreshJwtToken,
    jwtRefreshTokenExpirationDays,
  }
}
