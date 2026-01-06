import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entities/quotation/schemas'
import { getCellFromState } from '../../getter/getCellFromState'

export const pinQtyReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
  }>,
): void => {
  const itemPriceCell = getCellFromState({
    blockIndex: action.payload.blockIndex,
    rowIndex: action.payload.rowIndex,
    cellKey: 'itemPrice',
    state,
  })

  if (itemPriceCell === undefined) {
    return
  }

  itemPriceCell.pin.isPinned = false

  const qtyCell = getCellFromState({
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
