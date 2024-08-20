import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../consts/itemType'
import type { RowCellKey, Quotation } from '../../types'

export const updateBoqCellReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
    html: string
    value: number
    boqRowCellKey: RowCellKey
  }>,
): void => {
  const { blockIndex, rowIndex, html, value, boqRowCellKey } = action.payload

  const block = state.blocks[blockIndex]

  if (block?.type !== itemType.boq) return

  const row = block.boq.rows[rowIndex]

  if (row === undefined) return

  row[boqRowCellKey].html = html
  row[boqRowCellKey].value = value
}
