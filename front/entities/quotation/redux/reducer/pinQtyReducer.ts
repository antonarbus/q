import type { PayloadAction } from '@reduxjs/toolkit'
import { cellKey } from '../../const/cellKey'
import type { Quotation } from '../../type'
import { getBoqCellFromState } from '../getter/getBoqCellFromState'

export const pinQtyReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
  }>,
): void => {
  const { blockIndex, rowIndex } = action.payload

  const itemPriceCell = getBoqCellFromState({
    blockIndex,
    rowIndex,
    cellKey: cellKey.itemPrice,
    state,
  })

  if (itemPriceCell === undefined) {
    return
  }

  itemPriceCell.pin.isPinned = false

  const qtyCell = getBoqCellFromState({
    blockIndex,
    rowIndex,
    cellKey: cellKey.qty,
    state,
  })

  if (qtyCell === undefined) {
    return
  }

  qtyCell.pin.isPinned = true
}
