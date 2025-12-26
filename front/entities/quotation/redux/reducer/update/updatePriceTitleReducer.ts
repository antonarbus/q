import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../../const/itemType'
import type { Quotation } from '../../../types/Quotation'

export const updatePriceTitleReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    html: string
  }>,
): void => {
  const { blockIndex, html } = action.payload
  const block = state.blocks[blockIndex]

  if (block?.type !== itemType.price) {
    return
  }

  block.title.html = html
}
