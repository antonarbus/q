import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../type'
import { getRowsFromState } from '../getter/getRowsFromState'

export const hideBoqPriceCellPinsReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
  }>,
): void => {
  const { blockIndex } = action.payload
  const boqRows = getRowsFromState({ blockIndex, state })

  if (boqRows === undefined) {
    return
  }

  boqRows.forEach((row) => {
    row.price.pin.isShown = false
  })
}
