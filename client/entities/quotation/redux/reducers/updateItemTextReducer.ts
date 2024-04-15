import type { PayloadAction } from '@reduxjs/toolkit'
import { itemKey } from '../../consts/itemKey'
import { type Quotation } from '../../types'

export const updateItemTextReducer = (state: Quotation, action: PayloadAction<{
  itemIndex: number
  html: string
}>): void => {
  const { itemIndex, html } = action.payload
  const item = state.items[itemIndex]

  if (!item) return
  if (item.type !== itemKey.text) return

  if (html !== undefined) {
    item.text.html = html
  }
}
