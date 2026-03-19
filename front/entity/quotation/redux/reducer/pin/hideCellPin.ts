import type { CellKey, Quotation } from '@back/entity/quotation/schema'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getCellFromStateByIndex } from '../../getter/getCellFromStateByIndex'

export const hideCellPin = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
    cellKey: CellKey
  }>,
): void => {
  const cell = getCellFromStateByIndex({
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
