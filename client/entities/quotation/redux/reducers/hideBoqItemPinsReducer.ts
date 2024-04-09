import type { PayloadAction } from '@reduxjs/toolkit'
import { type Item } from '../../types'
import { getBoqRowsFromState } from '../getters/getBoqRowsFromState'

export const hideBoqItemPinsReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
}>): void => {
  const { itemIndex } = action.payload
  const boqRowRows = getBoqRowsFromState({ itemIndex, state })
  if (boqRowRows === undefined) return

  boqRowRows.forEach((boqRow) => {
    boqRow.itemPrice.pin.isShown = false
    boqRow.qty.pin.isShown = false
  })
}
