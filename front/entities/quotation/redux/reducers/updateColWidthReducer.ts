import type { PayloadAction } from '@reduxjs/toolkit'
import { itemKey } from '../../consts/itemKey'
import type { BoqColumnKey, Quotation } from '../../types'

export const updateColWidthReducer = (
  state: Quotation,
  action: PayloadAction<{
    itemIndex: number
    width: number
    boqColumnKey: BoqColumnKey
  }>,
): void => {
  const { itemIndex, width, boqColumnKey } = action.payload
  const block = state.blocks[itemIndex]

  if (!block) return
  if (block.type !== itemKey.boq) return

  block.boq.column[boqColumnKey].width = width
}
