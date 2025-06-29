import type { UserRole } from '../const/userRole'

export type User = {
  email: string
  password: string
  roles: UserRole[]
  isActivated: boolean
  activationKey: string
  resetPasswordKey: string
  refreshJwtToken: string
  registeredAt: Date
  updatedAt: Date
  loggedAt: Date
}
