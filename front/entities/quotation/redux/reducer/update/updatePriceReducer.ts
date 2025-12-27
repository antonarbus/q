import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../../const/itemType'
import type { Quotation } from '@root/shared/types/Quotation'

export const updatePriceReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    html: string
    value: number
  }>,
): void => {
  const block = state.blocks[action.payload.blockIndex]

  if (block?.type !== itemType.price) {
    return
  }

  block.price.html = action.payload.html
  block.price.value = action.payload.value
}
