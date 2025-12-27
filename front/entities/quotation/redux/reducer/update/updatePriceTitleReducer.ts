import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../../const/itemType'
import type { Quotation } from '@root/shared/types/Quotation'

export const updatePriceTitleReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    html: string
  }>,
): void => {
  const block = state.blocks[action.payload.blockIndex]

  if (block?.type !== itemType.price) {
    return
  }

  block.title.html = action.payload.html
}
