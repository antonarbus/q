import type { PayloadAction } from '@reduxjs/toolkit'
import { type Item } from '../../types'

export const disableFroalaReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
}>): void => {
  const { itemIndex } = action.payload
  const item = state[itemIndex]
  if (item === undefined) return
  item.isFroala = false
}
