import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'

export const makeItemBitWiderReducer = (state: ItemsState, action: PayloadAction<{ index: number }>): void => {
  const { index } = action.payload
  const item = state[index]
  if (!item) return
  const currentWidth = item.width
  item.width = currentWidth + 5
}