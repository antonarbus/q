import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@root/shared/types/Quotation'
import { getBoqBlockFromState } from '../../getter/getBoqBlockFromState'

export const deleteRowReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
  }>,
): Quotation => {
  const boqBlock = getBoqBlockFromState({
    blockIndex: action.payload.blockIndex,
    state,
  })

  if (boqBlock === undefined) {
    return state
  }

  const rowsWithoutDeletedRow = boqBlock.boq.rows.toSpliced(
    action.payload.rowIndex,
    1,
  )

  boqBlock.boq.rows = rowsWithoutDeletedRow

  return state
}
