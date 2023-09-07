import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'

export const removeItemMsgReducer = (state: ItemsState, action: PayloadAction<{ itemIndex: number }>): void => {
  const { itemIndex } = action.payload
  const item = state[itemIndex]
  if (!item) return
  item.msg = ''
}
