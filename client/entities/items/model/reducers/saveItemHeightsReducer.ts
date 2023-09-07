import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'

export const saveItemHeightsReducer = (state: ItemsState, action: PayloadAction<{ itemIndex: number; height: number }[]>): void => {
  const indexesAndHeights = action.payload
  indexesAndHeights.forEach(({ itemIndex, height }) => {
    const item = state[itemIndex]
    if (!item) return
    item.height = height
  })
}
