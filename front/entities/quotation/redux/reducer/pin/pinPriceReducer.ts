import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entities/quotation/quotationSchema'
import { getCellFromState } from '../../getter/getCellFromState'

export const pinPriceReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
  }>,
): void => {
  const priceCell = getCellFromState({
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
