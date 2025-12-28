import { getRefreshTokenFromCookie } from '@back/shared/headers/token/getRefreshTokenFromCookie'
import {
  getJwtExpirationInDays,
  verifyRefreshToken,
} from '@back/shared/lib/json-webtoken'
import type { Request } from 'express'
import type { SelectUser } from './usersTableSchema'

type Props = {
  req: Request
}

type Res = {
  email: SelectUser['email']
  roles: SelectUser['roles']
  refreshJwtToken: string
  jwtRefreshTokenExpirationDays: number
} | null

/** Used only to get short lived access token. */
export const getUserFromRefreshTokenOrNull = (props: Props): Res => {
  const refreshJwtToken = getRefreshTokenFromCookie({ req: props.req })

  if (refreshJwtToken === undefined) {
    return null
  }

  const jwtPayload = verifyRefreshToken(refreshJwtToken)

  if (jwtPayload === undefined) {
    return null
  }

  if (typeof jwtPayload.email !== 'string') {
    return null
  }

  const jwtRefreshTokenExpirationDays = getJwtExpirationInDays({
    token: refreshJwtToken,
  })

  return {
    email: jwtPayload.email,
    roles: jwtPayload.roles,
    refreshJwtToken,
    jwtRefreshTokenExpirationDays,
  }
}
