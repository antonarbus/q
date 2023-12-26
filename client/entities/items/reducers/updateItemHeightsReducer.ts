import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../redux/itemsSlice'

export const updateItemHeightsReducer = (state: ItemsState, action: PayloadAction<Array<{
  itemIndex: number
  height: number
}>>): void => {
  const indexesAndHeights = action.payload
  indexesAndHeights.forEach(({ itemIndex, height }) => {
    const item = state[itemIndex]
    if (!item) return
    item.height = height
  })
}
