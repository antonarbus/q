import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@back/entity/quotation/schema'

export const deleteBlock = (
  state: Quotation,
  action: PayloadAction<{
    id: string
  }>,
): undefined => {
  const blocksWithoutDeletedOne = state.blocks.filter(
    (block) => block.id !== action.payload.id,
  )

  state.blocks = blocksWithoutDeletedOne
}
