import type { SelectUser } from '@back/entities/user/db/usersTableSchema'
import type { JwtPayload } from 'jsonwebtoken'

export type JwtPayloadExtended = JwtPayload & {
  email: SelectUser['email']
  roles: SelectUser['roles']
}

/** Check if 'email' and 'roles' properties are in payload */
export const isJwtPayloadExtended = (
  payload: JwtPayload,
): payload is JwtPayloadExtended => {
  if ('email' in payload === false) {
    return false
  }

  if ('roles' in payload === false) {
    return false
  }

  return true
}
