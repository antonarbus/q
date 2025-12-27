import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@root/shared/types/Quotation'

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
