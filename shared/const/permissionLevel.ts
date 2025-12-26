export const permissionLevel = {
  new: 'NEW',
  owner: 'OWNER',
  public: 'PUBLIC',
  shared: 'SHARED',
  superAdmin: 'SUPER_ADMIN',
  superAdminOnBehalfOfAUser: 'SUPER_ADMIN_ON_BEHALF_OF_A_USER',
  forbidden: 'FORBIDDEN',
} as const

export type PermissionLevel =
  (typeof permissionLevel)[keyof typeof permissionLevel]
