import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation, RowBlock } from '@back/entity/quotation/schema'
import { getBoqBlockFromStateByIndex } from '../../getter/getBoqBlockFromStateByIndex'

export const reOrderRows = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    reOrderedRows: RowBlock[]
  }>,
): Quotation | undefined => {
  const boqBlock = getBoqBlockFromStateByIndex({
    blockIndex: action.payload.blockIndex,
    state,
  })

  if (boqBlock === undefined) {
    return state
  }

  boqBlock.boq.rows = action.payload.reOrderedRows

  return undefined
}
