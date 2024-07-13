import type { PayloadAction } from '@reduxjs/toolkit'
import { itemKey } from '../../consts/itemKey'
import { type Quotation } from '../../types'

export const updateBlockTextReducer = (
  state: Quotation,
  action: PayloadAction<{
    itemIndex: number
    html: string
  }>,
): void => {
  const { itemIndex, html } = action.payload
  const block = state.blocks[itemIndex]

  if (!block) return
  if (block.type !== itemKey.text) return

  if (html !== undefined) {
    block.text.html = html
  }
}
