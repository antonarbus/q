export const itemType = {
  text: 'text',
  boq: 'boq',
  price: 'price',
  paste: 'paste',
} as const

export type ItemType = keyof typeof itemType
