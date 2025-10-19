import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../type'
import { getRowFromState } from '../getter/getRowFromState'

export const updateRowHeightAndWidthReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
    height: number
    width: number
  }>,
): void => {
  const { blockIndex, rowIndex, height, width } = action.payload
  const row = getRowFromState({ blockIndex, rowIndex, state })

  if (row === undefined) {
    return
  }

  row.height = height
  row.width = width
}
