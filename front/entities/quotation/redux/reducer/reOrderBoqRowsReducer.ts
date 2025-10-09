import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation, Row } from '../../type'
import { getBoqBlockFromState } from '../getter/getBoqBlockFromState'

export const reOrderBoqRowsReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    reOrderedBoqRows: Row[]
  }>,
): Quotation | undefined => {
  const { reOrderedBoqRows, blockIndex } = action.payload
  const boqBlock = getBoqBlockFromState({ blockIndex, state })

  if (boqBlock === undefined) {
    return state
  }

  boqBlock.boq.rows = reOrderedBoqRows

  return undefined
}
