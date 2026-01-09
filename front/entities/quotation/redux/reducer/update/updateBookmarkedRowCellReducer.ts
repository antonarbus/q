import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import type { CellKey, Quotation } from '@back/entities/quotation/schema'
import type { PayloadAction } from '@reduxjs/toolkit'

export const updateBookmarkedRowCellReducer = (
  state: Quotation,
  action: PayloadAction<{
    html: string
    value: number
    cellKey: CellKey
  }>,
): void => {
  const block = state.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block === undefined) {
    return
  }

  if (block.type === 'row') {
    const row = block

    row[action.payload.cellKey].html = action.payload.html
    row[action.payload.cellKey].value = action.payload.value
  }
}
