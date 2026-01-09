import type { CellKey, Quotation } from '@back/entity/quotation/schema'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getCellFromState } from '../../getter/getCellFromState'

export const hideCellPinReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
    cellKey: CellKey
  }>,
): void => {
  const cell = getCellFromState({
    blockIndex: action.payload.blockIndex,
    rowIndex: action.payload.rowIndex,
    cellKey: action.payload.cellKey,
    state,
  })

  if (cell === undefined) {
    return
  }

  cell.pin.isShown = false
}
