import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../types'

type Payload = {
  quotation: Quotation
}

type Reducer = (state: Quotation, action: PayloadAction<Payload>) => Quotation

export const loadItemsReducer: Reducer = (state, action) => {
  const { quotation } = action.payload
  return quotation
}
