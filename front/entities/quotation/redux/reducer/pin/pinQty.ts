import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'
import { getCellFromStateByIndex } from '../../getter/getCellFromStateByIndex'

export const pinQty = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
  }>,
): void => {
  const itemPriceCell = getCellFromStateByIndex({
    blockIndex: action.payload.blockIndex,
    rowIndex: action.payload.rowIndex,
    cellKey: 'itemPrice',
    state,
  })

  if (itemPriceCell === undefined) {
    return
  }

  itemPriceCell.pin.isPinned = false

  const qtyCell = getCellFromStateByIndex({
    blockIndex: action.payload.blockIndex,
    rowIndex: action.payload.rowIndex,
    cellKey: 'qty',
    state,
  })

  if (qtyCell === undefined) {
    return
  }

  qtyCell.pin.isPinned = true
}
