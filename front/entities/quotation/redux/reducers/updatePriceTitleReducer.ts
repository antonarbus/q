import type { PayloadAction } from '@reduxjs/toolkit'
import { itemKey } from '../../consts/itemKey'
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

  if (block?.type !== itemKey.price) return

  if (html !== undefined) {
    block.title.html = html
  }
}
