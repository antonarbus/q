import type { PayloadAction } from '@reduxjs/toolkit'
import type { Item, Quotation } from '../../types'

export const reOrderItemsReducer = (state: Quotation, action: PayloadAction<{
  reOrderedItems: Item[]
}>): void => {
  const { reOrderedItems } = action.payload
  state.items = reOrderedItems
}
