import type { PayloadAction } from '@reduxjs/toolkit'
import { itemKey } from '../../consts/itemKey'
import { type Quotation } from '../../types'

export const updatePriceTitleReducer = (state: Quotation, action: PayloadAction<{
  itemIndex: number
  html: string
}>): void => {
  const { itemIndex, html } = action.payload
  const priceItem = state.items[itemIndex]

  if (!priceItem) return
  if (priceItem.type !== itemKey.price) return

  if (html !== undefined) {
    priceItem.title.html = html
  }
}
