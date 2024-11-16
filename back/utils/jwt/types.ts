import type { JwtPayload } from 'jsonwebtoken'
import type { User } from '@entities/user'

export type JwtPayloadExtended = JwtPayload & {
  email: User['email']
  roles: User['roles']
}
