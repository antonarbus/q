import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoqRow, Quotation } from '../../types'
import { getBoqBlockFromState } from '../getters/getBoqBlockFromState'

export const reOrderBoqRowsReducer = (
  state: Quotation,
  action: PayloadAction<{
    itemIndex: number
    reOrderedBoqRows: BoqRow[]
  }>,
): Quotation | undefined => {
  const { reOrderedBoqRows, itemIndex } = action.payload
  const boqBlock = getBoqBlockFromState({ itemIndex, state })
  if (boqBlock === undefined) return state
  boqBlock.boq.rows = reOrderedBoqRows
}
