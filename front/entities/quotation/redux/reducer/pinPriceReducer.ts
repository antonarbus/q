import type { PayloadAction } from '@reduxjs/toolkit'
import { cellKey } from '../../const/cellKey'
import type { Quotation } from '../../type'
import { getCellFromState } from '../getter/getCellFromState'

export const pinPriceReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
  }>,
): void => {
  const { blockIndex, rowIndex } = action.payload

  const priceCell = getCellFromState({
    blockIndex,
    rowIndex,
    cellKey: cellKey.price,
    state,
  })

  if (priceCell === undefined) {
    return
  }

  priceCell.pin.isPinned = priceCell.pin.isPinned === false
}
