import type { PayloadAction } from '@reduxjs/toolkit'
import type { HeaderKey, Quotation } from '@back/entities/quotation/schemas'

export const updateBoqHeaderTextReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    html: string
    value: number
    boqHeaderKey: HeaderKey
  }>,
): void => {
  const block = state.blocks[action.payload.blockIndex]

  if (block === undefined) {
    return
  }

  if (block.type !== 'boq') {
    return
  }

  block.boq.header[action.payload.boqHeaderKey].html = action.payload.html
  block.boq.header[action.payload.boqHeaderKey].value = action.payload.value
}
