import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'

export const updateQuotationInfo = (
  state: Quotation,
  action: PayloadAction<{
    name: string
    category: string
    desc: string
    info: string
  }>,
): void => {
  state.name = action.payload.name
  state.category = action.payload.category
  state.desc = action.payload.desc
  state.info = action.payload.info
}
