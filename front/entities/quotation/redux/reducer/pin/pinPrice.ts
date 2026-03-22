import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'
import { getCellFromStateByIndex } from '../../getter/getCellFromStateByIndex'

export const pinPrice = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
  }>,
): void => {
  const priceCell = getCellFromStateByIndex({
    blockIndex: action.payload.blockIndex,
    rowIndex: action.payload.rowIndex,
    cellKey: 'price',
    state,
  })

  if (priceCell === undefined) {
    return
  }

  priceCell.pin.isPinned = priceCell.pin.isPinned === false
}
