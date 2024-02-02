import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../consts/itemType'
import type { BoqRowCellKey, Item } from '../../types'

export const updateBoqCellReducer = (state: Item[], action: PayloadAction<{
  itemIndex: number
  rowIndex: number
  html: string
  value: number
  boqRowCellKey: BoqRowCellKey
}>): void => {
  const { itemIndex, rowIndex, html, value, boqRowCellKey } = action.payload

  const item = state[itemIndex]
  if (!item) return
  if (item.type !== itemType.boq) return

  const row = item.boq.rows[rowIndex]
  if (row === undefined) return

  row[boqRowCellKey].html = html
  row[boqRowCellKey].value = value
}
