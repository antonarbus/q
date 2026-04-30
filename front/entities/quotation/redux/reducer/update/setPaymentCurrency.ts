import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'

export const setPaymentCurrency = (
  state: Quotation,
  action: PayloadAction<{ blockIndex: number; value: string }>,
): void => {
  const block = state.blocks[action.payload.blockIndex]

  if (block?.type !== 'payment') {
    return
  }

  block.payment.currency = action.payload.value
}
