import type { PayloadAction } from '@reduxjs/toolkit'
import { type Item } from '../../types'

export const updateItemHeightReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
  height: number
}>): void => {
  const { itemIndex, height } = action.payload
  const item = state[itemIndex]
  if (!item) return
  item.height = height
}
