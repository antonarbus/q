import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'

export const saveItemHeightsReducer = (state: ItemsState, action: PayloadAction<{ index: number; height: number }[]>): void => {
  const indexesAndHeights = action.payload
  indexesAndHeights.forEach(({ index, height }) => {
    const item = state[index]
    if (!item) return
    item.height = height
  })
}