import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entities/quotation/quotationSchema'

export const disableFroalaReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
  }>,
): void => {
  const block = state.blocks[action.payload.blockIndex]

  if (block === undefined) {
    return
  }

  block.isFroala = false
}
