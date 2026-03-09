import type { CellKey, Quotation } from '@back/entity/quotation/schema'
import type { PayloadAction } from '@reduxjs/toolkit'

export const updateCell = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    rowIndex: number
    html: string
    value: number
    cellKey: CellKey
  }>,
): void => {
  const block = state.blocks[action.payload.blockIndex]

  if (block?.type !== 'boq') {
    return
  }

  const row = block.boq.rows[action.payload.rowIndex]

  if (row === undefined) {
    return
  }

  row[action.payload.cellKey].html = action.payload.html
  row[action.payload.cellKey].value = action.payload.value
}
