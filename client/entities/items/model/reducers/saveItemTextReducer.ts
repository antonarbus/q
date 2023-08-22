import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'

export const saveItemTextReducer = (state: ItemsState, action: PayloadAction<{
  index: number
  html?: string
  rowIndex?: number
}>): void => {
  const { index, html } = action.payload
  const item = state[index]
  if (!item) return
  if (item.type !== 'text') return
  if (html !== undefined) item.text.html = html
}