import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'

export const deleteItemReducer = (state: ItemsState, action: PayloadAction<{ itemId: string }>): ItemsState => {
  const { itemId } = action.payload
  const itemsWithoutDeletedOne = state.filter(item => item.id !== itemId)
  return itemsWithoutDeletedOne
}