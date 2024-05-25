import type { PayloadAction } from '@reduxjs/toolkit'
import { type Quotation } from '../../types'

export const updateQuotationInfoReducer = (
  state: Quotation,
  action: PayloadAction<{
    name: string | undefined
    category: string | undefined
    desc: string | undefined
    info: string | undefined
  }>,
): void => {
  const { name, category, desc, info } = action.payload
  state.name = name
  state.category = category
  state.desc = desc
  state.info = info
}
