import type { PayloadAction } from '@reduxjs/toolkit'
import { type Quotation } from '../../types'

export const updateQuotationInfoReducer = (state: Quotation, action: PayloadAction<{
  name: string
  category: string
  desc: string
  info: string
}>): void => {
  const { name, category, desc, info } = action.payload
  state.name = name
  state.category = category
  state.desc = desc
  state.info = info
}
