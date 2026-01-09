import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'

export const updatePriceTitleReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    html: string
  }>,
): void => {
  const block = state.blocks[action.payload.blockIndex]

  if (block?.type !== 'price') {
    return
  }

  block.title.html = action.payload.html
}
