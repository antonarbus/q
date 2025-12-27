import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import type { CellKey } from '@entities/quotation/const/cellKey'
import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../../const/itemType'
import type { Quotation } from '@root/shared/types/Quotation'

export const updateBookmarkedRowCellReducer = (
  state: Quotation,
  action: PayloadAction<{
    html: string
    value: number
    cellKey: CellKey
  }>,
): void => {
  const { html, value, cellKey } = action.payload

  const block = state.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block === undefined) {
    return
  }

  if (block.type === itemType.row) {
    const row = block

    row[cellKey].html = html
    row[cellKey].value = value
  }
}
