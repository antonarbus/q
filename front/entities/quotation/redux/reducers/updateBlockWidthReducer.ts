import type { PayloadAction } from '@reduxjs/toolkit'
import { type Quotation } from '../../types'

export const updateBlockWidthReducer = (
  state: Quotation,
  action: PayloadAction<{
    itemIndex: number
    width: number
  }>,
): void => {
  const { itemIndex, width } = action.payload
  const block = state.blocks[itemIndex]

  if (!block) return

  block.width = width
}
