export const itemKey = {
  text: 'text',
  boq: 'boq',
  price: 'price',
  paste: 'paste',
} as const

export type ItemKey = keyof typeof itemKey
