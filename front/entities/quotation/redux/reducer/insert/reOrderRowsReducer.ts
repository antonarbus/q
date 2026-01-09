import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation, RowBlock } from '@back/entity/quotation/schema'
import { getBoqBlockFromState } from '../../getter/getBoqBlockFromState'

export const reOrderRowsReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    reOrderedRows: RowBlock[]
  }>,
): Quotation | undefined => {
  const boqBlock = getBoqBlockFromState({
    blockIndex: action.payload.blockIndex,
    state,
  })

  if (boqBlock === undefined) {
    return state
  }

  boqBlock.boq.rows = action.payload.reOrderedRows

  return undefined
}
