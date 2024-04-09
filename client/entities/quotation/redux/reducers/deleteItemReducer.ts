import type { PayloadAction } from '@reduxjs/toolkit'
import { type Item } from '../../types'

export const deleteItemReducer = (state: Item[], action: PayloadAction<{ itemId: string }>): Item[] => {
  const { itemId } = action.payload
  const itemsWithoutDeletedOne = state.filter(item => item.id !== itemId)
  return itemsWithoutDeletedOne
}
