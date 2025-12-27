import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@root/shared/types/Quotation'
import type { RowBlock } from '@root/shared/types/BlockItem'
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
