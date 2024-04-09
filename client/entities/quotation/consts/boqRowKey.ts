export const boqRowKey = {
  row: 'row',
  paste: 'paste',
} as const

export type BoqRowKey = keyof typeof boqRowKey
