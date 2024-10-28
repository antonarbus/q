export type User = {
  email: string
  password: string
  roles: ('user' | 'super-admin')[]
  isActivated: boolean
  activationKey: string
  resetPasswordKey: string
  refreshJwtToken: string
  registeredAt: Date
  updatedAt: Date
  loggedAt: Date
}
