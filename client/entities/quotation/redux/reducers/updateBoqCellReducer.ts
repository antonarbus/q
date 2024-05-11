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

  // special case for when the item is a row for item edit modal
  if (item.type === itemKey.row) {
    const row = item
    row[boqRowCellKey].html = html
    row[boqRowCellKey].value = value
    return
  }

  if (item.type === itemKey.boq) {
    const row = item.boq.rows[rowIndex]
    if (row === undefined) return

    row[boqRowCellKey].html = html
    row[boqRowCellKey].value = value
  }
}
