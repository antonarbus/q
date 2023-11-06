import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'

export const saveItemTextReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  html?: string
  rowIndex?: number
}>): void => {
  const { itemIndex, html } = action.payload
  const item = state[itemIndex]
  if (!item) return
  if (item.type !== 'text') return
  if (html !== undefined) item.text.html = html
}
