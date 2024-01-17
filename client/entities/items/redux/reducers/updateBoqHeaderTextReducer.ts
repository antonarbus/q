import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoqHeaderKey } from '@shared/types'
import type { ItemsState } from '../itemsSlice'

export const updateBoqHeaderTextReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  html: string
  value: number
  boqHeaderKey: BoqHeaderKey
}>): void => {
  const { itemIndex, html, boqHeaderKey, value } = action.payload

  const item = state[itemIndex]
  if (!item) return
  if (item.type !== 'boq') return
  if (html === undefined) return

  item.boq.header[boqHeaderKey].html = html
  item.boq.header[boqHeaderKey].value = value
}
