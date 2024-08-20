import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../consts/itemType'
import type { ColumnKey, Quotation } from '../../types'

export const updateColWidthReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    width: number
    boqColumnKey: ColumnKey
  }>,
): void => {
  const { blockIndex, width, boqColumnKey } = action.payload
  const block = state.blocks[blockIndex]

  if (!block) return
  if (block.type !== itemType.boq) return

  block.boq.column[boqColumnKey].width = width
}
