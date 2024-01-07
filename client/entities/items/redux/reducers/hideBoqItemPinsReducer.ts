import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'
import { getBoqRows } from '../state_getters/getBoqRows'

export const hideBoqItemPinsReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
}>): void => {
  const { itemIndex } = action.payload
  const boqRowRows = getBoqRows({ itemIndex, state })
  if (boqRowRows === undefined) return

  boqRowRows.forEach((boqRow) => {
    boqRow.itemPrice.pin.isShown = false
    boqRow.qty.pin.isShown = false
  })
}
