import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'

export const saveItemHeightReducer = (state: ItemsState, action: PayloadAction<{ itemIndex: number; height: number }>): void => {
  const { itemIndex, height } = action.payload
  const item = state[itemIndex]
  if (!item) return
  item.height = height
}
