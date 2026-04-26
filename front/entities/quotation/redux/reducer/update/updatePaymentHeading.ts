import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'

export const updatePaymentHeading = (
  state: Quotation,
  action: PayloadAction<{ blockIndex: number; html: string }>,
): void => {
  const block = state.blocks[action.payload.blockIndex]

  if (block?.type !== 'payment') {
    return
  }

  if (block.payment.heading === undefined) {
    block.payment.heading = { html: '' }
  }

  block.payment.heading.html = action.payload.html
}
