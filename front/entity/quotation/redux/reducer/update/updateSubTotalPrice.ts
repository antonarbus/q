import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'
import { getBoqBlockFromState } from '../../getter/getBoqBlockFromState'

export const updateSubTotalPrice = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    value: number
    html: string
  }>,
): void => {
  const boqBlock = getBoqBlockFromState({
    blockIndex: action.payload.blockIndex,
    state,
  })

  if (boqBlock === undefined) {
    return
  }

  boqBlock.boq.header.subTotalPrice.value = action.payload.value
  boqBlock.boq.header.subTotalPrice.html = action.payload.html
}
