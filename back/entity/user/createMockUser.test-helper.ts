import type { SelectUser } from './db/usersTableSchema'

export const createMockUser = (
  overrides: Partial<Pick<SelectUser, 'email' | 'roles'>> = {},
): Pick<SelectUser, 'email' | 'roles'> => ({
  email: 'user@example.com',
  roles: [],
  ...overrides,
})
