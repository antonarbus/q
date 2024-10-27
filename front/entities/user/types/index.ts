export type User = {
  email: string
  password: string
  roles: ('user' | 'super-admin')[]
  isActivated: boolean
  activationKey: string
  resetPasswordKey: string
  refreshJwtToken: string
  createdAt: Date
  updatedAt: Date
  loggedAt: Date
}
