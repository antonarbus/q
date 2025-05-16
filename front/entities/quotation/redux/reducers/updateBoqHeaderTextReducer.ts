import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../consts/itemType'
import type { HeaderKey, Quotation } from '../../types'

export const updateBoqHeaderTextReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    html: string
    value: number
    boqHeaderKey: HeaderKey
  }>,
): void => {
  const { blockIndex, html, boqHeaderKey, value } = action.payload
  const block = state.blocks[blockIndex]

  if (block === undefined) {
    return
  }

  if (block.type !== itemType.boq) {
    return
  }

  block.boq.header[boqHeaderKey].html = html
  block.boq.header[boqHeaderKey].value = value
}
