export const errorMessageCommon = {
  notLoggedIn: 'Not logged in',
  internalError: 'Internal error',
} as const

export type ErrorMessageCommon =
  (typeof errorMessageCommon)[keyof typeof errorMessageCommon]
