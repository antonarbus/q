import type { BoqRowCellKey } from '@entities/quotation/const/boqRowCellKey'
import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../const/itemType'
import type { Quotation } from '../../type'

export const updateBoqCellReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
    html: string
    value: number
    boqRowCellKey: BoqRowCellKey
  }>,
): void => {
  const { blockIndex, rowIndex, html, value, boqRowCellKey } = action.payload

  const block = state.blocks[blockIndex]

  if (block?.type !== itemType.boq) {
    return
  }

  const row = block.boq.rows[rowIndex]

  if (row === undefined) {
    return
  }

  row[boqRowCellKey].html = html
  row[boqRowCellKey].value = value
}
