import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'

export const saveBoqHeaderPriceReducer = (state: ItemsState, action: PayloadAction<{
  index: number
  html?: string
  rowIndex?: number
}>): void => {
  const { index, html } = action.payload
  const item = state[index]
  if (!item) return
  if (item.type !== 'boq') return
  if (html === undefined) return
  item.boq.header.subtotal.price.html = html
}