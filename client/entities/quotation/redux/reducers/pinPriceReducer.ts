import type { PayloadAction } from '@reduxjs/toolkit'
import { boqRowCellKey } from '../../consts/boqRowCellKey'
import { type Quotation } from '../../types'
import { getBoqCellFromState } from '../getters/getBoqCellFromState'

export const pinPriceReducer = (
  state: Quotation,
  action: PayloadAction<{
    itemIndex: number
    rowIndex: number
  }>,
): void => {
  const { itemIndex, rowIndex } = action.payload
  const priceCell = getBoqCellFromState({
    itemIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.price,
    state,
  })

  if (priceCell === undefined) return
  priceCell.pin.isPinned = !priceCell.pin.isPinned
}
