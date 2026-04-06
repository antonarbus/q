import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation, PaymentBlock } from '@back/entity/quotation/schema'

export const updatePayment = (
  state: Quotation,
  action: PayloadAction<{
    blockIndex: number
    payment: PaymentBlock['payment']
  }>,
): void => {
  const block = state.blocks[action.payload.blockIndex]

  if (block?.type !== 'payment') {
    return
  }

  block.payment = action.payload.payment
}
