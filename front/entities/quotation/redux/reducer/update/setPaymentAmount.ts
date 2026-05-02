import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'

export const setPaymentAmount = (
  state: Quotation,
  action: PayloadAction<{ blockIndex: number; value: number }>,
): void => {
  const block = state.blocks[action.payload.blockIndex]

  if (block?.type !== 'payment') {
    return
  }

  block.payment.amount = action.payload.value
}
