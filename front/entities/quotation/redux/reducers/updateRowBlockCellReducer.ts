import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../consts/itemType'
import type { Quotation } from '../../types'
import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/consts/bookmarkPosAtBlocks'
import type { BoqRowCellKey } from '@entities/quotation/consts/boqRowCellKey'

export const updateRowBlockCellReducer = (
  state: Quotation,
  action: PayloadAction<{
    html: string
    value: number
    boqRowCellKey: BoqRowCellKey
  }>,
): void => {
  const { html, value, boqRowCellKey } = action.payload

  const block = state.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (!block) {
    return
  }

  if (block.type === itemType.row) {
    const row = block

    row[boqRowCellKey].html = html
    row[boqRowCellKey].value = value
  }
}
