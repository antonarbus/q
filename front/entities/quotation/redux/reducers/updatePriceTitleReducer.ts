import type { PayloadAction } from '@reduxjs/toolkit'
import { itemKey } from '../../consts/itemKey'
import { type Quotation } from '../../types'

export const updatePriceTitleReducer = (
  state: Quotation,
  action: PayloadAction<{
    itemIndex: number
    html: string
  }>,
): void => {
  const { itemIndex, html } = action.payload
  const block = state.blocks[itemIndex]

  if (block?.type !== itemKey.price) return

  if (html !== undefined) {
    block.title.html = html
  }
}
