import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../consts/itemType'
import { type Item } from '../../types'

export const updateItemTextReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
  html: string
}>): void => {
  const { itemIndex, html } = action.payload
  const item = state[itemIndex]
  if (!item) return
  if (item.type !== itemType.text) return

  if (html !== undefined) {
    item.text.html = html
  }
}
