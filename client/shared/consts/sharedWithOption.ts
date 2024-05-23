export const sharedWithOption = {
  nobody: 'nobody',
  everybody: 'everybody',
  persons: 'persons',
} as const

export type SharedWithOption =
  (typeof sharedWithOption)[keyof typeof sharedWithOption]
