import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'

export const disableSubTotalPriceFroalaReducer = (state: ItemsState, action: PayloadAction<{ itemIndex: number }>): void => {
  const { itemIndex } = action.payload
  const item = state[itemIndex]
  if (item?.type !== 'boq') return
  item.boq.header.price.isFroala = false
}
