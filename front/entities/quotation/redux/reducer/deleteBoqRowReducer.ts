import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../type'
import { getBoqBlockFromState } from '../getter/getBoqBlockFromState'

export const deleteBoqRowReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
  }>,
): Quotation => {
  const { blockIndex, rowIndex } = action.payload
  const boqBlock = getBoqBlockFromState({ blockIndex, state })

  if (boqBlock === undefined) {
    return state
  }

  const boqRowsWithoutDeletedRow = boqBlock.boq.rows.toSpliced(rowIndex, 1)
  boqBlock.boq.rows = boqRowsWithoutDeletedRow

  return state
}
