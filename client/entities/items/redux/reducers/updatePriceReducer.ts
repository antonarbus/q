import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../consts/itemType'
import { type Item } from '../../types'

export const updatePriceReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
  html: string
  value: number
}>): void => {
  const { itemIndex, html, value } = action.payload
  const priceItem = state[itemIndex]
  if (!priceItem) return
  if (priceItem.type !== itemType.price) return

  if (html !== undefined) {
    priceItem.price.html = html
    priceItem.price.value = value
  }
}
