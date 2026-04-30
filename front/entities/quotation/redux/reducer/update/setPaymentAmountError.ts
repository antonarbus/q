import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'

export const setPaymentAmountError = (
  state: Quotation,
  action: PayloadAction<{ blockIndex: number }>,
): void => {
  const block = state.blocks[action.payload.blockIndex]

  if (block?.type !== 'payment') {
    return
  }

  block.payment.amountError = true
}
