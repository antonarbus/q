import type { PayloadAction } from '@reduxjs/toolkit'
import { boqRowCellKey } from '../../consts/boqRowCellKey'
import type { Quotation } from '../../types'
import { getBoqCellFromState } from '../getters/getBoqCellFromState'

export const pinItemPriceReducer = (
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
    boqRowCellKey: boqRowCellKey.itemPrice,
    state,
  })

  if (itemPriceCell === undefined) {
    return
  }

  itemPriceCell.pin.isPinned = true

  const qtyCell = getBoqCellFromState({
    blockIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.qty,
    state,
  })

  if (qtyCell === undefined) {
    return
  }

  qtyCell.pin.isPinned = false
}
