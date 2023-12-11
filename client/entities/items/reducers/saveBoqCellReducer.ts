import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'
import type { BoqColumnKey } from 'client/shared/types'

export const saveBoqCellReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  rowIndex: number
  html: string
  value: number
  boqColumnKey: BoqColumnKey
}>): void => {
  const { itemIndex, rowIndex, html, value, boqColumnKey } = action.payload
  const item = state[itemIndex]
  if (!item) return
  if (item.type !== 'boq') return

  const row = item.boq.rows[rowIndex]
  if (row === undefined) return

  row[boqColumnKey].html = html
  row[boqColumnKey].value = value
}
