import type { PayloadAction } from '@reduxjs/toolkit'
import { itemKey } from '../../consts/itemKey'
import { type Quotation } from '../../types'

export const updatePriceReducer = (
  state: Quotation,
  action: PayloadAction<{
    itemIndex: number
    html: string
    value: number
  }>,
): void => {
  const { itemIndex, html, value } = action.payload
  const block = state.blocks[itemIndex]

  if (block?.type !== itemKey.price) return

  if (html !== undefined) {
    block.price.html = html
    block.price.value = value
  }
}
