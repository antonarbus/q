export const errorCodeCommon = {
  internalError: 'INTERNAL_ERROR',
} as const

export type ErrorCodeCommon =
  (typeof errorCodeCommon)[keyof typeof errorCodeCommon]
