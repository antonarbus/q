import type { PayloadAction } from '@reduxjs/toolkit'
import { type Quotation } from '../../types'

export const updateItemWidthReducer = (state: Quotation, action: PayloadAction<{
  itemIndex: number
  width: number
}>): void => {
  const { itemIndex, width } = action.payload
  const item = state.items[itemIndex]

  if (!item) return

  item.width = width
}
