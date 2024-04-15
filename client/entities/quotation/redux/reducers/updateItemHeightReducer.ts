import type { PayloadAction } from '@reduxjs/toolkit'
import { type Quotation } from '../../types'

export const updateItemHeightReducer = (state: Quotation, action: PayloadAction<{
  itemIndex: number
  height: number
}>): void => {
  const { itemIndex, height } = action.payload
  const item = state.items[itemIndex]

  if (!item) return

  item.height = height
}
