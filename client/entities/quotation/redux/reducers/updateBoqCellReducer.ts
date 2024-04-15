import type { PayloadAction } from '@reduxjs/toolkit'
import { itemKey } from '../../consts/itemKey'
import type { BoqRowCellKey, Quotation } from '../../types'

export const updateBoqCellReducer = (state: Quotation, action: PayloadAction<{
  itemIndex: number
  rowIndex: number
  html: string
  value: number
  boqRowCellKey: BoqRowCellKey
}>): void => {
  const { itemIndex, rowIndex, html, value, boqRowCellKey } = action.payload

  const item = state.items[itemIndex]
  if (!item) return
  if (item.type !== itemKey.boq) return

  const row = item.boq.rows[rowIndex]
  if (row === undefined) return

  row[boqRowCellKey].html = html
  row[boqRowCellKey].value = value
}
