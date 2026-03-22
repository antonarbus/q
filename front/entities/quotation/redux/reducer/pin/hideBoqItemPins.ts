import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'
import { getRowsFromStateByIndex } from '../../getter/getRowsFromStateByIndex'

export const hideBoqItemPins = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
  }>,
): void => {
  const rows = getRowsFromStateByIndex({
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
