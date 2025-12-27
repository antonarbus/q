import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@root/shared/types/Quotation'
import { getRowsFromState } from '../../getter/getRowsFromState'

export const hideBoqItemPinsReducer = (
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
    row.itemPrice.pin.isShown = false
    row.qty.pin.isShown = false
  })
}
