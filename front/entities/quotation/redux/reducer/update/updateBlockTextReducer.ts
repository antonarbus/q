import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../../const/itemType'
import type { Quotation } from '@back/entities/quotation/quotationSchema'

export const updateBlockTextReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    html: string
  }>,
): void => {
  const block = state.blocks[action.payload.blockIndex]

  if (block === undefined) {
    return
  }

  if (block.type !== itemType.text) {
    return
  }

  block.text.html = action.payload.html
}
