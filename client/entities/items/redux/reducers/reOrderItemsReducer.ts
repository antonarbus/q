import type { PayloadAction } from '@reduxjs/toolkit'
import type { Item } from '../../types'

export const reOrderItemsReducer = (state: Item[], action: PayloadAction<{ reOrderedItems: Item[] }>): Item[] => {
  const { reOrderedItems } = action.payload
  return reOrderedItems
}
