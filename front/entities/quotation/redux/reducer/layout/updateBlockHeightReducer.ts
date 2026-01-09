import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entities/quotation/schema'

export const updateBlockHeightReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    height: number
  }>,
): void => {
  const block = state.blocks[action.payload.blockIndex]

  if (block === undefined) {
    return
  }

  block.height = action.payload.height
}
