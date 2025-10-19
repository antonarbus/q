import type { CellKey } from '@entities/quotation/const/cellKey'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../type'
import { getBoqCellFromState } from '../getter/getBoqCellFromState'

export const hideCellPinReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
    cellKey: CellKey
  }>,
): void => {
  const { blockIndex, rowIndex, cellKey } = action.payload

  const cell = getBoqCellFromState({
    blockIndex,
    rowIndex,
    cellKey,
    state,
  })

  if (cell === undefined) {
    return
  }

  cell.pin.isShown = false
}
