export const boqColumnKey = {
  number: 'number',
  description: 'description',
  itemPrice: 'itemPrice',
  qty: 'qty',
  price: 'price',
} as const

export type ColumnNameKey = keyof typeof boqColumnKey
