import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'

type Payload = {
  quotation: Quotation
}

type Reducer = (state: Quotation, action: PayloadAction<Payload>) => Quotation

export const loadQuotation: Reducer = (_state, action) => {
  return action.payload.quotation
}
