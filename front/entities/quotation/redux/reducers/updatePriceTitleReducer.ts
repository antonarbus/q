import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../consts/itemType'
import { type Quotation } from '../../types'

export const updatePriceTitleReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    html: string
  }>,
): void => {
  const { blockIndex, html } = action.payload
  const block = state.blocks[blockIndex]

  if (block?.type !== itemType.price) return

  if (html !== undefined) {
    block.title.html = html
  }
}
