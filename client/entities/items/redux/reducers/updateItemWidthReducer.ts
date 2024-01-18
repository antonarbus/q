import type { PayloadAction } from '@reduxjs/toolkit'
import { type Item } from '@shared/types'

export const updateItemWidthReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
  width: number
}>): void => {
  const { itemIndex, width } = action.payload
  const item = state[itemIndex]
  if (!item) return
  item.width = width
}
