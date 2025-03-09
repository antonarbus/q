export const userRole = {
  user: 'user',
  superAdmin: 'super-admin',
} as const

export type UserRole = (typeof userRole)[keyof typeof userRole]
