import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoqColumnKey, Item } from '../../types'

export const updateBoqColumnNameTextReducer = (state: Item[], action: PayloadAction<{
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
