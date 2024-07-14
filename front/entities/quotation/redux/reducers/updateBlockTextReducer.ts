import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../consts/itemType'
import { type Quotation } from '../../types'

export const updateBlockTextReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    html: string
  }>,
): void => {
  const { blockIndex, html } = action.payload
  const block = state.blocks[blockIndex]

  if (!block) return
  if (block.type !== itemType.text) return

  if (html !== undefined) {
    block.text.html = html
  }
}
