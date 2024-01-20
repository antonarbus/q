import type { PayloadAction } from '@reduxjs/toolkit'
import { type Item } from '../../types'

export const tellItemSavedLocallyReducer = (state: Item[], action: PayloadAction<{ itemIndex: number }>): void => {
  const { itemIndex } = action.payload
  const item = state[itemIndex]
  if (!item) return
  item.msg = 'saved locally'
}
