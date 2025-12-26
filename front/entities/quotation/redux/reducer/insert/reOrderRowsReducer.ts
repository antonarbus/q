import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../../types/Quotation'
import type { RowBlock } from '../../../types/BlockItem'
import { getBoqBlockFromState } from '../../getter/getBoqBlockFromState'

export const reOrderRowsReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    reOrderedRows: RowBlock[]
  }>,
): Quotation | undefined => {
  const { reOrderedRows, blockIndex } = action.payload
  const boqBlock = getBoqBlockFromState({ blockIndex, state })

  if (boqBlock === undefined) {
    return state
  }

  boqBlock.boq.rows = reOrderedRows

  return undefined
}
