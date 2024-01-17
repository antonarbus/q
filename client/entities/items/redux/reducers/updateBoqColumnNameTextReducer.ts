import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'
import type { BoqColumnKey } from '@shared/types'

export const updateBoqColumnNameTextReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  html: string
  boqColumnKey: BoqColumnKey
}>): void => {
  const { itemIndex, html, boqColumnKey } = action.payload
  const item = state[itemIndex]
  if (!item) return
  if (item.type !== 'boq') return
  item.boq.column[boqColumnKey].html = html
}
