import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoqRow, Quotation } from '../../types'
import { getBoqBlockFromState } from '../getters/getBoqBlockFromState'

export const reOrderBoqRowsReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    reOrderedBoqRows: BoqRow[]
  }>,
): Quotation | undefined => {
  const { reOrderedBoqRows, blockIndex } = action.payload
  const boqBlock = getBoqBlockFromState({ blockIndex, state })
  if (boqBlock === undefined) return state
  boqBlock.boq.rows = reOrderedBoqRows
}
