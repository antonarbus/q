import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../consts/itemType'
import type { BoqRowCellKey, Quotation } from '../../types'

export const updateRowBlockCellReducer = (
  state: Quotation,
  action: PayloadAction<{
    html: string
    value: number
    boqRowCellKey: BoqRowCellKey
  }>,
): void => {
  const { html, value, boqRowCellKey } = action.payload

  const block = state.blocks[1000]

  if (!block) return

  if (block.type === itemType.row) {
    const row = block

    row[boqRowCellKey].html = html
    row[boqRowCellKey].value = value
  }
}
