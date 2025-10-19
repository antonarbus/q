import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../type'
import { getRowsFromState } from '../getter/getRowsFromState'

export const hideBoqItemPinsReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
  }>,
): void => {
  const { blockIndex } = action.payload
  const boqRowRows = getRowsFromState({ blockIndex, state })

  if (boqRowRows === undefined) {
    return
  }

  boqRowRows.forEach((boqRow) => {
    boqRow.itemPrice.pin.isShown = false
    boqRow.qty.pin.isShown = false
  })
}
