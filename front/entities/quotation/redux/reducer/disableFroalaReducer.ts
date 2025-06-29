import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../type'

export const disableFroalaReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
  }>,
): void => {
  const { blockIndex } = action.payload
  const block = state.blocks[blockIndex]

  if (block === undefined) {
    return
  }

  block.isFroala = false
}
