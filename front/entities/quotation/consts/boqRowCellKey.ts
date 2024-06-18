export const boqRowCellKey = {
  description: 'description',
  itemPrice: 'itemPrice',
  qty: 'qty',
  price: 'price',
} as const

export type BoqRowCellKey = keyof typeof boqRowCellKey
