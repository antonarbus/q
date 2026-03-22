import type { BoqColumnKey, Quotation } from '@back/entity/quotation/schema'
import type { PayloadAction } from '@reduxjs/toolkit'

export const updateBoqColumnNameText = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    html: string
    boqColumnKey: BoqColumnKey
  }>,
): void => {
  const block = state.blocks[action.payload.blockIndex]

  if (block === undefined) {
    return
  }

  if (block.type !== 'boq') {
    return
  }

  block.boq.column[action.payload.boqColumnKey].html = action.payload.html
}
