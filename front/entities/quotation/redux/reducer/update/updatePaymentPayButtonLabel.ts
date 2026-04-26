import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'

export const updatePaymentPayButtonLabel = (
  state: Quotation,
  action: PayloadAction<{ blockIndex: number; html: string }>,
): void => {
  const block = state.blocks[action.payload.blockIndex]

  if (block?.type !== 'payment') {
    return
  }

  if (block.payment.payButtonLabel === undefined) {
    block.payment.payButtonLabel = { html: '' }
  }

  block.payment.payButtonLabel.html = action.payload.html
}
