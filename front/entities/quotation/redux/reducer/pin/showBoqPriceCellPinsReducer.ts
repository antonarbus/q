import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../../type'
import { getRowsFromState } from '../../getter/getRowsFromState'

export const showBoqPriceCellPinsReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
  }>,
): void => {
  const { blockIndex } = action.payload
  const rows = getRowsFromState({ blockIndex, state })

  if (rows === undefined) {
    return
  }

  rows.forEach((row) => {
    row.price.pin.isShown = true
  })
}
