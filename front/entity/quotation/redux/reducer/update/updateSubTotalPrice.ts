import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'
import { getBoqBlockFromStateByIndex } from '../../getter/getBoqBlockFromStateByIndex'

export const updateSubTotalPrice = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    value: number
    html: string
  }>,
): void => {
  const boqBlock = getBoqBlockFromStateByIndex({
    blockIndex: action.payload.blockIndex,
    state,
  })

  if (boqBlock === undefined) {
    return
  }

  boqBlock.boq.header.subTotalPrice.value = action.payload.value
  boqBlock.boq.header.subTotalPrice.html = action.payload.html
}
