import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../types'

export const updateBlockWidthReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    width: number
  }>,
): void => {
  const { blockIndex, width } = action.payload
  const block = state.blocks[blockIndex]

  if (!block) {
    return
  }

  block.width = width
}
