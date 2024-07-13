import type { PayloadAction } from '@reduxjs/toolkit'
import { type Quotation } from '../../types'

export const updateBlockHeightReducer = (
  state: Quotation,
  action: PayloadAction<{
    itemIndex: number
    height: number
  }>,
): void => {
  const { itemIndex, height } = action.payload
  const block = state.blocks[itemIndex]

  if (!block) return

  block.height = height
}
