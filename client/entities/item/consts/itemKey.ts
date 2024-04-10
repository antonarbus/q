export const itemKey = {
  text: 'text',
  boq: 'boq',
  price: 'price',
  boqRow: 'boqRow',
} as const

export type ItemKey = keyof typeof itemKey
