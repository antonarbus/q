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

  item.boq.header.subTotalPrice.value = value
  item.boq.header.subTotalPrice.html = html
}
