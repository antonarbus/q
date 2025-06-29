import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../type'

type Payload = {
  quotation: Quotation
}

type Reducer = (state: Quotation, action: PayloadAction<Payload>) => Quotation

export const loadQuotationReducer: Reducer = (state, action) => {
  const { quotation } = action.payload

  return quotation
}
