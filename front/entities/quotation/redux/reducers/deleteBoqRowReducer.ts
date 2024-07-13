import type { PayloadAction } from '@reduxjs/toolkit'
import { type Quotation } from '../../types'
import { getBoqBlockFromState } from '../getters/getBoqBlockFromState'

export const deleteBoqRowReducer = (
  state: Quotation,
  action: PayloadAction<{
    itemIndex: number
    rowIndex: number
  }>,
): Quotation => {
  const { itemIndex, rowIndex } = action.payload
  const boqBlock = getBoqBlockFromState({ itemIndex, state })
  if (boqBlock === undefined) return state
  const boqRowsWithoutDeletedRow = boqBlock.boq.rows.toSpliced(rowIndex, 1)
  boqBlock.boq.rows = boqRowsWithoutDeletedRow
  return state
}
