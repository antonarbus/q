export const errorMessageCommon = {
  internalError: 'Internal error',
} as const

export type ErrorMessageCommon =
  (typeof errorMessageCommon)[keyof typeof errorMessageCommon]
