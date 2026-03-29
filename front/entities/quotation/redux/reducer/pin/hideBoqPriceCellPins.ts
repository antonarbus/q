import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'
import { getRowsFromStateByIndex } from '../../getter/getRowsFromStateByIndex'

export const hideBoqPriceCellPins = (
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

  for (const row of rows) {
    row.price.pin.isShown = false
  }
}
