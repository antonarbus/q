import type { PayloadAction } from '@reduxjs/toolkit'
import type { RowCellKey, Quotation } from '../../types'
import { getBoqCellFromState } from '../getters/getBoqCellFromState'

export const hideBoqRowCellPinReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
    boqRowCellKey: RowCellKey
  }>,
): void => {
  const { blockIndex, rowIndex, boqRowCellKey } = action.payload
  const boqRowCell = getBoqCellFromState({
    blockIndex,
    rowIndex,
    boqRowCellKey,
    state,
  })
  if (boqRowCell === undefined) return
  boqRowCell.pin.isShown = false
}
