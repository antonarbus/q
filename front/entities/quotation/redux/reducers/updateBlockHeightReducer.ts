import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../types'

export const updateBlockHeightReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    height: number
  }>,
): void => {
  const { blockIndex, height } = action.payload
  const block = state.blocks[blockIndex]

  if (!block) return

  block.height = height
}
