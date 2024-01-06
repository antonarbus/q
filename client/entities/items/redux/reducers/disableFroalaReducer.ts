import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'

export const disableFroalaReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
}>): void => {
  const { itemIndex } = action.payload
  const item = state[itemIndex]
  if (item === undefined) return
  item.isFroala = false
}
