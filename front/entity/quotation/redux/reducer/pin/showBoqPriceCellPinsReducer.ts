import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'
import { getRowsFromState } from '../../getter/getRowsFromState'

export const showBoqPriceCellPinsReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
  }>,
): void => {
  const rows = getRowsFromState({
    blockIndex: action.payload.blockIndex,
    state,
  })

  if (rows === undefined) {
    return
  }

  rows.forEach((row) => {
    row.price.pin.isShown = true
  })
}
