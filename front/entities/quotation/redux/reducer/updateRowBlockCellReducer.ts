import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import type { BoqRowCellKey } from '@entities/quotation/const/boqRowCellKey'
import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../const/itemType'
import type { Quotation } from '../../type'

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

  if (block === undefined) {
    return
  }

  if (block.type === itemType.row) {
    const row = block

    row[boqRowCellKey].html = html
    row[boqRowCellKey].value = value
  }
}
