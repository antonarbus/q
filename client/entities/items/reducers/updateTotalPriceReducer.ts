import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../redux/itemsSlice'

export const updateTotalPriceReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  value: number
  html: string
}>): void => {
  const { itemIndex, html, value } = action.payload

  const item = state[itemIndex]
  if (item?.type !== 'boq') return

  item.boq.header.price.value = value
  item.boq.header.price.html = html
}
