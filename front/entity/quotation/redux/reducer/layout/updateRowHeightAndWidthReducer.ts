import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'
import { getRowFromState } from '../../getter/getRowFromState'

export const updateRowHeightAndWidthReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
    height: number
    width: number
  }>,
): void => {
  const row = getRowFromState({
    blockIndex: action.payload.blockIndex,
    rowIndex: action.payload.rowIndex,
    state,
  })

  if (row === undefined) {
    return
  }

  row.height = action.payload.height
  row.width = action.payload.width
}
