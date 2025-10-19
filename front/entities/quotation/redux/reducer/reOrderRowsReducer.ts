import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation, Row } from '../../type'
import { getBoqBlockFromState } from '../getter/getBoqBlockFromState'

export const reOrderRowsReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    reOrderedRows: Row[]
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
