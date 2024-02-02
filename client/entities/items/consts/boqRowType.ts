export const boqRowType = {
  row: 'row',
  paste: 'paste',
} as const

export type BoqRowType = keyof typeof boqRowType
