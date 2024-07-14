import type { PayloadAction } from '@reduxjs/toolkit'
import { itemKey } from '../../consts/itemKey'
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
  if (block.type !== itemKey.text) return

  if (html !== undefined) {
    block.text.html = html
  }
}
