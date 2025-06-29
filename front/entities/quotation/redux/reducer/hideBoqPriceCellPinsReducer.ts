import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../type'
import { getBoqRowsFromState } from '../getter/getBoqRowsFromState'

export const hideBoqPriceCellPinsReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
  }>,
): void => {
  const { blockIndex } = action.payload
  const boqRows = getBoqRowsFromState({ blockIndex, state })

  if (boqRows === undefined) {
    return
  }

  boqRows.forEach((boqRow) => {
    boqRow.price.pin.isShown = false
  })
}
