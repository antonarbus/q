import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'
import type { BoqHeaderKey } from 'client/shared/types'

export const saveBoqHeaderTextReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  html?: string
  rowIndex?: number
  boqHeaderKey: BoqHeaderKey
}>): void => {
  const { itemIndex, html, boqHeaderKey } = action.payload
  const item = state[itemIndex]
  if (!item) return
  if (item.type !== 'boq') return
  if (html === undefined) return
  item.boq.header[boqHeaderKey].html = html
}
