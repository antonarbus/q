export const errorCode = {
  internalError: 'INTERNAL_ERROR',
} as const

export type ErrorCode = (typeof errorCode)[keyof typeof errorCode]
