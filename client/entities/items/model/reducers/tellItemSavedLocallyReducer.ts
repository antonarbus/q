import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'

export const tellItemSavedLocallyReducer = (state: ItemsState, action: PayloadAction<{ index: number }>): void => {
  const { index } = action.payload
  const item = state[index]
  if (!item) return
  item.msg = 'saved locally'
}