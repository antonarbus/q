import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'

export const saveItemHeightReducer = (state: ItemsState, action: PayloadAction<{ index: number; height: number }>): void => {
  const { index, height } = action.payload
  const item = state[index]
  if (!item) return
  item.height = height
}