import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../consts/itemType'
import type { ColumnKey, Quotation } from '../../types'

export const updateBoqColumnNameTextReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    html: string
    boqColumnKey: ColumnKey
  }>,
): void => {
  const { blockIndex, html, boqColumnKey } = action.payload
  const block = state.blocks[blockIndex]

  if (!block) return
  if (block.type !== itemType.boq) return

  block.boq.column[boqColumnKey].html = html
}
