import type { PayloadAction } from '@reduxjs/toolkit'
import { boqRowCellKey } from '../../const/boqRowCellKey'
import type { Quotation } from '../../type'
import { getBoqCellFromState } from '../getter/getBoqCellFromState'

export const pinPriceReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
  }>,
): void => {
  const { blockIndex, rowIndex } = action.payload

  const priceCell = getBoqCellFromState({
    blockIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.price,
    state,
  })

  if (priceCell === undefined) {
    return
  }

  priceCell.pin.isPinned = priceCell.pin.isPinned === false
}
