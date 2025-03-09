import { getRefreshTokenFromCookie } from '@back/shared/headers/tokens/getRefreshTokenFromCookie'
import {
  getJwtExpirationInDays,
  verifyRefreshToken,
} from '@back/shared/lib/jwt'
import type { User } from '@entities/user'
import type { Request } from 'express'

type Props = {
  req: Request<unknown>
}

type Res = {
  email: User['email']
  roles: User['roles']
  refreshJwtToken: string
  jwtRefreshTokenExpirationDays: number
} | null

export const getUserFromRefreshTokenOrNull = ({ req }: Props): Res => {
  const refreshJwtToken = getRefreshTokenFromCookie({ req })

  if (refreshJwtToken === undefined) {
    return null
  }

  const jwtPayload = verifyRefreshToken(refreshJwtToken)

  if (jwtPayload === undefined) {
    return null
  }

  const { email, roles } = jwtPayload

  if (typeof email !== 'string') {
    return null
  }

  const jwtRefreshTokenExpirationDays = getJwtExpirationInDays({
    token: refreshJwtToken,
  })

  return { email, roles, refreshJwtToken, jwtRefreshTokenExpirationDays }
}
