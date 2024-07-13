import type { PayloadAction } from '@reduxjs/toolkit'
import { type Quotation } from '../../types'
import { getBoqBlockFromState } from '../getters/getBoqBlockFromState'

export const updateSubTotalPriceReducer = (
  state: Quotation,
  action: PayloadAction<{
    itemIndex: number
    value: number
    html: string
  }>,
): void => {
  const { itemIndex, html, value } = action.payload
  const boqBlock = getBoqBlockFromState({ itemIndex, state })

  if (boqBlock === undefined) return

  boqBlock.boq.header.subTotalPrice.value = value
  boqBlock.boq.header.subTotalPrice.html = html
}
