import type { PayloadAction } from '@reduxjs/toolkit'
import { itemKey } from '../../consts/itemKey'
import { type Item } from '../../types'

export const updatePriceTitleReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
  html: string
}>): void => {
  const { itemIndex, html } = action.payload
  const priceItem = state[itemIndex]
  if (!priceItem) return
  if (priceItem.type !== itemKey.price) return

  if (html !== undefined) {
    priceItem.title.html = html
  }
}
