import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../consts/itemType'
import type { Quotation } from '../../types'
import type { BoqColumnKey } from '@entities/quotation/consts/boqColumnKey'

export const updateBoqColumnNameTextReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    html: string
    boqColumnKey: BoqColumnKey
  }>,
): void => {
  const { blockIndex, html, boqColumnKey } = action.payload
  const block = state.blocks[blockIndex]

  if (block === undefined) {
    return
  }

  if (block.type !== itemType.boq) {
    return
  }

  block.boq.column[boqColumnKey].html = html
}
