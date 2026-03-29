import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'
import { getBoqBlockFromStateByIndex } from '../../getter/getBoqBlockFromStateByIndex'

export const deleteRow = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
  }>,
): Quotation => {
  const boqBlock = getBoqBlockFromStateByIndex({
    blockIndex: action.payload.blockIndex,
    state,
  })

  if (boqBlock === undefined) {
    return state
  }

  const rowsWithoutDeletedRow = boqBlock.boq.rows.toSpliced(action.payload.rowIndex, 1)

  boqBlock.boq.rows = rowsWithoutDeletedRow

  return state
}
