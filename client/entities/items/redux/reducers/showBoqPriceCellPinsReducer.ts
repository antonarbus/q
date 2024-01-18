import type { PayloadAction } from '@reduxjs/toolkit'
import { type Item } from '@shared/types'
import { getBoqRowsFromStore } from '../getters/getBoqRowsFromStore'

export const showBoqPriceCellPinsReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
}>): void => {
  const { itemIndex } = action.payload
  const boqRows = getBoqRowsFromStore({ itemIndex, state })
  if (boqRows === undefined) return
  boqRows.forEach(boqRow => {
    boqRow.price.pin.isShown = true
  })
}
