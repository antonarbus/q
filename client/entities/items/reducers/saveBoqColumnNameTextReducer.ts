import type { PayloadAction } from '@reduxjs/toolkit'
import type { ItemsState } from '../itemsSlice'
import type { BoqColumnKey } from 'client/shared/types'

export const saveBoqColumnNameTextReducer = (state: ItemsState, action: PayloadAction<{
  itemIndex: number
  html: string
  columnName: BoqColumnKey
}>): void => {
  const { itemIndex, html, columnName } = action.payload
  const item = state[itemIndex]
  if (!item) return
  if (item.type !== 'boq') return
  // if (html === undefined) return
  // item.boq.column.description.html = html
  item.boq.column[columnName].html = html
  // item.boq.header[headerElementName].html = html
}
