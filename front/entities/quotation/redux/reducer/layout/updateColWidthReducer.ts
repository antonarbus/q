import type { BoqColumnKey, Quotation } from '@back/entities/quotation/schema'
import type { PayloadAction } from '@reduxjs/toolkit'

export const updateColWidthReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    width: number
    boqColumnKey: BoqColumnKey
  }>,
): void => {
  const block = state.blocks[action.payload.blockIndex]

  if (block === undefined) {
    return
  }

  if (block.type !== 'boq') {
    return
  }

  block.boq.column[action.payload.boqColumnKey].width = action.payload.width
}
