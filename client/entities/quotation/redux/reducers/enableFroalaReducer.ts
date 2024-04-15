import type { PayloadAction } from '@reduxjs/toolkit'
import { type Quotation } from '../../types'

export const enableFroalaReducer = (state: Quotation, action: PayloadAction<{
  itemIndex: number
}>): void => {
  const { itemIndex } = action.payload
  const item = state.items[itemIndex]
  if (item === undefined) return
  item.isFroala = true
}
