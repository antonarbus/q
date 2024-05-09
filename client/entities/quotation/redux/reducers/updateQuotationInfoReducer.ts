import type { PayloadAction } from '@reduxjs/toolkit'
import { type Quotation } from '../../types'

export const updateQuotationInfoReducer = (state: Quotation, action: PayloadAction<{
  quotation: Quotation
}>): void => {
  const { quotation } = action.payload

  state.name = quotation.name
  state.category = quotation.category
  state.desc = quotation.desc
}
