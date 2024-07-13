import type { PayloadAction } from '@reduxjs/toolkit'
import { itemKey } from '../../consts/itemKey'
import type { BoqRowCellKey, Quotation } from '../../types'

export const updateBoqCellReducer = (
  state: Quotation,
  action: PayloadAction<{
    itemIndex: number
    rowIndex: number
    html: string
    value: number
    boqRowCellKey: BoqRowCellKey
  }>,
): void => {
  const { itemIndex, rowIndex, html, value, boqRowCellKey } = action.payload

  const block = state.items[itemIndex]

  if (!block) return

  // todo: move item for edit modal into a different slice
  // special case for when the item is a row for item edit modal
  // if (block.type === itemKey.row) {
  //   const row = block
  //   row[boqRowCellKey].html = html
  //   row[boqRowCellKey].value = value
  //   return
  // }

  if (block.type === itemKey.boq) {
    const row = block.boq.rows[rowIndex]
    if (row === undefined) return

    row[boqRowCellKey].html = html
    row[boqRowCellKey].value = value
  }
}
