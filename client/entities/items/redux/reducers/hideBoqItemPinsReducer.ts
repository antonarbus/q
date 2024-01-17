import type { PayloadAction } from '@reduxjs/toolkit'
import { getBoqRowsFromStore } from '../getters/getBoqRowsFromStore'
import type { ItemsState } from '../itemsSlice'

export const hideBoqItemPinsReducer = (state: ItemsState, action: PayloadAction<{
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
