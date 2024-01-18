import type { PayloadAction } from '@reduxjs/toolkit'
import { type Item } from '@shared/types'
import { getBoqRowsFromStore } from '../getters/getBoqRowsFromStore'

export const hideBoqItemPinsReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
}>): void => {
  const { itemIndex } = action.payload
  const boqRowRows = getBoqRowsFromStore({ itemIndex, state })
  if (boqRowRows === undefined) return

  boqRowRows.forEach((boqRow) => {
    boqRow.itemPrice.pin.isShown = false
    boqRow.qty.pin.isShown = false
  })
}
