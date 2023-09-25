import type { PayloadAction } from '@reduxjs/toolkit'
import type { Item } from 'client/shared/types'
import type { ItemsState } from '../itemsSlice'

export const reOrderItemsReducer = (state: ItemsState, action: PayloadAction<{ reOrderedItems: Item[] }>): ItemsState => {
  const { reOrderedItems } = action.payload
  return reOrderedItems
}
