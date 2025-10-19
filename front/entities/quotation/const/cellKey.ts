export const cellKey = {
  description: 'description',
  itemPrice: 'itemPrice',
  qty: 'qty',
  price: 'price',
} as const

export type CellKey = keyof typeof cellKey
