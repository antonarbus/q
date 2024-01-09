import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'
import { getBoqItemFromStore } from '../getters/getBoqItemFromStore'

export const updateSubTotalPriceReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  value: number
  html: string
}>): void => {
  const { itemIndex, html, value } = action.payload
  const boqItem = getBoqItemFromStore({ itemIndex, state })
  if (boqItem === undefined) return
  boqItem.boq.header.subTotalPrice.value = value
  boqItem.boq.header.subTotalPrice.html = html
}
