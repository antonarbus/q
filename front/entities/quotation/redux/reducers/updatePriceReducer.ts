import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../consts/itemType'
import type { Quotation } from '../../types'

export const updatePriceReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    html: string
    value: number
  }>,
): void => {
  const { blockIndex, html, value } = action.payload
  const block = state.blocks[blockIndex]

  if (block?.type !== itemType.price) {
    return
  }

  block.price.html = html
  block.price.value = value
}
