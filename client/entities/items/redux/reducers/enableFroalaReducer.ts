import type { PayloadAction } from '@reduxjs/toolkit'
import { type Item } from '@shared/types'

export const enableFroalaReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
}>): void => {
  const { itemIndex } = action.payload
  const item = state[itemIndex]
  if (item === undefined) return
  item.isFroala = true
}
