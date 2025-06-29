import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../const/itemType'
import type { Quotation } from '../../type'
import type { BoqColumnKey } from '@entities/quotation/const/boqColumnKey'

export const updateColWidthReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    width: number
    boqColumnKey: BoqColumnKey
  }>,
): void => {
  const { blockIndex, width, boqColumnKey } = action.payload
  const block = state.blocks[blockIndex]

  if (block === undefined) {
    return
  }

  if (block.type !== itemType.boq) {
    return
  }

  block.boq.column[boqColumnKey].width = width
}
