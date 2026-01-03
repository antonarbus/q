import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entities/quotation/quotationSchema'

export const updateBlockWidthReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    width: number
  }>,
): void => {
  const block = state.blocks[action.payload.blockIndex]

  if (block === undefined) {
    return
  }

  block.width = action.payload.width
}
