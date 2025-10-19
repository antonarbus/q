export const rowTypeKey = {
  row: 'row',
  paste: 'paste',
} as const

export type RowTypeKey = keyof typeof rowTypeKey
