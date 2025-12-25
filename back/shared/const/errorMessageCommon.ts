// todo: check if we need it
export const errorMessageCommon = {
  internalError: 'Internal error',
} as const

// todo: check if we need it
export type ErrorMessageCommon =
  (typeof errorMessageCommon)[keyof typeof errorMessageCommon]
