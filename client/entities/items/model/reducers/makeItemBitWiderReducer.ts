import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'

// todo: not in use
export const makeItemBitWiderReducer = (state: ItemsState, action: PayloadAction<{ itemIndex: number }>): void => {
  const { itemIndex } = action.payload
  const item = state[itemIndex]
  if (!item) return
  const currentWidth = item.width
  item.width = currentWidth + 3
}
