import type { User } from '@entities/user'
import type { JwtPayload } from 'jsonwebtoken'

export type JwtPayloadExtended = JwtPayload & {
  email: User['email']
  roles: User['roles']
}
