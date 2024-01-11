import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'
import { getBoqRowsFromStore } from '../getters/getBoqRowsFromStore'

export const hideBoqPriceCellPinsReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
}>): void => {
  const { itemIndex } = action.payload
  const boqRows = getBoqRowsFromStore({ itemIndex, state })
  if (boqRows === undefined) return
  boqRows.forEach(boqRow => {
    boqRow.price.pin.isShown = false
  })
}
