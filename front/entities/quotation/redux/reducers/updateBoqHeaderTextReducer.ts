import type { PayloadAction } from '@reduxjs/toolkit'
import { itemKey } from '../../consts/itemKey'
import type { BoqHeaderKey, Quotation } from '../../types'

export const updateBoqHeaderTextReducer = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    html: string
    value: number
    boqHeaderKey: BoqHeaderKey
  }>,
): void => {
  const { blockIndex, html, boqHeaderKey, value } = action.payload
  const block = state.blocks[blockIndex]

  if (!block) return
  if (block.type !== itemKey.boq) return
  if (html === undefined) return

  block.boq.header[boqHeaderKey].html = html
  block.boq.header[boqHeaderKey].value = value
}
