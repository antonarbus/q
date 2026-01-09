import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entities/quotation/schema'

export const updatePriceReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    html: string
    value: number
  }>,
): void => {
  const block = state.blocks[action.payload.blockIndex]

  if (block?.type !== 'price') {
    return
  }

  block.price.html = action.payload.html
  block.price.value = action.payload.value
}
