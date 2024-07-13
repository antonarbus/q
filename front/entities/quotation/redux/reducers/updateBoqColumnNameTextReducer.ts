import type { PayloadAction } from '@reduxjs/toolkit'
import { itemKey } from '../../consts/itemKey'
import type { BoqColumnKey, Quotation } from '../../types'

export const updateBoqColumnNameTextReducer = (
  state: Quotation,
  action: PayloadAction<{
    itemIndex: number
    html: string
    boqColumnKey: BoqColumnKey
  }>,
): void => {
  const { itemIndex, html, boqColumnKey } = action.payload
  const block = state.blocks[itemIndex]

  if (!block) return
  if (block.type !== itemKey.boq) return

  block.boq.column[boqColumnKey].html = html
}
