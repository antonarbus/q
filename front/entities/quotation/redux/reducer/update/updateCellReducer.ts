import type { CellKey } from '@entities/quotation/const/cellKey'
import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../../const/itemType'
import type { Quotation } from '../../../types/Quotation'

export const updateCellReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
    html: string
    value: number
    cellKey: CellKey
  }>,
): void => {
  const { blockIndex, rowIndex, html, value, cellKey } = action.payload

  const block = state.blocks[blockIndex]

  if (block?.type !== itemType.boq) {
    return
  }

  const row = block.boq.rows[rowIndex]

  if (row === undefined) {
    return
  }

  row[cellKey].html = html
  row[cellKey].value = value
}
