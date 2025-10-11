import type { User } from '@entities/user/type'
import type { JwtPayload } from 'jsonwebtoken'

export type JwtPayloadExtended = JwtPayload & {
  email: User['email']
  roles: User['roles']
}
