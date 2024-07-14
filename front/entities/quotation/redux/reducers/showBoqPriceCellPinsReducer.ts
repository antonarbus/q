import type { PayloadAction } from '@reduxjs/toolkit'
import { type Quotation } from '../../types'
import { getBoqRowsFromState } from '../getters/getBoqRowsFromState'

export const showBoqPriceCellPinsReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
  }>,
): void => {
  const { blockIndex } = action.payload
  const boqRows = getBoqRowsFromState({ blockIndex, state })
  if (boqRows === undefined) return
  boqRows.forEach((boqRow) => {
    boqRow.price.pin.isShown = true
  })
}
