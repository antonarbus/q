import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../consts/itemType'
import type { RowCellKey, Quotation } from '../../types'
import { bookmarkPosAtBlocks } from '@entities/quotation/consts/bookmarkPosAtBlocks'

export const updateRowBlockCellReducer = (
  state: Quotation,
  action: PayloadAction<{
    html: string
    value: number
    boqRowCellKey: RowCellKey
  }>,
): void => {
  const { html, value, boqRowCellKey } = action.payload

  const block = state.blocks[bookmarkPosAtBlocks]

  if (!block) return

  if (block.type === itemType.row) {
    const row = block

    row[boqRowCellKey].html = html
    row[boqRowCellKey].value = value
  }
}
