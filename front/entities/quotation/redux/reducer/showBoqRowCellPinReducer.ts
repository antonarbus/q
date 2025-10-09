import type { BoqRowCellKey } from '@entities/quotation/const/boqRowCellKey'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../type'
import { getBoqCellFromState } from '../getter/getBoqCellFromState'

export const showBoqRowCellPinReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
    boqRowCellKey: BoqRowCellKey
  }>,
): void => {
  const { blockIndex, rowIndex, boqRowCellKey } = action.payload

  const boqRowCell = getBoqCellFromState({
    blockIndex,
    rowIndex,
    boqRowCellKey,
    state,
  })

  if (boqRowCell === undefined) {
    return
  }

  boqRowCell.pin.isShown = true
}
