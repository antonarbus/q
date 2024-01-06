import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'

export const updateItemWidthReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  width: number
}>): void => {
  const { itemIndex, width } = action.payload
  const item = state[itemIndex]
  if (!item) return
  item.width = width
}
