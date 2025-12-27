import type { BoqColumnKey } from '@entities/quotation/const/boqColumnKey'
import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../../const/itemType'
import type { Quotation } from '@root/shared/types/Quotation'

export const updateColWidthReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    width: number
    boqColumnKey: BoqColumnKey
  }>,
): void => {
  const block = state.blocks[action.payload.blockIndex]

  if (block === undefined) {
    return
  }

  if (block.type !== itemType.boq) {
    return
  }

  block.boq.column[action.payload.boqColumnKey].width = action.payload.width
}
