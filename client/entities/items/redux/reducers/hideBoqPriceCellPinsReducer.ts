import type { PayloadAction } from '@reduxjs/toolkit'
import { type Item } from '../../types'
import { getBoqRowsFromState } from '../getters/getBoqRowsFromState'

export const hideBoqPriceCellPinsReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
}>): void => {
  const { itemIndex } = action.payload
  const boqRows = getBoqRowsFromState({ itemIndex, state })
  if (boqRows === undefined) return
  boqRows.forEach(boqRow => {
    boqRow.price.pin.isShown = false
  })
}
