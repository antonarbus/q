import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entities/quotation/schemas'
import { getRowsFromState } from '../../getter/getRowsFromState'

export const hideBoqItemPinsReducer = (
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
    row.itemPrice.pin.isShown = false
    row.qty.pin.isShown = false
  })
}
