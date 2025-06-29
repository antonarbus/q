import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../const/itemType'
import type { Quotation } from '../../type'

export const updateBlockTextReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    html: string
  }>,
): void => {
  const { blockIndex, html } = action.payload
  const block = state.blocks[blockIndex]

  if (block === undefined) {
    return
  }

  if (block.type !== itemType.text) {
    return
  }

  block.text.html = html
}
