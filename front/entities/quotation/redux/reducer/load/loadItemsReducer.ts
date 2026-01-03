import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entities/quotation/quotationSchema'

type Payload = {
  quotation: Quotation
}

type Reducer = (state: Quotation, action: PayloadAction<Payload>) => Quotation

export const loadQuotationReducer: Reducer = (_state, action) => {
  return action.payload.quotation
}
