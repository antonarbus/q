import type { PayloadAction } from '@reduxjs/toolkit'
import { itemKey } from '../../consts/itemKey'
import type { BoqHeaderKey, Quotation } from '../../types'

export const updateBoqHeaderTextReducer = (
  state: Quotation,
  action: PayloadAction<{
    itemIndex: number
    html: string
    value: number
    boqHeaderKey: BoqHeaderKey
  }>,
): void => {
  const { itemIndex, html, boqHeaderKey, value } = action.payload
  const block = state.blocks[itemIndex]

  if (!block) return
  if (block.type !== itemKey.boq) return
  if (html === undefined) return

  block.boq.header[boqHeaderKey].html = html
  block.boq.header[boqHeaderKey].value = value
}
