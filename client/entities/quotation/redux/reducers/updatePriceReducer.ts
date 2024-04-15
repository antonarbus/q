import type { PayloadAction } from '@reduxjs/toolkit'
import { itemKey } from '../../consts/itemKey'
import { type Quotation } from '../../types'

export const updatePriceReducer = (state: Quotation, action: PayloadAction<{
  itemIndex: number
  html: string
  value: number
}>): void => {
  const { itemIndex, html, value } = action.payload
  const priceItem = state.items[itemIndex]

  if (!priceItem) return
  if (priceItem.type !== itemKey.price) return

  if (html !== undefined) {
    priceItem.price.html = html
    priceItem.price.value = value
  }
}
