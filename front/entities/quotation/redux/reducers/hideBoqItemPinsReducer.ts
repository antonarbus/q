import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../types'
import { getBoqRowsFromState } from '../getters/getBoqRowsFromState'

export const hideBoqItemPinsReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
  }>,
): void => {
  const { blockIndex } = action.payload
  const boqRowRows = getBoqRowsFromState({ blockIndex, state })

  if (boqRowRows === undefined) {
    return
  }

  boqRowRows.forEach((boqRow) => {
    boqRow.itemPrice.pin.isShown = false
    boqRow.qty.pin.isShown = false
  })
}
