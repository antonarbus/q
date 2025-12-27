import type { PayloadAction } from '@reduxjs/toolkit'
import { itemType } from '../../../const/itemType'
import type { HeaderKey } from '@root/shared/types/BlockItem'
import type { Quotation } from '@root/shared/types/Quotation'

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

  if (block.type !== itemType.boq) {
    return
  }

  block.boq.header[action.payload.boqHeaderKey].html = action.payload.html
  block.boq.header[action.payload.boqHeaderKey].value = action.payload.value
}
